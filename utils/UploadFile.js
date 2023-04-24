const OSS = require('ali-oss');
const fs = require('fs');

const UploadFile = async (req) => {
    const client = new OSS({
        // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
        region: 'xxxxxxxxxxx',
        // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
        accessKeyId: 'xxxxxxxxxxxxx',
        accessKeySecret: 'xxxxxxxxxxxx',
        // 填写Bucket名称。
        bucket: 'xxxxxxxxxx'
    });

    try {
        // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
        // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
        const result = await client.put(`/blog/${req.userId}/` + req.file.originalname, req.file.path, {
            headers: {
                'Content-Type': 'image/jpg'
            }
        });
        if (result.res.statusCode === 200) {
            fs.unlinkSync(req.file.path);
            return {
                code: 200,
                data: result.url,
                message: '上传成功'
            }
        }
        return {
            code: 500,
            data: null,
            message: '上传失败'
        }
    } catch (error) {
        return {
            code: 500,
            data: null,
            message: error.message
        }
    }
}

module.exports = UploadFile;