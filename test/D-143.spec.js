import DecisionTree from "../decision-tree"
import data from "../database/D-143.json"
import assert from 'assert'

describe('D-143 Séance d\'irradiation', function() {
    var decisionTree = null
    var root = null
    beforeEach(function() {
        decisionTree = new DecisionTree(data)
        root = decisionTree.current()
    });
    it('should return 8 options of D-143 code for selection', function() {
        assert.deepEqual(root.options.length, 8)
    });
    it('should return 7 possible GHM codes of D-143 Séance', function() {
        assert.deepEqual(root.children.length, 7)
    });
    it('should return 28Z11 GHM code when the option is A-170', function() {
        var result = decisionTree.set(root.key, 'A-170').next()
        assert.deepEqual(result.key, '28Z11')
    });
    it('should return 28Z18 GHM code after reach 28Z11 by A-304', function() {
        var result = decisionTree.set(root.key, 'A-170').next()
        assert.deepEqual(result.key, '28Z11')
        decisionTree.prev()
        result = decisionTree.set(root.key, 'A-304').next()
        assert.deepEqual(result.key, '28Z18')
    });
});