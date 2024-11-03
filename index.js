require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

connectDB();

const customoresRoutes = require('./routes/customoresRoutes')
app.use('/', customoresRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
