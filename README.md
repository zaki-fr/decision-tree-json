### @zaki-fr/decision-tree-json

A decision-tree library that works with JSON files database

***Installation***

```javascript
npm install
```

***Test Library***

```javascript
npm run dev
```

***Explanation***

Load DecisionTree module

```javascript
var DecisionTree = require("./lib/decision-tree-json").default
const decisionTree = new DecisionTree(__dirname + "/database", "ROOT.json")
```

JSON database structure
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
var result = decisionTree.pathKeys()
console.log(result)
```
