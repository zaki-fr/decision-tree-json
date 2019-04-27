var DecisionTree = require("./lib/decision-tree-json").default
const decisionTree = new DecisionTree(__dirname + "/database", "ROOT.json")

function showOpts(index, opt) {
  var tabs = ''; for (i = 0; i < index; i++) tabs += ' '
  console.log(tabs + index + '. Option ' + opt.key + ' (' + opt.label + ')')
}
function showGHMs(index, GHMs) {
  var tabs = ''; for (i = 0; i < index; i++) tabs += ' '
  console.log(tabs + '\t*GHMs: (' + GHMs.join() + ')')
}
var index = 1
console.log("DECISION ROOT")
decisionTree.set('ROOT', 'CMD-28').next()
decisionTree.current().options.forEach(opt => showOpts(index, opt))
showGHMs(index, decisionTree.lastleafs())
index++
decisionTree.set('CMD-28', 'NB-S').next({ seances: 1 })
decisionTree.current().options.forEach(opt => showOpts(index, opt))
showGHMs(index, decisionTree.lastleafs())
index++
decisionTree.set('NB-S', 'D-145').next()
decisionTree.current().options.forEach(opt => showOpts(index, opt))
showGHMs(index, decisionTree.lastleafs())
index++
decisionTree.set('D-145', 'D-143').next()
decisionTree.current().options.forEach(opt => showOpts(index, opt))
showGHMs(index, decisionTree.lastleafs())
index++
decisionTree.set('D-143', 'A-205').next()
console.log("DECISION PATH\t", decisionTree.pathKeys())
console.log("DECISION RESULT\t", decisionTree.current())