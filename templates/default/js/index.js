require('dotenv').config();
const mongoose = require('mongoose');
const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017";

const serevr = http.createServer(app);

mongoose
    .connect(MONGODB_URL)
    .then(() =>
        serevr.listen(PORT, () => {
            console.log(`Server is on PORT: ${PORT} \n\n \tdev link: http://localhost:${PORT}`);
        })
    )
    .catch((error) => console.log(error.message));