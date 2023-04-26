/**
 * 平面数组转树形结构
 * @param {*} data 
 */
const ArrayToTree = (data, parentId) => {
    const result = [];
    data.forEach(item => {
        if (item.parent === parentId) {
            const child = ArrayToTree(arr, item._id);
            if (child.length > 0) {
                item.children = child;
            }
            result.push(item);
        }
    });
}

module.exports = ArrayToTree;