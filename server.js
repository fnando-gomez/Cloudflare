const express = require('express');
const path = require('path');


const app = express();
const port =  8000;

// Define a route to serve the HTML page
app.get('/', (req, res) => {
    const htmlPath = path.join(__dirname, 'index.html');
    res.sendFile(htmlPath);
});

app.get('/tunnel', (req,res) =>{
    res.send("Hello, tunnel subdomain");    
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
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});