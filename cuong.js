import DecisionTree from "./decision-tree"
import data from "./cuong.json"
import assert from 'assert';
const decisionTree = new DecisionTree(data)
var root = decisionTree.current()
var result = decisionTree.set(root.key, root.options[2].key).next()
assert.deepEqual(result.key, '28Z11')
console.log('Test are passed!', result)
