import BaseError from '@ianwalter/base-error'
import Path from 'path'

function findItemByKey(items = [], key) {
  for (let item of items) {
    if (item.key === key) {
      return item
    }
  }
}

function flatten(list) {
  return list.reduce(function (a, b) {
    return a.concat(Array.isArray(b) ? flatten(b) : b);
  }, []).filter(function (elem) {
    return typeof elem !== "undefined" && elem != null;
  });
}

function parseNodes(path, node) {
  if (typeof node.children !== "undefined") {
    node.children = node.children.map(child => {
      if (typeof child.ref !== "undefined") {
        var data = require(Path.join(path, child.ref + ".json"))
        return parseNodes(path, data)
      }
      return parseNodes(path, child)
    })
  }
  return node
}

export default class {
  constructor(path, file) {
    const tree = this.build(path, file)
    this.path = [tree]
    this.state = {}

    this.noChildren = `No children found to move to`
    this.noLead = `Can't determine which child to move to`
    this.noParent = `No parent node found to move to`
  }

  set(key, value) {
    if (typeof key === 'object' && value === undefined) {
      this.state = key
    } else {
      this.state[key] = value
    }
    return this
  }

  build(path, file) {
    var root = require(Path.join(path, file))
    return parseNodes(path, root)
  }

  current() {
    return this.path[this.path.length - 1]
  }

  goToNode(node) {
    return node ? this.path.push(node) && node : node
  }

  getNodeFromLeadsTo(currentNode, { leadsTo, script }, params) {
    if (typeof script !== "undefined") {
      leadsTo = eval(script)
    }
    const key = typeof leadsTo === 'function' ? leadsTo(params) : leadsTo
    return key ? findItemByKey(currentNode.children, key) : null
  }

  next(params) {
    const currentNode = this.current()
    // Get the selected option key from state or extract it from an array if
    // multiple options can be selected.
    let selectedOptionKey = this.state[currentNode.key]
    if (Array.isArray(selectedOptionKey) && selectedOptionKey.length === 1) {
      selectedOptionKey = selectedOptionKey[0]
    }

    // Find the selected option object by it's key.
    const selectedOption = findItemByKey(currentNode.options, selectedOptionKey)

    // Move to the next node.
    if (currentNode.children.length < 1) {
      // No children to move to!
      throw new BaseError(this.noChildren, currentNode)
    } else if (selectedOption && (selectedOption.leadsTo || selectedOption.script)) {
      // Move to what the single selected option tells us to move to.
      return this.goToNode(this.getNodeFromLeadsTo(currentNode, selectedOption, params))
    } else if (currentNode.leadsTo || currentNode.script) {
      // Move to what the currentNode tells us to move to (maybe there are
      // multiple options selected).
      return this.goToNode(this.getNodeFromLeadsTo(currentNode, currentNode, params))
    }

    // Throw an error if the next node to move to can't be determined.
    throw new BaseError(this.noLead, selectedOptionKey, selectedOption)
  }

  prev() {
    const parentNode = this.path[this.path.length - 2]
    if (parentNode) {
      return this.path.pop()
    }
    throw new BaseError(this.noParent)
  }

  pathKeys() {
    return this.path.map(({ key }) => key)
  }

  getleafs(children) {
    var result = children.map((node) => {
      return typeof node.children !== "undefined" ? this.getleafs(node.children) : (node.key || node.ref)
    })
    return result.filter(function (elem, pos) {
      return result.indexOf(elem) == pos;
    })
  }

  lastleafs() {
    var current = this.current()
    return typeof current.children !== "undefined" ? flatten(this.getleafs(current.children)) : []
  }
}