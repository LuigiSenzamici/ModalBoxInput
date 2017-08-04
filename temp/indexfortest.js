var Modulo = require("./ModalBoxInput.js");
var ModalBoxinput = new Modulo.ModalBoxInput("primo box", "adesso proviamo cosa succede", ["username", "password"]);
var result = ModalBoxinput.Open();
console.log(result);


