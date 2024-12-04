document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const file = document.getElementById('fileInput').files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    if (data.success) {
        alert('File uploaded successfully');
    } else {
        alert('Failed to upload file');
    }
});