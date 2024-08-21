require('dotenv').config();
const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 4000;

const serevr = http.createServer(app);

serevr.listen(process.env.PORT, () => {
    console.log(`Server is on PORT: ${PORT} \n\n \tdev link: http://localhost:${PORT}`);
});
