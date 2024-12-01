#!/usr/bin/env node

require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
console.log('Fengal Cyclone🌀 - Starting the weather map...');
app.use(express.static('public'));

const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
// Create an endpoint to get the API key
app.get('/api/windy-key',apiLimiter, (req, res) => {
    try {
        if (!process.env.WINDY_API_KEY) {
            throw new Error('API key not configured');
        }
        res.json({ key: process.env.WINDY_API_KEY });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve API key' });
    }
});

app.listen(port, () => {
    console.log(`
    ✨ Server is running!
    🌍 Open http://localhost:${port} in your browser
    🛑 Press Ctrl+C to stop the server
    `);
});
