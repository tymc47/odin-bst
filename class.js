const mergeSort = require('./mergeSort');

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        if (array === null || array.length === 0) {
            console.log('Please enter a non empty array');
            return;
        }
        this.root = this.buildTree(array);
    }

    arrayToBST(array) {
        if (array.length === 0) return null;
        if (array.length === 1) return new Node(array[0]);

        const rootNode = new Node(array[Math.floor(array.length / 2)]);
        rootNode.left = this.arrayToBST(array.slice(0, Math.floor(array.length / 2)));
        rootNode.right = this.arrayToBST(array.slice(Math.floor(array.length / 2) + 1));
        return rootNode;
    }

    buildTree(array) {
        const sortedArray = mergeSort(array);
        const uniqSortedArray = [...new Set(sortedArray)];

        return this.arrayToBST(uniqSortedArray);
    }

    insert(value, rootNode = this.root) {
        if (rootNode === null) {
            return new Node(value);
        }

        console.log(rootNode);
        if (value >= rootNode.data) {
            rootNode.right = this.insert(value, rootNode.right);
        }
        if (value < rootNode.data) {
            rootNode.left = this.insert(value, rootNode.left);
        }

        return rootNode;
    }

    delete(value, rootNode = this.root) {
        if (rootNode === null) {
            return rootNode;
        }

        if (rootNode.data === value) {
            //node to be deleted has no child or one child
            if (rootNode.left === null) {
                if (rootNode === this.root) {
                    this.root = rootNode.right;
                }
                rootNode = rootNode.right;
            } else if (rootNode.right === null) {
                if (rootNode === this.root) {
                    this.root = rootNode.left;
                }
                rootNode = rootNode.left;
            }
            //has two children
            else {
                //search for minimun value of right subtree
                let minNode = rootNode.right;
                while (minNode.left !== null) {
                    minNode = minNode.left;
                }
                const substitute = minNode.data;
                this.delete(minNode.data);
                rootNode.data = substitute;
            }
        } else if (value >= rootNode.data) {
            rootNode.right = this.delete(value, rootNode.right);
        } else if (value < rootNode.data) {
            rootNode.left = this.delete(value, rootNode.left);
        }
        return rootNode;
    }

    find(value, rootNode = this.root) {
        if (rootNode === null) {
            console.log('no such node');
            return false;
        }
        if (rootNode.data === value) return rootNode;
        if (value >= rootNode.data) {
            return this.find(value, rootNode.right);
        }
        if (value < rootNode.data) {
            return this.find(value, rootNode.left);
        }
    }

    //given print function
    //source: https://www.theodinproject.com/lessons/javascript-binary-search-trees
    prettyPrint(node, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
}

// const tree2 = new Tree([1, 2, 3, 4, 5, 6, 7, 8]);
// tree2.prettyPrint(tree2.root);
const tree3 = new Tree([2]);
tree3.prettyPrint(tree3.root);
tree3.delete(2);
tree3.prettyPrint(tree3.root);
