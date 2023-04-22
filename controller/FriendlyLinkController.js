const { FriendlyLink } = require("../model");
const JsonResponse = require("../utils/JsonResponse");

module.exports = {
    /**
     * 创建友情链接
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async FriendlyLinkCreate(req, res, next) {
        try {
            const result = await FriendlyLink.create(req.body);
            JsonResponse(res, 200, result, '创建成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    },

    /**
     * 删除友情链接
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async FriendlyLinkDelete(req, res, next) {
        try {
            const result = await FriendlyLink.updateMany({
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
     * 更新友情链接
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async FriendlyLinkUpdate(req, res, next) {
        try {
            const friendlyLink = await FriendlyLink.findById(req.body._id);
            if (friendlyLink) {
                const updateData = {
                    ...friendlyLink._doc,
                    ...req.body,
                    updateAt: Date.now()
                }
                await FriendlyLink.findByIdAndUpdate(req.body._id, updateData);
                JsonResponse(res, 200, updateData, '更新成功');
            } else {
                JsonResponse(res, 500, null, "友情链接不存在");
            }
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    },

    /**
     * 分页查询友情链接列表
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async FriendlyLinkPageQuery(req, res, next) {
        try {
            const { pageIndex, pageSize, name } = req.body;
            //查询条件
            const query = {
                status: {
                    $ne: 2
                }
            };
            if (name) {
                query.name = {
                    $regex: new RegExp(name, 'i')
                }
            }
            const total = await FriendlyLink.find(query).countDocuments();
            const result = await FriendlyLink.find(query).sort("sort").skip((pageIndex - 1) * pageSize).limit(pageSize);
            JsonResponse(res, 200, {
                total,
                items: result
            }, '查询成功');
        } catch (err) {
            JsonResponse(res, 500, null, err.message);
        }
    }
}