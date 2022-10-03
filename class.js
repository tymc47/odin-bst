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

    levelOrder(callback, queue = [this.root], results = []) {
        if (queue.length === 0) return callback ? true : results;

        const targetNode = queue.shift();
        if (targetNode.left) queue.push(targetNode.left);
        if (targetNode.right) queue.push(targetNode.right);

        callback ? callback(targetNode) : results.push(targetNode.data);
        return this.levelOrder(callback, queue, results);
    }

    inOrder(callback, targetNode = this.root, results = []) {
        if (targetNode.left) {
            results = this.inOrder(callback, targetNode.left, results);
        }

        callback ? callback(targetNode) : results.push(targetNode.data);

        if (targetNode.right) {
            results = this.inOrder(callback, targetNode.right, results);
        }

        return results;
    }

    preOrder(callback, targetNode = this.root, results = []) {
        callback ? callback(targetNode) : results.push(targetNode.data);

        if (targetNode.left) {
            results = this.preOrder(callback, targetNode.left, results);
        }

        if (targetNode.right) {
            results = this.preOrder(callback, targetNode.right, results);
        }

        return results;
    }

    postOrder(callback, targetNode = this.root, results = []) {
        if (targetNode.left) {
            results = this.postOrder(callback, targetNode.left, results);
        }

        if (targetNode.right) {
            results = this.postOrder(callback, targetNode.right, results);
        }

        callback ? callback(targetNode) : results.push(targetNode.data);

        return results;
    }

    height(targetNode = this.root) {
        if (targetNode === null) return -1;

        let leftHeight = this.height(targetNode.left);

        let rightHeight = this.height(targetNode.right);

        return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
    }

    depth(targetNode, currentNode = this.root, nodeDepth = 0) {
        if (currentNode === null || targetNode === null) return false;
        if (currentNode === targetNode) return nodeDepth;

        if (targetNode.data >= currentNode.data) {
            nodeDepth = this.depth(targetNode, currentNode.right, nodeDepth + 1);
        }

        if (targetNode.data < currentNode.data) {
            nodeDepth = this.depth(targetNode, currentNode.left, nodeDepth + 1);
        }

        return nodeDepth;
    }

    isBalanced(targetNode = this.root) {
        if (targetNode === null) return true;
        let leftHeight = this.height(targetNode.left);
        let rightHeight = this.height(targetNode.right);
        if (Math.abs(leftHeight - rightHeight) < 2) {
            return this.isBalanced(targetNode.left) && this.isBalanced(targetNode.right);
        } else return false;
    }

    rebalance() {
        const array = this.inOrder();
        this.root = this.buildTree(array);
    }

    //given print function
    //source: https://www.theodinproject.com/lessons/javascript-binary-search-trees
    prettyPrint(node = this.root, prefix = '', isLeft = true) {
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

module.exports = Tree;
