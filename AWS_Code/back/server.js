const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");  // To handle CORS
const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");  // AWS SDK v3 modular imports
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(bodyParser.json());
const upload = multer({ dest: 'uploads/' });

// Set up AWS S3 (you have to fill out the four variables with your information after creating a IAM User and S3 Bucket)
// Note: You must keep your Access Key and Secret Access Key private.
const accessKey = "";
const secretAccessKey = ""; 
const bucketRegion = ""; 
const bucketName = "";  
//

// Create an S3 client using AWS SDK v3
const s3Client = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion
});

// route we will call in index.html
app.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Create the S3 upload parameters
    const s3Params = {
        Bucket: bucketName,
        Key: path.basename(file.originalname), // The file name you want to store on S3
        Body: fs.createReadStream(file.path), // Read the file from the temporary location
        ContentType: file.mimetype // Set the content type
    };

    try {
        // Upload the file to S3
        const data = await s3Client.send(new PutObjectCommand(s3Params));
        console.log('File uploaded successfully:', data);
        res.json({ success: true, message: 'File uploaded successfully!' });
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        res.status(500).json({ success: false, message: 'Failed to upload file' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
