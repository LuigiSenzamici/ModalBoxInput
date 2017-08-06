var MBI = require("./ModalBoxInput.js");
var ModalBoxinput = new MBI.ModalBoxInput("primo box", "adesso proviamo cosa succede", ["username", "password"]);
var valRuleClass = MBI.validationRule;
var username0 = new valRuleClass("username", function(val){return (val!=null && val!=undefined && val.length>0)?true:false;}, "il campo non puo essere vuoto");
var username1 = new valRuleClass("username", function(val){return (val.length>3)?true:false;}, "la lunghezza deve essere > 3");
var password = new valRuleClass("password", function(val){return (val.length>0)?true:false;}, "il campo non puo essere vuoto");
ModalBoxinput.setValidationRule([username0, username1, password]);
ModalBoxinput.setOkButtonEvent(function (valori) { console.log(valori);})
ModalBoxinput.Open();




