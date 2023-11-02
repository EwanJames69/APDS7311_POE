require('dotenv').config();
const express = require('express')
const app = express()
const https = require('https');
const mongoose = require("mongoose")
const fs = require('fs')
const helmet = require('helmet')
const cors = require('cors')
const hsts = require('./middleware/hsts')
const morgan = require('morgan');

mongoose.connect(process.env.mongoDBurl).then(() => console.log('DB Connected...'));

// Middleware
app.use(cors({ origin: 'http://localhost:4200', optionsSuccessStatus: 200 })); // Update this line
app.use(express.json());
app.use(hsts);
// Uses Helmet middleware to secure the site
app.use(helmet());
// Uses Helmet middleware to prevent clickjacking
app.use(
    helmet({
        frameguard: {
            action: "deny",
        },
    })
);
app.use(morgan('combined'));

// Routes
app.use('/api/users', require('./routes/user'))
app.use('/api/posts', require('./routes/posts'))

app.use((reg, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

https.createServer(
    {
        key: fs.readFileSync('./keys/privatekey.pem'),
        cert: fs.readFileSync('./keys/certificate.pem'),
        passphrase: 'apds',
    },
    app
).listen(3000)

module.exports = app;