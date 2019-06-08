const DecisionTree = require("./lib/decision-tree-json").default
const decisionTree = new DecisionTree(__dirname + "/database", "ROOT.json")
const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function flatten(list) {
  return list.reduce(function (a, b) {
    return a.concat(Array.isArray(b) ? flatten(b) : b);
  }, []).filter(function (elem) {
    return typeof elem !== "undefined" && elem != null;
  });
}

function showOpts(index, opt, optidx) {
  var tabs = ''; for (i = 0; i < index; i++) tabs += ' '
  console.log(tabs + ' [' + optidx + ']. Option ' + opt.key + ' (' + opt.label + ')')
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
  var options = arrays.map(pos => {
    var options = null;
    if (last) {
      decisionTree.set(last, pos).next(params)
      showGHMs(index, decisionTree)
      var current = decisionTree.current()
      options = current.options ? current.options.map((opt, idx) => {
        showOpts(index, opt, idx)
        return opt.key
      }) : []
      index++
    }
    last = pos
    return options
  })
  return {
    options: options,
    index: index
  }
}

function startDiagnostic(index) {
  var current = decisionTree.current()
  return current.options.map((opt, idx) => {
    showOpts(index, opt, idx)
    return opt.key
  })
}

function showResult() {
  console.log("")
  console.log(" HISTORY:", decisionTree.history().join(', '))
  console.log(" JOURNEY:", decisionTree.journey().map(trace => trace.params ? trace.key + '(' + getKeyValue(trace.params) + ')' : trace.key).join(', '))
  console.log("")
}

function runDiagnostic(last, options, index, params) {
  reader.question('\nWhich option will you process? Choose from [0..' + (options.length-1) + ']: ', (idx) => {
    const transition = flatten([last, options[parseInt(idx)]])
    const result = diagnostic(index, transition, params)
    const nextOptions = flatten(result.options)
    const nextNode = transition[1]
    if (nextOptions.length) {
      runDiagnostic(nextNode, nextOptions, result.index, params)
    } else {
      showResult()
      reader.close();
    }
  })
}

function main() {
  try {
    var index = 0
    var doctorPath = ['ROOT']
    reader.question('Number of session? ', (nbrsession) => {
      reader.question('How old are your? ', (age) => {
        const params = { sessions: nbrsession, age: age }
        const cmdOptions = startDiagnostic(index++, params)
        runDiagnostic(doctorPath, flatten(cmdOptions), index, params)
      })
    });
  } catch (ex) {
    console.log(ex.message)
  }
}
main()