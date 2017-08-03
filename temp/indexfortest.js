var classi = require("./ModalBoxInput.js");

var eb = classi.ElementoBase;
var div = new eb("div", "primodiv", "divclasse", "body");
div.create();

var inp = classi.ElementoInput;
var input = new inp("text", "primoinput", "inputclasse", "body");
var nodo = input.create();
nodo.addEventListener("input", function (e) {
    console.log("input");
});


