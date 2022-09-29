const mergeSort = require('./mergeSort')

class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array)
    }

    arrayToBST(array) {
        if (array.length === 0) return null
        if (array.length === 1) return new Node(array[0])

        const rootNode = new Node(array[Math.floor(array.length / 2)])
        rootNode.left = this.arrayToBST(array.slice(0, Math.floor(array.length / 2)))
        rootNode.right = this.arrayToBST(array.slice(Math.floor(array.length / 2) + 1))
        return rootNode
    }

    buildTree(array) {
        const sortedArray = mergeSort(array)
        const uniqSortedArray = [...new Set(sortedArray)]

        return this.arrayToBST(uniqSortedArray)
    }

    //given print function
    //source: https://www.theodinproject.com/lessons/javascript-binary-search-trees
    prettyPrint(node, prefix = '', isLeft = true) {
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
        }
    }
}

const tree1 = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
tree1.prettyPrint(tree1.root)
const tree2 = new Tree([1, 2, 3, 4, 5, 6, 7])
tree2.prettyPrint(tree2.root)
