# Modal Box Input

Simply a Modal Box that display a form for input data

## Getting Started

npm install modal-box-input --save

## Simple Use

get boxclass from module

var boxClass = require("Modal-Box-Input").ModalBoxInput;

var Box = new boxClass("title", "message", ["input 1 name", "input 2 name" ... "input n name"], ["ok button text", "reset button text"]);


Box.okButtonEvent(fuction(dataFromInputs){

    //do something with array of name/value input

    //[

    //   {name:"input 1 name", value:"value of input 1"}

    //   {name:"input 2 name", value:"value of input 2"}

    //   ..... 

    //   {name:"input n name", value:"value of input n"} 

    //    ];

});

and now

Box.Open();

![Here Example](https://github.com/LuigiSenzamici/ModalBoxInput/blob/master/doc/BoxInputExample.PNG)

## Validation
it's also possible validate the input applying validation rule

first get validationRule class
```
var VRClass = require("Modal-Box-Input").validationRule;

//use

// var rule = new VRClass("input name", function(value_valueof_input){//code that return a boolean}, "error message");

var username0 = new VRClass("username", function(val){return (val!=null && val!=undefined && val.length>0)?true:false;}, "field can't be empty");

var username1 = new VRClass("username", function(val){return (val.length>3)?true:false;}, "field length must be > 3");

var password0 = new VRClass("password", function(val){return (val!=null && val!=undefined && val.length>0)?true:false;}, "field can't be empty");

var password1 = new VRClass("password", function(val){return (val.length>3)?true:false;}, "field length must be > 3");

and now (before open) set validation rule

Box.setValidationRule([username0, username1, password0, password1]);

Box.Open();
```

rules evaluation sequence run by more generic to more specific rule 

![Here Example](https://github.com/LuigiSenzamici/ModalBoxInput/blob/master/doc/BoxInputErrorExample.PNG)

## Documentation

[Documentation Here](http://github.com/LuigiSenzamici/ModalBoxInput/blob/master/doc/MD_API_doc/API.md)

## Built With

Typescript

Browserify

Gulp

Stylus




## Authors

[Luigi Senzamici](http://luigisenzamici.com)


## License

This project is licensed under the MIT License 



