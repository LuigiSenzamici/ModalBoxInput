(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ElementoBase = (function () {
    function ElementoBase(nome, id, classe, parent) {
        this.nome = nome;
        this.id = id;
        this.classe = classe;
        this.parent = (typeof (parent) === "string") ? document.getElementById(parent) : parent;
    }
    ElementoBase.prototype.create = function () {
        var e = document.createElement(this.nome);
        e.id = this.id;
        e.setAttribute("class", this.classe);
        this.parent.appendChild(e);
        this.elementInstance = e;
        return e;
    };
    ElementoBase.prototype.attr = function (name, val) {
        if (val) {
            this.elementInstance.setAttribute(name, val);
            return;
        }
        return this.elementInstance.getAttribute(name);
    };
    ElementoBase.prototype.removeAttr = function (name) {
        this.elementInstance.removeAttribute(name);
    };
    ElementoBase.prototype.removeClass = function (classe) {
        var res = [];
        var strClassi = this.elementInstance.getAttribute("class");
        if (strClassi != null && strClassi != undefined && strClassi.length > 0) {
            var elencoClassi = strClassi.split(" ");
            if (elencoClassi != null && elencoClassi != undefined && elencoClassi.length > 0) {
                if (classe.indexOf("@") != -1) {
                    var check = classe.substring(1, classe.length);
                    res = elencoClassi.filter(function (e) {
                        return e.indexOf(check) == -1;
                    });
                }
                else {
                    res = elencoClassi.filter(function (e) {
                        return e != classe;
                    });
                }
            }
            var newClassi = res.join(" ");
            this.elementInstance.setAttribute("class", newClassi);
        }
    };
    ElementoBase.prototype.setClass = function (classe) {
        var res = [];
        var strClassi = this.elementInstance.getAttribute("class");
        if (strClassi != null && strClassi != undefined && strClassi.length > 0) {
            var elencoClassi = strClassi.split(" ");
            if (elencoClassi != null && elencoClassi != undefined && elencoClassi.length > 0) {
                elencoClassi.push(classe);
                var newClassi = elencoClassi.join(" ");
                this.elementInstance.setAttribute("class", newClassi);
            }
            else {
                this.elementInstance.setAttribute("class", classe);
            }
        }
        else {
            this.elementInstance.setAttribute("class", classe);
        }
    };
    ElementoBase.prototype.setStyle = function (stringaNomeValore) {
        if (stringaNomeValore.indexOf(";") == -1)
            throw new Error("Bad Format: 'name:value;' is correct.");
        var listaImp = stringaNomeValore.split(";");
        var stStile = this.getStyle(null);
        if (stStile == null) {
            this.attr("style", stringaNomeValore);
            return;
        }
        var listaStili = stStile.split(";");
        var updated = [];
        listaImp.forEach(function (eI, iI, aI) {
            var nameI = eI.split(":")[0];
            var valI = eI.split(":")[1];
            listaStili.forEach(function (e, i, a) {
                var name = e.split(":")[0];
                var value = e.split(":")[1];
                if (name == nameI) {
                    e = [name, valI].join(":");
                    a[i] = e;
                    updated.push(eI);
                    return;
                }
            });
        });
        if (listaImp.length != updated.length) {
            updated.forEach(function (e, i, a) {
                var inde = listaImp.indexOf(e);
                listaImp.splice(inde, 1);
            });
            //lista imp contiene solo i valori nuovi che non 
            //hanno trovato corrispondenza e che quindi vanno aggiunti
            //al vettore che contiene i valori aggiornati
            listaStili = listaStili.concat(listaImp);
        }
        //lista stili contiene i valori aggiornati
        this.attr("style", listaStili.join(";"));
    };
    ElementoBase.prototype.getStyle = function (nome) {
        if (nome == null || nome == undefined)
            return this.attr("style", null);
        var stStile = this.attr("style", null);
        if (stStile == null || stStile == undefined)
            return null;
        var listaStili = stStile.split(";");
        listaStili.forEach(function (e, i, a) {
            var name = e.split(":")[0];
            if (name == nome)
                return e.split(":")[1];
        });
        return null;
    };
    ElementoBase.prototype.getInstance = function () { return this.elementInstance; };
    ElementoBase.prototype.on = function (event, Func, bubling) {
        if (bubling === void 0) { bubling = false; }
        this.elementInstance.addEventListener(event, Func, bubling);
    };
    return ElementoBase;
}());
var ElementoInput = (function (_super) {
    __extends(ElementoInput, _super);
    function ElementoInput(tipo, id, classe, parent) {
        var _this = _super.call(this, "input", id, classe, parent) || this;
        _this.name = id;
        _this.tipo = tipo;
        return _this;
    }
    ElementoInput.prototype.create = function () {
        this.elementInstance = _super.prototype.create.call(this);
        this.elementInstance.setAttribute("name", this.name);
        this.elementInstance.setAttribute("type", this.tipo);
        return this.elementInstance;
    };
    return ElementoInput;
}(ElementoBase));
var ElementoLabel = (function (_super) {
    __extends(ElementoLabel, _super);
    function ElementoLabel(forId, text, parent) {
        var _this = _super.call(this, "label", "", "", parent) || this;
        _this.forId = forId;
        _this.text = text;
        return _this;
    }
    ElementoLabel.prototype.create = function () {
        this.elementInstance = _super.prototype.create.call(this);
        this.elementInstance.setAttribute("for", this.forId);
        var testo = document.createTextNode(this.text);
        this.elementInstance.appendChild(testo);
        return this.elementInstance;
    };
    return ElementoLabel;
}(ElementoBase));
var ElementoButton = (function (_super) {
    __extends(ElementoButton, _super);
    function ElementoButton(id, classe, parent, text) {
        var _this = _super.call(this, "button", id, classe, parent) || this;
        _this.text = text;
        return _this;
    }
    ElementoButton.prototype.create = function () {
        this.elementInstance = _super.prototype.create.call(this);
        var t = document.createTextNode(this.text);
        this.elementInstance.appendChild(t);
        return this.elementInstance;
    };
    return ElementoButton;
}(ElementoBase));
var ElementoText = (function (_super) {
    __extends(ElementoText, _super);
    function ElementoText(id, classe, parent, text) {
        var _this = _super.call(this, "div", id, classe, parent) || this;
        _this.text = text;
        return _this;
    }
    ElementoText.prototype.create = function () {
        this.elementInstance = _super.prototype.create.call(this);
        var testo = document.createTextNode(this.text);
        this.elementInstance.appendChild(testo);
        return this.elementInstance;
    };
    return ElementoText;
}(ElementoBase));
var Overlay = (function (_super) {
    __extends(Overlay, _super);
    function Overlay(visibility) {
        var _this = _super.call(this, "div", "MB-Overlay", "overlay", document.getElementsByTagName("body")[0]) || this;
        _this.visibility = false;
        _this.visibility = visibility;
        var display = (_this.visibility) ? "display:block;" : "display:none;";
        var width = "width:" + window.innerWidth + "px;";
        var height = "height:" + window.innerHeight + "px;";
        _this.stileDefault = display + width + height + "position:fixed;top:0;left:0;z-index:1000;background-color:black;opacity:0.5;";
        return _this;
    }
    Overlay.prototype.create = function () {
        this.elementInstance = _super.prototype.create.call(this);
        this.setStyle(this.stileDefault);
        return this.elementInstance;
    };
    Overlay.prototype.setVisibility = function (val) {
        this.visibility = val;
        var display = (this.visibility) ? "display:block;" : "display:none;";
        var width = "width:" + window.innerWidth + "px;";
        var height = "height:" + window.innerHeight + "px;";
        this.setStyle(display + width + height);
    };
    return Overlay;
}(ElementoBase));
var Box = (function (_super) {
    __extends(Box, _super);
    function Box(visibility, width, height) {
        if (visibility === void 0) { visibility = false; }
        if (width === void 0) { width = "400px"; }
        if (height === void 0) { height = "auto"; }
        var _this = _super.call(this, "div", "MB-Box", "MBI-box", document.getElementsByTagName("body")[0]) || this;
        _this.visibility = false;
        _this.visibility = visibility;
        var display = (_this.visibility) ? "display:block;" : "display:none;";
        _this.width = "width:" + width + ";";
        _this.height = "height:" + height + ";";
        _this.stileDefault = display + _this.width + _this.height + "position:fixed;top:0;left:0;z-index:1001;background-color:white;opacity:1;";
        return _this;
    }
    Box.prototype.create = function () {
        this.elementInstance = _super.prototype.create.call(this);
        this.setStyle(this.stileDefault);
        return this.elementInstance;
    };
    Box.prototype.setVisibility = function (val) {
        this.visibility = val;
        var display = (this.visibility) ? "display:block;" : "display:none;";
        this.setStyle(display);
    };
    return Box;
}(ElementoBase));
var ElementoInputForm = (function (_super) {
    __extends(ElementoInputForm, _super);
    function ElementoInputForm(label, parent) {
        var _this = _super.call(this, "div", "MB-inlineInputBox", "MBI-inlineInputBox", parent) || this;
        _this.label = label;
        return _this;
    }
    ElementoInputForm.prototype.create = function () {
        this.elementInstance = _super.prototype.create.call(this);
        this.labelElement = new ElementoLabel("id-" + this.label, this.label, this.elementInstance);
        this.inputElement = new ElementoInput("input", "id-" + this.label, "MBI-inputElement", this.elementInstance);
        this.N_labelElement = this.labelElement.create();
        this.N_inputElement = this.inputElement.create();
        return this.elementInstance;
    };
    ElementoInputForm.prototype.getValue = function () {
        return this.N_inputElement.getAttribute("value");
    };
    ElementoInputForm.prototype.setValue = function (val) {
        this.N_inputElement.setAttribute("value", val);
    };
    return ElementoInputForm;
}(ElementoBase));
var ModalBoxInput = (function () {
    function ModalBoxInput(titolo, messaggio, listaInput, testoBottoni) {
        if (titolo === void 0) { titolo = ""; }
        if (messaggio === void 0) { messaggio = ""; }
        if (listaInput === void 0) { listaInput = []; }
        if (testoBottoni === void 0) { testoBottoni = ["Ok", "Reset"]; }
        this.inputList = [];
        this.overlay = new Overlay(false);
        this.mainBox = new Box(false);
        var N_overlay = this.overlay.create();
        var N_mainBox = this.mainBox.create();
        this.genTitolo(N_mainBox, titolo);
        this.genTesto(N_mainBox, messaggio);
        this.genInputList(N_mainBox, listaInput);
        this.genButtonBox(N_mainBox, testoBottoni);
    }
    ModalBoxInput.prototype.genTitolo = function (parent, titolo) {
        //titleBox
        this.titleBox = new ElementoBase("div", "MB-titleBox", "MBI-titleBox", parent);
        var N_titleBox = this.titleBox.create();
        this.titleBox.setStyle("height:17px;");
        //title
        this.titleText = new ElementoText("MB-Text", "MBI-Text", N_titleBox, titolo);
        var N_titleText = this.titleText.create();
        this.titleText.setStyle("position:relative;max-width:90%;float:left;");
        //close button
        this.closeButton = new ElementoButton("MB-closeButton", "MBI-closeButton", N_titleBox, "X");
        var N_closeButton = this.closeButton.create();
        this.closeButton.setStyle("position:relative;width:16px;height:17px;padding:0;font-weight:700;float:right;");
        var that = this;
        function Event_Chiudi(event) {
            that.Close();
        }
        this.closeButton.on("click", Event_Chiudi);
    };
    ModalBoxInput.prototype.genTesto = function (parent, messaggio) {
        //TextBox
        this.textBox = new ElementoBase("div", "MB-TextBox", "MBI-TextBox", parent);
        var N_textBox = this.textBox.create();
        //Text
        this.text = new ElementoText("MB-Text", "MBI-Text", N_textBox, messaggio);
        var N_text = this.text.create();
    };
    ModalBoxInput.prototype.genInputList = function (parent, listaInputP) {
        var _this = this;
        this.inputBox = new ElementoBase("div", "MB-inputBox", "MBI-inputBox", parent);
        var N_inputBox = this.inputBox.create();
        listaInputP.forEach(function (e, i, a) {
            _this.inputList.push(new ElementoInputForm(e, N_inputBox));
        });
        this.inputList.forEach(function (e, i, a) {
            e.create();
        });
    };
    ModalBoxInput.prototype.genButtonBox = function (parent, testoBottoniP) {
        this.buttonBox = new ElementoBase("div", "MB-buttonBox", "MBI-buttonBox", parent);
        var N_buttonBox = this.buttonBox.create();
        this.okButton = new ElementoButton("MB-okButton", "MBI-okButton", N_buttonBox, testoBottoniP[0]);
        var N_okButton = this.okButton.create();
        this.resetButton = new ElementoButton("MB-resetButton", "MBI-resetButton", N_buttonBox, testoBottoniP[1]);
        var N_resetButton = this.resetButton.create();
    };
    ModalBoxInput.prototype.Open = function () {
        this.overlay.setVisibility(true);
        this.mainBox.setVisibility(true);
    };
    ModalBoxInput.prototype.Close = function () {
        this.overlay.setVisibility(false);
        this.mainBox.setVisibility(false);
    };
    return ModalBoxInput;
}());
exports.ModalBoxInput = ModalBoxInput;

},{}],2:[function(require,module,exports){
var Modulo = require("./ModalBoxInput.js");
var ModalBoxinput = new Modulo.ModalBoxInput("primo box", "adesso proviamo cosa succede", ["username", "password"]);
ModalBoxinput.Open();



},{"./ModalBoxInput.js":1}]},{},[2])