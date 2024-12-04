const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns"); // Use require for AWS SDK v3

// Instantiate the SNS client
const snsClient = new SNSClient({
  region: '', // Adjust to your region if needed
});
//

// Lambda function handler
const handler = async (event) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = event.Records[0].s3.object.key;

    console.log(`File uploaded to S3: ${bucket}/${key}`);

    //
    const snsTopicArn = ''; // Replace with your actual SNS Topic ARN
    //

    const message = {
        Message: `A new file has been uploaded to S3:\n\nBucket: ${bucket}\nFile Key: ${key}`,
        Subject: 'AWS CSS: New File Uploaded to S3',
        TopicArn: snsTopicArn,
    };

    try {
        const data = await snsClient.send(new PublishCommand(message));
        console.log('SNS notification sent successfully:', data);
    } catch (error) {
        console.error('Error sending SNS notification:', error);
        throw new Error('SNS notification failed');
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'File processed successfully, SNS notification sent' }),
    };
};

// Export the handler using CommonJS syntax
module.exports.handler = handler;
