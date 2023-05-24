const { PersonalSignature } = require('../model');
const JsonResponse = require("../utils/JsonResponse");

module.exports = {
    /**
     * 创建个性签名
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async PersonalSignatureCreate(req, res, next) {
        try {
            const result = await PersonalSignature.create(req.body);
            JsonResponse(res, 200, result, '创建成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    },

    /**
     * 删除个性签名
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async PersonalSignatureDelete(req, res, next) {
        try {
            const result = await PersonalSignature.updateMany({
                _id: {
                    $in: req.body
                }
            }, { status: 2 });
            JsonResponse(res, 200, result, '删除成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    },

    /**
     * 更新个性签名
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async PersonalSignatureUpdate(req, res, next) {
        try {
            const find = await PersonalSignature.findById(req.body._id);
            if (find) {
                const updateData = {
                    ...find._doc,
                    ...req.body,
                    updateAt: Date.now()
                }
                await PersonalSignature.findByIdAndUpdate(req.body._id, updateData);
                JsonResponse(res, 200, updateData, '更新成功');
            } else {
                JsonResponse(res, 500, null, "该签名不存在");
            }
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    },

    /**
     * 分页查询个性签名列表
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async PersonalSignaturePageQuery(req, res, next) {
        try {
            const { pageIndex, pageSize, content } = req.body;
            //查询条件
            const query = {
                status: {
                    $ne: 2
                }
            };
            if (content) {
                query.content = {
                    $regex: new RegExp(content, 'i')
                }
            }
            const total = await PersonalSignature.find(query).countDocuments();
            const result = await PersonalSignature.find(query).skip((pageIndex - 1) * pageSize).limit(pageSize);
            JsonResponse(res, 200, {
                total,
                items: result
            }, '查询成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    },
}