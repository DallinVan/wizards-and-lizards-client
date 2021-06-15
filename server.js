// Import express server
const express = require('express');
const path = require('path');

const app = express();
const appName = 'wizards-and-lizards-app';

// Serve only the static files form the dist directory
app.use(express.static(`./dist/${appName}`));

// For Angular routing
app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname, `/dist/${appName}/index.html`));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);