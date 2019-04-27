var DecisionTree = require("./lib/decision-tree")
const decisionTree = new DecisionTree(__dirname + "/database", "ROOT.json")

decisionTree.set('attribute', 'D').next()
decisionTree.set('proficiency', 'swords').next()
var result = decisionTree.current();
