const express = require("express");
const morgan = require("morgan");

const app = express();

/**
 * @description 开发环境记录日志(HTTP请求日志记录功能)
 */
app.use(morgan('dev'));

app.get('/home/:name', (req, res) => {
    res.status(200).json({"hello": req.params.name});
});

app.listen(60701, 'localhost', () => {
    console.log('Server running at http://localhost:60701');
});