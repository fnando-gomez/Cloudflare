const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs')


const app = express();
const port = 80;
//const port = 443; // Default HTTPS port

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/hawkingslab.online/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/hawkingslab.online/cert.pem'),
};

const server = https.createServer(options, app);

// Define a route to serve the HTML page
app.get('/', (req, res) => {
    const htmlPath = path.join(__dirname, 'index.html');
    res.sendFile(htmlPath);
    console.log('HTTPS server-up');
});

app.get('/headers', (req, res) => {
    const htmlPath = path.join(__dirname, 'headers.html');
    
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

// Start the server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});