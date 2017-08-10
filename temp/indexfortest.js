var MBClass = require("./ModalBoxInput.js").ModalBoxInput;
var VRClass = require("./ModalBoxInput.js").validationRule;
var MBI = new MBClass("login box", "insert your credential", ["username", "password"]);
MBI.setCssFile("ModalBoxInput.css");
//MBI.setNodeModulesPath("../");
//var username0 = new VRClass("username", function(val){return (val!=null && val!=undefined && val.length>0)?true:false;}, "field can't be empty");
//var username1 = new VRClass("username", function(val){return (val.length>3)?true:false;}, "field length must be > 3");
//var password = new VRClass("password", function(val){return (val.length>0)?true:false;}, "field can't be empty");
var DRClass = require("./ModalBoxInput.js").DefaultRules;
var DR = new DRClass();
var username0 = new VRClass("username", DR.NOT_EMPTY, "field can't be empty");
var username1 = new VRClass("username", DR.MIN_LENGTH(4), "field length must be > 3");
var password = new VRClass("password", DR.NOT_EMPTY, "field can't be empty");
MBI.setValidationRule([username0, username1, password]);
MBI.setOkButtonEvent(function (valori) { console.log(valori);})
MBI.Open();




