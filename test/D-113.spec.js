import DecisionTree from "../lib/decision-tree-json"
import assert from 'assert'

describe('D-113 Séance d\'épuration extrarénale', function() {
    var decisionTree = null
    var root = null
    beforeEach(function() {
        decisionTree = new DecisionTree(__dirname + "/../database", "D-113.json")
        root = decisionTree.current()
    });
    it('should return 5 options of D-113 code for selection', function() {
        assert.equal(root.options.length, 5)
    });
    it('should return 5 possible GHM codes of D-113 Séance', function() {
        assert.equal(root.children.length, 5)
    });
    it('should return `BaseError` exception when the option is A-180', function() {
        try {
            decisionTree.set(root.key, 'A-180').next()
        } catch(ex) {
            assert.equal(ex.name, 'BaseError')
        }
    }); 

    it('should return 28Z02 GHM code when the option is A-181', function() {
        var result = decisionTree.set(root.key, 'A-181').next()
        assert.equal(result.key, '28Z02')
    });
    it('should return 28Z03 GHM code when the option is A-234', function() {
        var result = decisionTree.set(root.key, 'A-234').next()
        assert.equal(result.key, '28Z03')
    });
    it('should return 28Z04 GHM code when the option is D-030', function() {
        var result = decisionTree.set(root.key, 'D-030').next()
	decisionTree.prev()
        result = decisionTree.set(root.key, 'D-030').next()
        assert.equal(result.key, '28Z04')
    });
   
});