const nodemailer = require("nodemailer");
const { Blog, Comment } = require('../model/index');
/**
 * 发送邮件
 * 
 */
const sendEmail = async (reqBody) => {
    const commonBlog = await Blog.findById(reqBody.blogId).populate("author", "-password");
    if (!commonBlog) return;
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


    if (reqBody.to) {
        try {
            const toComment = await Comment.findById(reqBody.to);
            if (toComment) {
                //如果是 评论人之间的相互评论
                const commentReply = `
                <!DOCTYPE html>
                <html lang="en">
                
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>评论回复模板</title>
                    <style>
                        * {
                            margin: 0;
                        }
                
                        body {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 100vw;
                            height: 100vh;
                        }
                
                        a {
                            text-decoration: none;
                            color: #3354AA;
                        }
                
                        .reply-container {
                            margin: 0 10px;
                        }
                
                        .reply-header {
                            display: flex;
                            align-items: center;
                            box-sizing: border-box;
                            background: linear-gradient(to right, rgb(143, 221, 213), rgb(254, 227, 248));
                            min-height: 50px;
                            color: #FFF;
                            padding: 5px 10px;
                            border-top-left-radius: 5px;
                            border-top-right-radius: 5px;
                        }
                
                        .reply-content-box {
                            box-shadow: 0 1px 2px -2px rgba(0, 0, 0, .16), 0 3px 6px 0 rgba(0, 0, 0, .12), 0 5px 12px 4px rgba(0, 0, 0, .09);
                            padding: 20px 10px;
                            border-bottom-left-radius: 5px;
                            border-bottom-right-radius: 5px;
                            color: #444;
                        }
                
                        .reply-content-header {
                            margin-bottom: 10px;
                            font-size: 18px;
                        }
                
                        .reply-content-text {
                            background-color: #EEE;
                            padding: 10px 5px;
                            margin-bottom: 20px;
                        }
                
                        .reply-content-replay {
                            margin-bottom: 10px;
                        }
                
                        .reply-content-replay-text {
                            background-color: #EEE;
                            padding: 10px 5px;
                            margin-bottom: 10px;
                        }
                        
                        .reply-content-bottom {
                            font-size: 14px;
                            padding-bottom: 10px;
                            margin-bottom: 10px;
                            border-bottom: 1px solid #eee;
                        }
                
                        .replay-desc {
                            font-size: 14px;
                            color: #999;
                        }
                    </style>
                </head>
                
                <body>
                    <div class="reply-container">
                        <div class="reply-header">
                            <div>
                                您在<a href="${blogInfo.blogUrl}" target="_blank">[${blogInfo.blogName}]</a>发表的留言有新回复啦！
                            </div>
                        </div>
                        <div class="reply-content-box">
                            <div class="reply-content-header">
                                Hi ${toComment.from}，您曾在《<a href="${blogInfo.blogUrl}/blog/${reqBody.blogId}"
                                target="_blank">${commonBlog.title}</a>》上发表评论：
                            </div>
                            <div class="reply-content-text">
                                ${toComment.content}
                            </div>
                            <div class="reply-content-replay">
                                【${reqBody.from}】给您的回复如下：
                            </div>
                            <div class="reply-content-replay-text">
                                ${reqBody.content}
                            </div>
                            <div class="reply-content-bottom">
                                您可以点击<a href="${blogInfo.blogUrl}/blog/${reqBody.blogId}"
                                    target="_blank">查看回复的完整内容</a>，欢迎再次光临${blogInfo.blogName}
                            </div>
                            <div class="replay-desc">
                                本邮件为系统自动发送，请勿直接回复邮件，可到博文内容回复。
                            </div>
                        </div>
                    </div>
                </body>
                
                </html>
                `;
                transporter.sendMail({
                    from: 'emperor_ywh@163.com',
                    to: '1289978696@qq.com',
                    subject: `您在[${blogInfo.blogName}]发表的文章有新回复啦！`,
                    html: commentReply
                }, function (err, info) {
                    if (err) {
                        console.log('邮件发送失败', err)
                    }
                });
            }
        } catch (error) {
            console.log("查询评论出错", error);
        }

    } else {
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
            <style>
                * {
                    margin: 0;
                }

                a {
                    text-decoration: none;
                    color: #3354AA;
                }

                .reply-container {
                    box-sizing: border-box;
                    display: flex;
                    justify-content: center;
                    margin-top: 100px;
                    width: 100vw;
                    height: 100vh;
                    font-size: 14px;
                    color: #444;
                    padding: 0 10px;
                    overflow: hidden;
                }

                .reply-c-box {
                    box-sizing: border-box;
                }

                .reply-container-header {
                    box-sizing: border-box;
                    background: linear-gradient(to right, rgb(143, 221, 213), rgb(254, 227, 248));
                    height: 50px;
                    display: flex;
                    align-items: center;
                    color: #FFF;
                    padding: 5px 10px;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                }

                .reply-container-header a {
                    color: #FFF;
                }

                .reply-content-box {
                    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, .16), 0 3px 6px 0 rgba(0, 0, 0, .12), 0 5px 12px 4px rgba(0, 0, 0, .09);
                    padding: 5px;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                }

                .reply-content-text {
                    background-color: #EEE;
                    padding: 5px;
                    margin: 10px 0;
                }

                .reply-attention {
                    color: #999;
                    margin: 10px 0;
                }

                .reply-bottom-text {
                    color: #999;
                    margin: 10px 0;
                }
            </style>
        </head>

        <body>
            <div class="reply-container">
                <div class="reply-c-box">
                    <div class="reply-container-header">
                        您在<a href="${blogInfo.blogUrl}" target="_blank">[${blogInfo.blogName}]</a>发表的文章有新评论！
                    </div>
                    <div class="reply-content-box">
                        <div>
                            ${reqBody.from}，在您的《<a href="${blogInfo.blogUrl}/blog/${reqBody.blogId}"
                                target="_blank">${commonBlog.title}</a>》上发表评论：
                        </div>
                        <div class="reply-content-text">
                            ${reqBody.content}
                        </div>
                        <div class="reply-attention">
                            注意：此邮件是由<a href="${blogInfo.blogUrl}" target="_blank">${blogInfo.blogName}</a>自动发送，请勿直接回复。
                        </div>
                        <div class="reply-bottom-text">
                            若此邮件不是您请求的，请忽略并删除！
                        </div>
                    </div>
                </div>
            </div>
        </body>

        </html>
        `;
        //如果是 直接评论博客
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