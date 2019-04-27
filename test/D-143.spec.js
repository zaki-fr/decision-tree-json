import DecisionTree from "../lib/decision-tree"
import assert from 'assert'

describe('D-143 Séance d\'irradiation', function() {
    var decisionTree = null
    var root = null
    beforeEach(function() {
        decisionTree = new DecisionTree(__dirname + "/../database", "D-143.json")
        root = decisionTree.current()
    });
    it('should return 8 options of D-143 code for selection', function() {
        assert.equal(root.options.length, 8)
    });
    it('should return 6 possible GHM codes of D-143 Séance', function() {
        assert.equal(root.children.length, 7)
    });
    it('should return 28Z10 GHM code when the option is A-205', function() {
        var result = decisionTree.set(root.key, 'A-205').next()
        assert.equal(result.key, '28Z10')
    });
    it('should return 28Z11 GHM code when the option is A-170', function() {
        var result = decisionTree.set(root.key, 'A-170').next()
        assert.equal(result.key, '28Z11')
    });
    it('should return 28Z18 GHM code when the option is A-304', function() {
        var result = decisionTree.set(root.key, 'A-304').next()
        assert.equal(result.key, '28Z18')
    });
    it('should return 28Z23 GHM code when the option is A-318', function() {
        var result = decisionTree.set(root.key, 'A-318').next()
        assert.equal(result.key, '28Z23')
    });
    it('should return 28Z24 GHM code when the option is A-319', function() {
        var result = decisionTree.set(root.key, 'A-319').next()
        assert.equal(result.key, '28Z24')
    });
    it('should return 28Z25 GHM code when the option is A-320', function() {
        var result = decisionTree.set(root.key, 'A-320').next()
        assert.equal(result.key, '28Z25')
    });
    it('should return 28Z18 GHM code after reach 28Z11 by A-304', function() {
        var result = decisionTree.set(root.key, 'A-170').next()
        assert.equal(result.key, '28Z11')
        decisionTree.prev()
        result = decisionTree.set(root.key, 'A-304').next()
        assert.equal(result.key, '28Z18')
    });
});