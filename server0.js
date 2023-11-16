const express = require('express');
const path = require('path');


const app = express();
const port = 80;

// Define a route to serve the HTML page
app.get('/', (req, res) => {
    const htmlPath = path.join(__dirname, 'indexTunnel.html');
    res.sendFile(htmlPath);
});


app.get('/headersTunnel', (req, res) => {
    const htmlPath = path.join(__dirname, 'headersTunnel.html');
    
    // Get all HTTP request headers
    const headers = JSON.stringify(req.headers, null, 2);

    // Read the HTML file and replace a placeholder with the headers
    const fs = require('fs');
    fs.readFile(htmlPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading HTML file');
        }
        data = data.replace('{{headers}}', headers);
        res.send(data);
    });
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});