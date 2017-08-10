var DefRuleClass = require("./ModalBoxInput.js").DefaultRules;
var valRuleClass = require("./ModalBoxInput.js").validationRule;
var assert = require("assert");
var should = require("should");
describe("ValidationRule class", ()=>{

    describe("Validation Rule constructor test", ()=>{
        var valRule;
        beforeAll(()=>{
            valRule = new valRuleClass("testName", ()=>null, "some message");
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
            defaultRule = new DefRuleClass();
            ruleFuncNotEmpty = defaultRule.NOT_EMPTY;
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
            var defaultRule = new DefRuleClass();
            it("return a typeof function", ()=>{
                assert.equal(typeof defaultRule.MIN_LENGTH, "function");
            });
            describe("if pass null value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        defaultRule.MIN_LENGTH(null);
                    }).should.throw();
                });
            });
            describe("if pass undefined value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        defaultRule.MIN_LENGTH(undefined);
                    }).should.throw();
                });
            });  
            describe("if pass empty value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        defaultRule.MIN_LENGTH("");
                    }).should.throw();
                });
            });  
            describe("if pass a string", ()=>{
                it("should throw an error", ()=>{
                  (()=>{
                        var defaultRule = new DefRuleClass();
                        defaultRule.MIN_LENGTH("a string");
                    }).should.throw();
                });
            });   
            describe("if pass 0", ()=>{
                var rule;
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        defaultRule.MIN_LENGTH(0);
                    }).should.throw();
                });
            });  
            describe("if pass negative value", ()=>{
                var rule;
                it("should throw an error", ()=>{
                     (()=>{
                        var defaultRule = new DefRuleClass();
                        defaultRule.MIN_LENGTH(-1);
                    }).should.throw();
                });
            });
            describe("if pass 1", ()=>{
                var rule;
                it("should not throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        defaultRule.MIN_LENGTH(1);
                    }).should.not.throw();
                });
                    var defaultRule = new DefRuleClass();
                    var rule = defaultRule.MIN_LENGTH(1);
                it("if apply to a passed value == null return false", ()=>{
                    assert.equal(rule(null), false);
                });
                it("if apply to a passed value == undefined return false", ()=>{
                    assert.equal(rule(undefined), false);
                });
                it("if apply to a passed value.length == 0 return false", ()=>{
                    assert.equal(rule(""), false);
                }); 
                it("if apply to a passed value.lenght >=1 return true'", ()=>{
                    assert.equal(rule("0"), true);
                });               
            }); 
            describe("if pass 10", ()=>{
                var rule;
                it("should not throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        defaultRule.MIN_LENGTH(10);
                    }).should.not.throw();
                });
                var defaultRule = new DefRuleClass();
                var rule = defaultRule.MIN_LENGTH(10); 
                it("if apply to a passed value == null return false", ()=>{
                     assert.equal(rule(null), false);
                });
                it("if apply to a passed value == undefined return false", ()=>{
                    assert.equal(rule(undefined), false);
                });
                it("if apply to a passed value.length == 0 return false", ()=>{
                    assert.equal(rule(""), false);
                }); 
                it("if apply to a passed value.lenght < 10 return false", ()=>{
                    assert.equal(rule("123456789"), false);
                });   
                it("if apply to a passed value.lenght == 10 return true", ()=>{
                    assert.equal(rule("1234567890"), true);
                });  
                it("if apply to a passed value.lenght > 10 return true", ()=>{
                    assert.equal(rule("12345678901"), true);
                });                                               
            });                                                                                        
        }); 
        describe("MAX_LENGTH default validation rule", ()=>{
            it("return a typeof function", ()=>{
                assert.equal(typeof defaultRule.MAX_LENGTH, "function");
            });
            describe("if pass null value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.MAX_LENGTH(null);
                    }).should.throw();
                });
            });
            describe("if pass undefined value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.MAX_LENGTH(undefined);
                    }).should.throw();
                });
            });  
            describe("if pass empty value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.MAX_LENGTH("");
                    }).should.throw();
                });
            });  
            describe("if pass a string", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.MAX_LENGTH("a string");
                    }).should.throw();
                });
            });   
            describe("if pass 0", ()=>{
                var rule;
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.MAX_LENGTH(0);
                    }).should.throw();
                });
            });  
            describe("if pass negative value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.MAX_LENGTH(-1);
                    }).should.throw();
                });
            });
            describe("if pass 1", ()=>{
                var rule;
                it("should not throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.MAX_LENGTH(1);
                    }).should.not.throw();
                });
                var defaultRule = new DefRuleClass();
                var rule = defaultRule.MAX_LENGTH(1);                
                it("if apply to a passed value == null return false", ()=>{
                    assert.equal(rule(null), false);
                });
                it("if apply to a passed value == undefined return false", ()=>{
                    assert.equal(rule(undefined), false);
                });
                it("if apply to a passed value.length == 0 return false", ()=>{
                    assert.equal(rule(""), false);
                }); 
                it("if apply to a passed value.lenght ==1 return true'", ()=>{
                    assert.equal(rule("0"), true);
                });               
            }); 
            describe("if pass 10", ()=>{
                var rule;
                it("should not throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.MAX_LENGTH(10);
                    }).should.not.throw();
                });
                var defaultRule = new DefRuleClass();
                var rule = defaultRule.MAX_LENGTH(10);     
                it("if apply to a passed value == null return false", ()=>{
                    assert.equal(rule(null), false);
                });
                it("if apply to a passed value == undefined return false", ()=>{
                    assert.equal(rule(undefined), false);
                });
                it("if apply to a passed value.length == 0 return false", ()=>{
                    assert.equal(rule(""), false);
                }); 
                it("if apply to a passed value.lenght < 10 return true", ()=>{
                    assert.equal(rule("123456789"), true);
                });   
                it("if apply to a passed value.lenght == 10 return true", ()=>{
                    assert.equal(rule("1234567890"), true);
                });  
                it("if apply to a passed value.lenght > 10 return false", ()=>{
                    assert.equal(rule("12345678901"), false);
                });                                               
            });                                                                                        
        });  
        describe("EQUAL default validation rule", ()=>{
            it("return a typeof function", ()=>{
                assert.equal(typeof defaultRule.EQUAL, "function");
            });
            describe("if pass null value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                    var defaultRule = new DefRuleClass();
                    var rule = defaultRule.EQUAL(null);
                    }).should.throw();
                });
            });
            describe("if pass undefined value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                    var defaultRule = new DefRuleClass();
                    var rule = defaultRule.EQUAL(undefined);
                    }).should.throw();
                });
            });  
            describe("if pass empty value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                    var defaultRule = new DefRuleClass();
                    var rule = defaultRule.EQUAL("");
                    }).should.throw();
                });
            });  
            describe("if pass a string = 'hello'", ()=>{
                it("should not throw an error", ()=>{
                    (()=>{
                    var defaultRule = new DefRuleClass();
                    var rule = defaultRule.EQUAL("hello");
                    }).should.not.throw();
                });
                var defaultRule = new DefRuleClass();
                var rule = defaultRule.EQUAL("hello");
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
                assert.equal(typeof defaultRule.BETWEEN, "function");
            });
            describe("if pass <null, null> value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.BETWEEN(null, null);
                    }).should.throw();
                });
            });
            describe("if pass <null, undefined> value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.BETWEEN(null, undefined);
                    }).should.throw();
                });
            });
            describe("if pass <undefined, null> value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.BETWEEN(undefined, null);
                    }).should.throw();
                });
            }); 
            describe("if pass <undefined, ''> value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.BETWEEN(undefined, "");
                    }).should.throw();
                });
            });
            describe("if pass <undefined, undefined> value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.BETWEEN(undefined, undefined);
                    }).should.throw();
                });
            });
            describe("if pass <'', null> value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.BETWEEN("", null);
                    }).should.throw();
                });
            }); 
            describe("if pass <'', undefined> value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.BETWEEN("", undefined);
                    }).should.throw();
                });
            });
            describe("if pass <'', ''> value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.BETWEEN("", "");
                    }).should.throw();
                });
            });  
            describe("if pass <10, null> value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.BETWEEN(10, null);
                    }).should.throw();
                });
            }); 
            describe("if pass <10, undefined value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.BETWEEN(10, undefined);
                    }).should.throw();
                });
            });
            describe("if pass <'', 10> value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.BETWEEN("", 10);
                    }).should.throw();
                });
            }); 
            describe("if pass <null, 10> value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.BETWEEN(null, 10);
                    }).should.throw();
                });
            }); 
            describe("if pass <undefined, 10> value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.BETWEEN(undefined, 10);
                    }).should.throw();
                });
            });
            describe("if pass <10, ''> value", ()=>{
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.BETWEEN(10, "");
                    }).should.throw();
                });
            });                         
            describe("if pass <0, 0> value", ()=>{
                var rule;
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.BETWEEN(0, 0);
                    }).should.throw();
                });
            });  
            describe("if pass <negative, negative> value", ()=>{
                var rule;
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.BETWEEN(-1, -1);
                    }).should.throw();
                });
            });
            describe("if pass <string, int> value", ()=>{
                var rule;
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.BETWEEN("1", 10);
                    }).should.throw();
                });
            });
            describe("if pass <int, string> value", ()=>{
                var rule;
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.BETWEEN(10, "1");
                    }).should.throw();
                });
            });  
            describe("if pass <string, string> value", ()=>{
                var rule;
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.BETWEEN("10", "10");
                    }).should.throw();
                });
            });                       
            describe("if pass <a, b> where a==b", ()=>{
                var rule;
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.BETWEEN(10, 10);
                    }).should.throw();
                });
            });
            describe("if pass <a, b> where a > b", ()=>{
                var rule;
                it("should throw an error", ()=>{
                    (()=>{
                        var defaultRule = new DefRuleClass();
                        var rule = defaultRule.BETWEEN(11, 10);
                    }).should.throw();
                });
            });   
            describe("if pass <a, b> where a < b", ()=>{
                var defaultRule = new DefRuleClass();
                var rule = defaultRule.BETWEEN(4, 5);
                it("and a=4 and b=5 if applyed to value.length==4 return true", ()=>{
                    assert.equal(rule("1234"), true);
                });
                it("and a=4 and b=5 if applyed to value.length==5 return true", ()=>{
                    assert.equal(rule("12345"), true);
                });
                it("and a=4 and b=5 if applyed to value.length==6 return false", ()=>{
                    assert.equal(rule("123456"), false);
                });
                it("and a=4 and b=5 if applyed to value.length==3 return false", ()=>{
                    assert.equal(rule("123"), false);
                });                                
            });           
        });   

        //var ruleFuncMaxLength = defaultRule.MAX_LENGTH;
        //var ruleFuncEqual = defaultRule.EQUAL; 

    });
});

