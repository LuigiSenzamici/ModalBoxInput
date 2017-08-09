var valRuleclass = require("./ModalBoxInput.js").validationRule;
var assert = require("assert");
var context = require("context");
describe("ValidationRule class", ()=>{

    describe("Validation Rule constructor test", ()=>{
        var valRule;
        beforeAll(()=>{
            valRule = new valRuleclass("testName", (val)=>true, "some message");
        });
        it("field should be 'testName", ()=>{
            assert.equal(valRule.field, "testName");
        });
        it("Validation function should be typeof function", ()=>{
            assert.equal(typeof valRule.rule, "function" );
        });
        it("Message should be 'some message'", ()=>{
            assert.equal(valRule.errorMessage, "some message");
        });
    });
    describe("Validation rule Default Included", ()=>{
        var valRule;
        var ruleFuncNotEmpty;
        beforeAll(()=>{
            valRule = new valRuleclass("testName", (val)=>true, "some message");
            ruleFuncNotEmpty = valRule.NOT_EMPTY;
        });
        describe("NOT_EMPTY default validation rule", ()=>{
            it("return a typeof function", ()=>{
                assert.equal(typeof ruleFuncNotEmpty, "function");
            });
            it("function return false if val is null", ()=>{
                assert.equal(ruleFuncNotEmpty(null), false);
            });
            it("function return false if val is undefined", ()=>{
                assert.equal(ruleFuncNotEmpty(null), false);
            });
            it("function return false if val.length==0", ()=>{
                assert.equal(ruleFuncNotEmpty(""), false);
            });
            it("function return true if val = 100", ()=>{
                assert.equal(ruleFuncNotEmpty(100), true);
            });     
            it("function return true if val = '100'", ()=>{
                assert.equal(ruleFuncNotEmpty('100'), true);
            });
        });
        describe("MIN_LENGTH default validation rule", ()=>{
            it("return a typeof function", ()=>{
                assert.equal(typeof valRule.MIN_LENGTH, "function");
            });
            context("if pass null value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.MIN_LENGTH(null).should.throw();
                });
            });
            context("if pass undefined value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.MIN_LENGTH(undefined).should.throw();
                });
            });  
            context("if pass empty value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.MIN_LENGTH("").should.throw();
                });
            });  
            context("if pass a string", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.MIN_LENGTH("a string").should.throw();
                });
            });   
            context("if pass 0", ()=>{
                var rule;
                it("should not throw an error", ()=>{
                    rule = valRule.MIN_LENGTH(0).should.not.throw();
                });
                it("if apply to a passed value == null return false", ()=>{
                    assert.equal(rule(null), false);
                });
                it("if apply to a passed value == undefined return false", ()=>{
                    assert.equal(rule(undefined), false);
                });
                it("if apply to a passed value.length == 0 return false", ()=>{
                    assert.equal(rule(""), false);
                }); 
                if("if apply to a passed value.lenght>0 return true'", ()=>{
                    assert.equal(rule("0"), true);
                });               
            });  
            context("if pass negative value", ()=>{
                var rule;
                it("should throw an error", ()=>{
                    rule = valRule.MIN_LENGTH(-1).should.throw();
                });
            });
            context("if pass 1", ()=>{
                var rule;
                it("should not throw an error", ()=>{
                    rule = valRule.MIN_LENGTH(1).should.not.throw();
                });
                it("if apply to a passed value == null return false", ()=>{
                    assert.equal(rule(null), false);
                });
                it("if apply to a passed value == undefined return false", ()=>{
                    assert.equal(rule(undefined), false);
                });
                it("if apply to a passed value.length == 0 return false", ()=>{
                    assert.equal(rule(""), false);
                }); 
                if("if apply to a passed value.lenght >=1 return true'", ()=>{
                    assert.equal(rule("0"), true);
                });               
            }); 
            context("if pass 10", ()=>{
                var rule;
                it("should not throw an error", ()=>{
                    rule = valRule.MIN_LENGTH(10).should.not.throw();
                });
                it("if apply to a passed value == null return false", ()=>{
                    assert.equal(rule(null), false);
                });
                it("if apply to a passed value == undefined return false", ()=>{
                    assert.equal(rule(undefined), false);
                });
                it("if apply to a passed value.length == 0 return false", ()=>{
                    assert.equal(rule(""), false);
                }); 
                if("if apply to a passed value.lenght < 10 return false", ()=>{
                    assert.equal(rule("123456789"), true);
                });   
                if("if apply to a passed value.lenght == 10 return true", ()=>{
                    assert.equal(rule("1234567890"), true);
                });  
                if("if apply to a passed value.lenght > 10 return true", ()=>{
                    assert.equal(rule("12345678901"), true);
                });                                               
            });                                                                                        
        }); 
        describe("MAX_LENGTH default validation rule", ()=>{
            it("return a typeof function", ()=>{
                assert.equal(typeof valRule.MAX_LENGTH, "function");
            });
            context("if pass null value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.MAX_LENGTH(null).should.throw();
                });
            });
            context("if pass undefined value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.MAX_LENGTH(undefined).should.throw();
                });
            });  
            context("if pass empty value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.MAX_LENGTH("").should.throw();
                });
            });  
            context("if pass a string", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.MAX_LENGTH("a string").should.throw();
                });
            });   
            context("if pass 0", ()=>{
                var rule;
                it("should not throw an error", ()=>{
                    rule = valRule.MAX_LENGTH(0).should.not.throw();
                });
                it("if apply to a passed value == null return false", ()=>{
                    assert.equal(rule(null), false);
                });
                it("if apply to a passed value == undefined return false", ()=>{
                    assert.equal(rule(undefined), false);
                });
                it("if apply to a passed value.length == 0 return false", ()=>{
                    assert.equal(rule(""), false);
                }); 
                if("if apply to a passed value.lenght>0 return true'", ()=>{
                    assert.equal(rule("0"), false);
                });               
            });  
            context("if pass negative value", ()=>{
                var rule;
                it("should throw an error", ()=>{
                    rule = valRule.MAX_LENGTH(-1).should.throw();
                });
            });
            context("if pass 1", ()=>{
                var rule;
                it("should not throw an error", ()=>{
                    rule = valRule.MAX_LENGTH(1).should.not.throw();
                });
                it("if apply to a passed value == null return false", ()=>{
                    assert.equal(rule(null), false);
                });
                it("if apply to a passed value == undefined return false", ()=>{
                    assert.equal(rule(undefined), false);
                });
                it("if apply to a passed value.length == 0 return false", ()=>{
                    assert.equal(rule(""), false);
                }); 
                if("if apply to a passed value.lenght ==1 return false'", ()=>{
                    assert.equal(rule("0"), false);
                });               
            }); 
            context("if pass 10", ()=>{
                var rule;
                it("should not throw an error", ()=>{
                    rule = valRule.MAX_LENGTH(10).should.not.throw();
                });
                it("if apply to a passed value == null return false", ()=>{
                    assert.equal(rule(null), false);
                });
                it("if apply to a passed value == undefined return false", ()=>{
                    assert.equal(rule(undefined), false);
                });
                it("if apply to a passed value.length == 0 return false", ()=>{
                    assert.equal(rule(""), false);
                }); 
                if("if apply to a passed value.lenght < 10 return true", ()=>{
                    assert.equal(rule("123456789"), true);
                });   
                if("if apply to a passed value.lenght == 10 return true", ()=>{
                    assert.equal(rule("1234567890"), true);
                });  
                if("if apply to a passed value.lenght > 10 return false", ()=>{
                    assert.equal(rule("12345678901"), true);
                });                                               
            });                                                                                        
        });  
        describe("EQUAL default validation rule", ()=>{
            it("return a typeof function", ()=>{
                assert.equal(typeof valRule.EQUAL, "function");
            });
            context("if pass null value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.EQUAL(null).should.throw();
                });
            });
            context("if pass undefined value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.EQUAL(undefined).should.throw();
                });
            });  
            context("if pass empty value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.EQUAL("").should.throw();
                });
            });  
            context("if pass a string = 'hello'", ()=>{
                it("should not throw an error", ()=>{
                    var rule = valRule.EQUAL("hello").should.not.throw();
                });
                it("if apply to a passed value = 'hello' return true", ()=>{
                    assert.equal(rule("hello"), true);
                });
                it("if apply to a passed value = 'hello boys' return false", ()=>{
                    assert.equal(rule("hello boys"), false);
                });                
                
            });   
                                                           
        });  
        describe("BETWEEN default validation rule", ()=>{
            it("return a typeof function", ()=>{
                assert.equal(typeof valRule.BETWEEN, "function");
            });
            context("if pass <null, null> value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.BETWEEN(null, null).should.throw();
                });
            });
            context("if pass <null, undefined> value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.BETWEEN(null, undefined).should.throw();
                });
            });
            context("if pass <undefined, null> value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.BETWEEN(undefined, null).should.throw();
                });
            }); 
            context("if pass <undefined, ''> value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.BETWEEN(undefined, "").should.throw();
                });
            });
            context("if pass <undefined, undefined> value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.BETWEEN(undefined, undefined).should.throw();
                });
            });
            context("if pass <'', null> value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.BETWEEN("", null).should.throw();
                });
            }); 
            context("if pass <'', undefined> value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.BETWEEN("", undefined).should.throw();
                });
            });
            context("if pass <'', ''> value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.BETWEEN("","").should.throw();
                });
            });  
            context("if pass <10, null> value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.BETWEEN(10, null).should.throw();
                });
            }); 
            context("if pass <10, undefined value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.BETWEEN(10, undefined).should.throw();
                });
            });
            context("if pass <'', 10> value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.BETWEEN("", 10).should.throw();
                });
            }); 
            context("if pass <null, 10> value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.BETWEEN(null, 10).should.throw();
                });
            }); 
            context("if pass <undefined, 10> value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.BETWEEN(undefined, 10).should.throw();
                });
            });
            context("if pass <10, ''> value", ()=>{
                it("should throw an error", ()=>{
                    var rule = valRule.BETWEEN(10,"").should.throw();
                });
            });                         
            context("if pass <0, 0> value", ()=>{
                var rule;
                it("should throw an error", ()=>{
                    rule = valRule.BETWEEN(0, 0).should.throw();
                });
            });  
            context("if pass <negative, negative> value", ()=>{
                var rule;
                it("should throw an error", ()=>{
                    rule = valRule.BETWEEN(-1, -1).should.throw();
                });
            });
            context("if pass <string, int> value", ()=>{
                var rule;
                it("should throw an error", ()=>{
                    rule = valRule.BETWEEN("1", 10).should.throw();
                });
            });
            context("if pass <int, string> value", ()=>{
                var rule;
                it("should throw an error", ()=>{
                    rule = valRule.BETWEEN(10, "1").should.throw();
                });
            });  
            context("if pass <string, string> value", ()=>{
                var rule;
                it("should throw an error", ()=>{
                    rule = valRule.BETWEEN("10", "1").should.throw();
                });
            });                       
            context("if pass <a, b> where a==b", ()=>{
                var rule;
                it("should throw an error", ()=>{
                    rule = valRule.BETWEEN(10, 10).should.throw();
                });
            });
            context("if pass <a, b> where a > b", ()=>{
                var rule;
                it("should throw an error", ()=>{
                    rule = valRule.BETWEEN(11, 10).should.throw();
                });
            });   
            context("if pass <a, b> where a < b", ()=>{
                var rule;
                it("and a=4 and b=5 if applyed to value.length==4 return true", ()=>{
                    rule = valRule.BETWEEN(4, 5);
                    assert.equal(rule("1234"), true);
                });
                it("and a=4 and b=5 if applyed to value.length==5 return true", ()=>{
                    rule = valRule.BETWEEN(4, 5);
                    assert.equal(rule("12345"), true);
                });
                it("and a=4 and b=5 if applyed to value.length==6 return false", ()=>{
                    rule = valRule.BETWEEN(4, 5);
                    assert.equal(rule("123456"), true);
                });
                it("and a=4 and b=5 if applyed to value.length==3 return false", ()=>{
                    rule = valRule.BETWEEN(4, 5);
                    assert.equal(rule("123"), true);
                });                                
            });           
        });   

        //var ruleFuncMaxLength = valRule.MAX_LENGTH;
        //var ruleFuncEqual = valRule.EQUAL; 

    });
});

