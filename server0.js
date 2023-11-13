const express = require('express');
const path = require('path');


const app = express();
const port = 80;

// Define a route to serve the HTML page
app.get('/', (req, res) => {
    const htmlPath = path.join(__dirname, 'index.html');
    res.sendFile(htmlPath);
});

// Define a route to serve the challenge file
app.get('/.well-known/acme-challenge/TfQxPsClqnGJlZas7kPpeg', (req, res) => {
    const filePath = path.join(__dirname, './public/.well-known/acme-challenge/TfQxPsClqnGJlZas7kPpeg/challenge.txt');
    res.sendFile(filePath);
});

app.get('/.well-known/acme-challenge/ySopp0yK-_p6FsSY_AkPgQ', (req, res) => {
    const filePath = path.join(__dirname, './public/.well-known/acme-challenge/ySopp0yK-_p6FsSY_AkPgQ/challenge2.txt');
    res.sendFile(filePath);
});

app.get('/test', (req, res) => {
    const htmlPath = path.join(__dirname, 'hPuAUoqNAho_sXexCkr_Ew.txt');
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

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});