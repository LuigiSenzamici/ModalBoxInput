var valRuleclass = require("./ModalBoxInput.js").validationRule;
var assert = require("assert");
describe("Validation Rule constructor test", ()=>{
    var valRule = new valRuleclass("testName", (val)=>true, "some message");
    const fieldName = valRule.field;
    it("field should be 'testName", ()=>{
        assert.equal(fieldName, "testName");
    });
});
