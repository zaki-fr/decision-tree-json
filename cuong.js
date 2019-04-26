var DecisionTree = require("@ianwalter/decision-tree")
var data = require("./cuong.json")
console.log(data)
const decisionTree = new DecisionTree(data)
decisionTree.set('D-143', 'A-170').next()
var result = decisionTree.current();
console.log(result)
