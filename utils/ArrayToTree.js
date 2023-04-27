/**
 * 平面数组转树形结构
 * @param {*} data 
 */
const ArrayToTree = (items, id = '_id', parentId = 'parent', children = 'children') => {
    const itemMap = {};
    const tree = [];

    // 先将数组中每个元素的 id 作为键，元素本身作为值，存入 itemMap 中
    items.forEach(item => {
        itemMap[item[id]] = { ...item, [children]: [] };
    });

    // 遍历数组，将元素添加到它们对应的父元素的 children 数组中
    items.forEach(item => {
        const parentItem = itemMap[item[parentId]];
        if (parentItem) {
            parentItem[children].push(itemMap[item[id]]);
        } else {
            // 如果没有父元素，则将元素作为根节点添加到树中
            tree.push(itemMap[item[id]]);
        }
    });

    return tree;
}

module.exports = ArrayToTree;