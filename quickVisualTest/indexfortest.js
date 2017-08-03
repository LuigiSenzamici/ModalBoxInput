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
        this.parent = parent;
    }
    ElementoBase.prototype.create = function () {
        var e = document.createElement(this.nome);
        e.id = this.id;
        e.setAttribute("class", this.classe);
        var p = document.getElementById(this.parent);
        p.appendChild(e);
        this.elementInstance = e;
        return e;
    };
    ElementoBase.prototype.attr = function (name, val) {
        if (val) {
            this.elementInstance.setAttribute(name, val);
            this.attrList.push(name);
            return;
        }
        if (this.attrList.indexOf(name) != -1) {
            return this.elementInstance.getAttribute(name);
        }
        return null;
    };
    ElementoBase.prototype.removeAttr = function (name) {
        if (this.attrList.indexOf(name) != -1)
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
    ElementoBase.prototype.getInstance = function () { return this.elementInstance; };
    return ElementoBase;
}());
exports.ElementoBase = ElementoBase;
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
exports.ElementoInput = ElementoInput;
var ElementoLabel = (function (_super) {
    __extends(ElementoLabel, _super);
    function ElementoLabel(forId, parent) {
        var _this = _super.call(this, "label", "", "", parent) || this;
        _this.forId = forId;
        return _this;
    }
    ElementoLabel.prototype.create = function () {
        this.elementInstance = _super.prototype.create.call(this);
        this.elementInstance.setAttribute("for", this.forId);
        return this.elementInstance;
    };
    return ElementoLabel;
}(ElementoBase));
exports.ElementoLabel = ElementoLabel;
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
exports.ElementoButton = ElementoButton;

},{}],2:[function(require,module,exports){
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



},{"./ModalBoxInput.js":1}]},{},[2])