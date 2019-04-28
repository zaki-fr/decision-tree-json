const DecisionTree = require("./lib/decision-tree-json").default
const decisionTree = new DecisionTree(__dirname + "/database", "ROOT.json")

function showOpts(index, opt) {
  var tabs = ''; for (i = 0; i < index; i++) tabs += ' '
  console.log(tabs + ' - Option ' + opt.key + ' (' + opt.label + ')')
}
function showGHMs(index, tree) {
  var tabs = ''; for (i = 0; i < index; i++) tabs += ' '
  var lastleafs = tree.lastleafs()
  var GHMs = lastleafs.length ? lastleafs.join() : tree.current().key
  console.log(tabs + index + '. ' + tree.lastsel().key + ' *GHMs: (' + GHMs + ')')
}
function getKeyValue(params) {
  return Object.keys(params).map(key => {
    return key + "=" + params[key]
  })
}
function diagnostic(index, arrays, params) {
  let last = null
  arrays.forEach(pos => {
    if (last) {
      decisionTree.set(last, pos).next(params)
      showGHMs(index, decisionTree)
      var current = decisionTree.current()
      current.options ? current.options.forEach(opt => showOpts(index, opt)) : null
      index++
    }
    last = pos
  })
  return index
}
function showResult() {
  console.log("")
  console.log(" HISTORY:", decisionTree.history().join(', '))
  console.log(" JOURNEY:", decisionTree.journey().map(trace => trace.params ? trace.key + '(' + getKeyValue(trace.params) + ')' : trace.key).join(', '))
  console.log("")
}
function main() {
  try {
    var index = 1
    index = diagnostic(index, ['ROOT', 'CMD-28', 'D-145', 'D-143', 'A-205'], { sessions: 1, age: 28 })
    // back to once node
    decisionTree.prev(); index--
    index = diagnostic(index, ['D-143', 'A-170'])
    showResult()
    // new session with unterminated node
    decisionTree.reset(); index = 1
    index = diagnostic(index, ['ROOT', 'CMD-28', 'D-145'], { sessions: 1, age: 28 })
    showResult()
    // new session with NULL termiated condition
    decisionTree.reset(); index = 1
    index = diagnostic(index, ['ROOT', 'CMD-28', 'D-145', 'D-143', 'A-342'], { sessions: 1, age: 28 })
    showResult()
  } catch (ex) {
    console.log(ex.message)
  }
}
main()