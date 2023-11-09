const express = require('express');
const http = require('http');
const vhost = require('vhost');

// Create the main Express app
const mainApp = express();
const mainPort = 80;

// Define a route for the main domain
mainApp.get('/', (req, res) => {
    res.send('Hello, main domain!');
});

// Create the 'tunnel' subdomain Express app
const tunnelApp = express();
const tunnelPort = 3000; // Specify the port for the 'tunnel' subdomain

// Define a route for the 'tunnel' subdomain
tunnelApp.get('/', (req, res) => {
    res.send('Hello, tunnel subdomain!');
});

// Create an HTTP server for the main domain
const mainServer = http.createServer(mainApp);

// Create an HTTP server for the 'tunnel' subdomain
const tunnelServer = http.createServer(tunnelApp);

// Set up vhost middleware to handle subdomains
mainApp.use(vhost('hawkingslab.online', mainApp));
mainApp.use(vhost('tunnel.hawkingslab.online', tunnelApp));

// Start the servers
mainServer.listen(mainPort, () => {
    console.log(`Main server is running on port ${mainPort}`);
});

tunnelServer.listen(tunnelPort, () => {
    console.log(`Tunnel server is running on port ${tunnelPort}`);
});