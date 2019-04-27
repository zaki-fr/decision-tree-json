var DecisionTree = require("./lib/decision-tree-json").default
const decisionTree = new DecisionTree(__dirname + "/database", "ROOT.json")

var flatten = function flatten(list) {
  return list.reduce(function (a, b) {
      return a.concat(Array.isArray(b) ? flatten(b) : b);
  }, []).filter(function (elem) {
    return typeof elem !== "undefined" && elem != null;
  });
};

function showOpts(index, opt) {
  var tabs = ''; for (i = 0; i < index; i++) tabs += ' '
  console.log(tabs + index + '. Option ' + opt.key + ' (' + opt.label + ')')
}
function showGHMs(index, current) {
  function getlast(node) {
    return typeof node.children !== "undefined" ? getcode(node.children) : (node.key || node.ref)
  }
  function getcode(children) {
    var result = children.map((node) => {
      return getlast(node)
    })
    uniqueArray = result.filter(function (elem, pos) {
      return result.indexOf(elem) == pos;
    })
    return uniqueArray
  }
  var tabs = ''; for (i = 0; i < index; i++) tabs += ' '
  var GHMs = typeof current.children !== "undefined" ? getlast(current) : []
  console.log(tabs + '\t*GHMs: (' + flatten(GHMs).join() + ')')
}
var index = 1
console.log("DECISION ROOT")
decisionTree.set('ROOT', 'CMD-28').next()
decisionTree.current().options.forEach(opt => showOpts(index, opt))
showGHMs(index, decisionTree.current())
index++
decisionTree.set('CMD-28', 'NB-S').next({ seances: 1 })
decisionTree.current().options.forEach(opt => showOpts(index, opt))
showGHMs(index, decisionTree.current())
index++
decisionTree.set('NB-S', 'D-145').next()
decisionTree.current().options.forEach(opt => showOpts(index, opt))
showGHMs(index, decisionTree.current())
index++
decisionTree.set('D-145', 'D-143').next()
decisionTree.current().options.forEach(opt => showOpts(index, opt))
showGHMs(index, decisionTree.current())
index++
decisionTree.set('D-143', 'A-205').next()
console.log("DECISION PATH\t", decisionTree.pathKeys())
console.log("DECISION RESULT\t", decisionTree.current())