import DecisionTree from "./decision-tree"
import data from "./cuong.json"
const decisionTree = new DecisionTree(data)
decisionTree.set('D-143', 'A-170').next();
var result = decisionTree.current();
console.log(result)
