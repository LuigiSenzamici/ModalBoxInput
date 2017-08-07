var MBClass = require("./ModalBoxInput.js").ModalBoxInput;
var VRClass = require("./ModalBoxInput.js").validationRule;
var MBI = new MBClass("primo box", "adesso proviamo cosa succede", ["username", "password"]);
var username0 = new VRClass("username", function(val){return (val!=null && val!=undefined && val.length>0)?true:false;}, "il campo non puo essere vuoto");
var username1 = new VRClass("username", function(val){return (val.length>3)?true:false;}, "la lunghezza deve essere > 3");
var password = new VRClass("password", function(val){return (val.length>0)?true:false;}, "il campo non puo essere vuoto");
MBI.setValidationRule([username0, username1, password]);
MBI.setOkButtonEvent(function (valori) { console.log(valori);})
MBI.Open();




