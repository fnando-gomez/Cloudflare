import express from 'express';
import path from 'path';
import vhost from 'vhost';
import fs from 'fs';
const port = 80;


const app = express();

const routerMain = express.Router();
const appTunnel = express.Router();

// Define a route to serve the HTML page
routerMain.get('/', (req, res) => {
    const htmlPath = path.join('./index.html');
    res.sendFile(htmlPath);
});

appTunnel.get('/', (req, res) => {
    const htmlPath = path.join('./indexTunnel.html');
    res.sendFile(htmlPath);
});

routerMain.get('/headers', (req, res) => {
    const htmlPath = path.join('./headers.html');
    
    // Get all HTTP request headers
    const headers = JSON.stringify(req.headers, null, 2);

    // Read the HTML file and replace a placeholder with the headers
    fs.readFile(htmlPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading HTML file');
        }
        data = data.replace('{{headers}}', headers);
        res.send(data);
    });
});

app.use(vhost('hawkingslab.online', routerMain));
app.use(vhost('tunnel.hawkingslab.online', appTunnel));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});