/// <reference path="../typings/index.d.ts" />

import ModalBoxInput from "../src/ts/ModalBoxInput";
import chai from "chai";
var valRuleClass = ModalBoxInput.validationRule;

describe("Constructor Test", ()=>{
    var valRule;
    beforeEach(()=>{
        valRule = new valRule("testName", function(val){return true}, "error message");
    });
    it("has correct name field", ()=>{
           const fieldName = valRule.field; 
           chai.assert(fieldName == "testName", "name field don't match!");
    });
});