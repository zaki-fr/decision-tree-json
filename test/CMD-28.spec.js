import DecisionTree from "../lib/decision-tree-json"
import assert from 'assert'

describe('CMD-28 CATÉGORIE MAJEURE DE DIAGNOSTIC N°28', function() {
    var decisionTree = null
    var root = null
    beforeEach(function() {
        decisionTree = new DecisionTree(__dirname + "/../database", "CMD-28.json")
        root = decisionTree.current()
    });
    it('should return `null` with no seance', function() {
        var result = decisionTree.set(root.key, 'NB-S').next({sessions : 0})
        assert.equal(result, null)
    });
    it('should return D-145 node with 9 options', function() {
        var result = decisionTree.set(root.key, 'NB-S').next({sessions : 2})
        result = decisionTree.set(result.key, 'D-145').next()
        assert.equal(result.key, 'D-145')
        assert.equal(result.options.length, 9)
    });
    it('should return D-145/D-113 node with 5 options', function() {
        var result = decisionTree.set(root.key, 'NB-S').next({sessions : 2})
        result = decisionTree.set(result.key, 'D-145').next()
        assert.equal(result.key, 'D-145')
        result = decisionTree.set(result.key, 'D-113').next()
        assert.equal(result.key, 'D-113')
        assert.equal(result.options.length, 5)
    });
    it('should return 28Z07 GHM code with D-145/D-114 node', function() {
        var result = decisionTree.set(root.key, 'NB-S').next({sessions : 2})
        result = decisionTree.set(result.key, 'D-145').next()
        assert.equal(result.key, 'D-145')
        result = decisionTree.set(result.key, 'D-114').next()
        assert.equal(result.key, '28Z07')
    });
    it('should return 28Z17 GHM code with D-145/D-063 node', function() {
        var result = decisionTree.set(root.key, 'NB-S').next({sessions : 2})
        result = decisionTree.set(result.key, 'D-145').next()
        assert.equal(result.key, 'D-145')
        result = decisionTree.set(result.key, 'D-063').next()
        assert.equal(result.key, '28Z17')
    });
    it('should return D-145/D-142 node with 5 options', function() {
        var result = decisionTree.set(root.key, 'NB-S').next({sessions : 2})
        result = decisionTree.set(result.key, 'D-145').next()
        assert.equal(result.key, 'D-145')
        result = decisionTree.set(result.key, 'D-142').next()
        assert.equal(result.key, 'D-142')
        assert.equal(result.options.length, 5)
    });
    it('should return D-145/D-143 node with 8 options', function() {
        var result = decisionTree.set(root.key, 'NB-S').next({sessions : 2})
        result = decisionTree.set(result.key, 'D-145').next()
        assert.equal(result.key, 'D-145')
        result = decisionTree.set(result.key, 'D-143').next()
        assert.equal(result.key, 'D-143')
        assert.equal(result.options.length, 8)
    });
    it('should return 28Z14 GHM code with D-145/D-139 node', function() {
        var result = decisionTree.set(root.key, 'NB-S').next({sessions : 2})
        result = decisionTree.set(result.key, 'D-145').next()
        assert.equal(result.key, 'D-145')
        result = decisionTree.set(result.key, 'D-139').next()
        assert.equal(result.key, '28Z14')
    });
    it('should return 28Z15 GHM code with D-145/D-047 node', function() {
        var result = decisionTree.set(root.key, 'NB-S').next({sessions : 2})
        result = decisionTree.set(result.key, 'D-145').next()
        assert.equal(result.key, 'D-145')
        result = decisionTree.set(result.key, 'D-047').next()
        assert.equal(result.key, '28Z15')
    });
    it('should return 28Z16 GHM code with D-145/D-054 node', function() {
        var result = decisionTree.set(root.key, 'NB-S').next({sessions : 2})
        result = decisionTree.set(result.key, 'D-145').next()
        assert.equal(result.key, 'D-145')
        result = decisionTree.set(result.key, 'D-054').next()
        assert.equal(result.key, '28Z16')
    });
    it('should return 90Z02Z code with Other option', function() {
        var result = decisionTree.set(root.key, 'NB-S').next({sessions : 2})
        result = decisionTree.set(result.key, 'D-145').next()
        assert.equal(result.key, 'D-145')
        result = decisionTree.set(result.key, 'Other').next()
        assert.equal(result.key, '90Z02Z')
    });
    it('should return 90Z01Z code with Other option', function() {
        var result = decisionTree.set(root.key, 'NB-S').next({sessions : 2})
        result = decisionTree.set(result.key, 'Other').next()
        assert.equal(result.key, '90Z01Z')
    });
});