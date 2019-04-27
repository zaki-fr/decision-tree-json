### @zaki-fr/decision-tree-json

A decision-tree library that works with JSON files database

BUILD SOURCE
---------------

*This section describes some hints for developer who want to contribute to this library.*

***Get Sourcecode***

```javascript
git clone https://github.com/zaki-fr/decision-tree-json.git
```

***Install Dependancies***

```javascript
npm install
```

***Create JSON database `database-path/new-db.json` file***

```javascript
{
    "key": "ROOT",
    "title": "A decision tree demonstration",
    "options": [
      {
        "key": "STATIC-NODE",
        "label": "A static traversal node option",
        "leadsTo": "STATIC-28"
      },
      {
        "key": "RULE-NODE",
        "label": "A node with dynamic rule option",
        "script": "params => params.age > 28 ? 'OVER-28': 'UNDER-28'"
      }
    ],
    "children": [
      {
        "label": "A static node with children nodes",
        "key": "STATIC-28",
        "options": [ {other-options} ],
        "children": [ {other-nodes} ]
      },
      {
        "label": "A node with age > 28",
        "key": "OVER-28"
      },
      {
        "label": "A node with age under 28",
        "key": "UNDER-28"
      }
    ]
}
```

***Create Test Spec `new-db.spec.js`***

```javascript
import DecisionTree from "@zaki-fr/decision-tree-json"
import assert from 'assert'

describe('Test `new-db` database', function() {
    var decisionTree = null
    var root = null
    beforeEach(function() {
        decisionTree = new DecisionTree(
            __dirname + "/database-path",
            "new-db.json"
        )
        root = decisionTree.current()
    });
    it('should return STATIC-28 node as you expected', function() {
        var result = decisionTree.set(root.key, 'STATIC-28').next()
        assert.equal(result.key, 'STATIC-28')
    });
})
```

***Test Engine/Database***

```javascript
npm test
```

***Test Library Usage***

```javascript
npm run dev
```

HOW TO USE
---------------

*This section describes for community users who want to use this library into their applications.*

Create JSON database structure `ROOT.json`
```javascript
{
    "key": "ROOT",
    "title": "A decision tree demonstration",
    "options": [
      {
        "key": "STATIC-NODE",
        "label": "A static traversal node option",
        "leadsTo": "STATIC-28"
      },
      {
        "key": "RULE-NODE",
        "label": "A node with dynamic rule option",
        "script": "params => params.age > 28 ? 'OVER-28': 'UNDER-28'"
      }
    ],
    "children": [
      {
        "label": "A referenced database as `STATIC-28.json` file",
        "ref": "STATIC-28"
      },
      {
        "label": "A node with age > 28",
        "key": "OVER-28"
      },
      {
        "label": "A node with age under 28",
        "key": "UNDER-28"
      }
    ]
}
```

Load DecisionTree module using native Javascript

```javascript
const DecisionTree = require("@zaki-fr/decision-tree-json").default
const decisionTree = new DecisionTree(__dirname + "/database", "ROOT.json")
```

Load DecisionTree module using ECMASCRIPT 6 (ES6) or TypeScript

```javascript
import DecisionTree from "@zaki-fr/decision-tree-json"
const decisionTree = new DecisionTree(__dirname + "/database", "ROOT.json")
```


Set tree node position `ROOT` and option value `STATIC-28`
```javascript
decisionTree.set('ROOT', 'STATIC-28').next()
```

> **Note**: `STATIC-28` node is an extended database stored in `STATIC-28.json` file at the same location with the main database `ROOT.json` in folder `__dirname + "/database"`

Get current navigated node from previous step
```javascript
var result = decisionTree.current()
console.log(result)
```

Node traversal rule with dynamic decision:
- Traveral parameters `{ age: 30 }` 
- For node.options.script `"script": "params => params.age > 28 ? 'OVER-28' : 'UNDER-28'"`

```javascript
decisionTree.set('ROOT', 'RULE-NODE').next({ age: 30 })
```

Back to previous node position
```javascript
decisionTree.prev()
var result = decisionTree.current()
console.log(result)
```

Print navigated nodes by keys
```javascript
var result = decisionTree.history()
console.log(result)
```

Print navigated options by keys
```javascript
var result = decisionTree.journey()
console.log(result)
```

Get all leafs from the current node
```javascript
var result = decisionTree.lastleafs()
console.log(result)
```
