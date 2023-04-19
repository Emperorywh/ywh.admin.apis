const express = require('express');
const router = require('./routes');
const JsonWebToken = require("./middleware/JsonWebToken");

const app = express();
const port = 3000;
app.use(express.json());
app.use('/apis', JsonWebToken.verifyToken, router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});