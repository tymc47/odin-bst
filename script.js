const Tree = require('./class');

function randomArray(size) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * size));
}

const tree = new Tree(randomArray(20));
tree.prettyPrint();
console.log(`Balanced? ${tree.isBalanced()}`);
console.log(`Level Order: ${tree.levelOrder()}`);
console.log(`Pre Order: ${tree.preOrder()}`);
console.log(`In Order: ${tree.inOrder()}`);
console.log(`Post Order: ${tree.postOrder()}`);
for (let i = 0; i < Math.round(Math.random() * 10); i++) {
    console.log('adding number');
    tree.insert(Math.round(Math.random() * 200));
}
tree.prettyPrint();
console.log(`Balanced? ${tree.isBalanced()}`);
tree.rebalance();
tree.prettyPrint();
console.log(`Balanced? ${tree.isBalanced()}`);
console.log(`Level Order: ${tree.levelOrder()}`);
console.log(`Pre Order: ${tree.preOrder()}`);
console.log(`In Order: ${tree.inOrder()}`);
console.log(`Post Order: ${tree.postOrder()}`);
