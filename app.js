const express = require('express');
const router = require('./routes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// 定义 Swagger 配置信息
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API Documentation',
            version: '1.0.0',
        },
    },
    // 需要生成文档的文件路径
    apis: ['./routes/*.js'],
};

// 生成 Swagger 文档
const swaggerSpec = swaggerJSDoc(swaggerOptions);
const app = express();
const port = 3000;
app.use(express.json());
app.use('/apis', router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});