const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/', (req, res) => {
    res.send('API is running');
})



app.listen(process.env.PORT || 5000, () => {
    console.log(`server running on port ${process.env.PORT}`);
})



