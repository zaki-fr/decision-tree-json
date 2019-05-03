import DecisionTree from "../lib/decision-tree-json"
import assert from 'assert'

describe('ORIENTATION vers les CATÉGORIES MAJEURES 27 et 15 vers les CATÉGORIES MAJEURES DE DIAGNOSTIC', function() {
    var decisionTree = null
    var root = null
    beforeEach(function() {
        decisionTree = new DecisionTree(__dirname + "/../database", "ROOT.json")
        root = decisionTree.current()
    });
    it('should return CM-27 node when having no session', function() {
        var result = decisionTree.set(root.key, 'CMD-28').next({sessions: 0})
        assert.equal(result.key, 'CM-27')
    });
    it('should return CMD-28 node with 2 options', function() {
        var result = decisionTree.set(root.key, 'CMD-28').next({sessions: 1})
        assert.equal(result.key, 'CMD-28')
        assert.equal(result.options.length, 2)
    });
});