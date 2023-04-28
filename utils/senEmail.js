const nodemailer = require("nodemailer");
const { Blog } = require('../model/index');
/**
 * 发送邮件
 * 
 */
const sendEmail = async (reqBody) => {
    const commonBlog = await Blog.findById(reqBody.blogId).populate("author", "-password");
    //博客地址和博客名称
    const blogInfo = {
        blogName: 'Emperor`s Blog',
        blogUrl: 'https://www.imywh.com'
    }
    //配置文件服务器
    const transporter = nodemailer.createTransport({
        host: 'smtp.163.com',
        secure: true,
        auth: {
            user: 'emperor_ywh@163.com',
            pass: 'RWBTSDHWLHOLPKBN'
        }
    });

    /**
     * 发送给博主的HTML邮件模板
     */
    const bloggerTemplate = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>博主模板</title>
            </head>
            <body>
                <div style="width: 100vw;height: 100vh;display: flex;justify-content: center;align-items: center;font-size: 0.8vw;color: #444;">
                    <div style="width: 30vw;">
                        <div style="background: linear-gradient(to right, rgb(143, 221, 213), rgb(254,227,248));height: 50px;display: flex;align-items: center;color: #FFF;padding: 10px 20px;border-top-left-radius: 1vw;border-top-right-radius: 1vw;">
                            您在<a style="text-decoration: none;color: #FFF;" href="${blogInfo.blogUrl}" target="_blank">[${blogInfo.blogName}]</a>发表的文章有新评论！
                        </div>
                        <div style="box-shadow: 0 1px 2px -2px rgba(0,0,0,.16), 0 3px 6px 0 rgba(0,0,0,.12), 0 5px 12px 4px rgba(0,0,0,.09);padding: 20px;border-bottom-left-radius: 1vw;border-bottom-right-radius: 1vw;">
                            <div>
                                ${reqBody.from}，在您的《<a href="${blogInfo.blogUrl}/blog/${reqBody.blogId}" style="text-decoration: none;color: #3354AA;" target="_blank">${commonBlog.title}</a>》上发表评论：
                            </div>
                            <div style="margin: 10px 0;background-color: #EEE;padding: 20px;">
                                ${reqBody.content}
                            </div>
                            <div style="color: #999;font-size: 0.7vw;margin: 10px 0;">
                                注意：此邮件是由<a style="text-decoration: none;color: #3354AA;" href="${blogInfo.blogUrl}" target="_blank">${blogInfo.blogName}</a>自动发送，请勿直接回复。
                            </div>
                            <div style="color: #999;ffont-size: 0.7vw;margin: 10px 0;">
                                若此邮件不是您请求的，请忽略并删除！
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    `;

    if (reqBody.to) {
        //如果是 评论人之间的相互评论
    } else {
        //如果是 直接评论博客
        //发送邮件
        transporter.sendMail({
            from: 'emperor_ywh@163.com',
            to: '1289978696@qq.com',
            subject: `您在[${blogInfo.blogName}]发表的文章有新评论！`,
            html: bloggerTemplate
        }, function (err, info) {
            if (err) {
                console.log('邮件发送失败', err)
            }
        });
    }


}

module.exports = sendEmail;