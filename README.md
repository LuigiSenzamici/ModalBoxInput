# Modal Box Input

Simply a Modal Box that display a form for input data

## Getting Started
```bash
npm install modal-box-input --save
```
## Simple Use

get boxclass from module
```javascript
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
```
and now
```javascript
Box.Open();
```
![Here Example](http://LuigiSenzamici.com/Content/Images/BoxInputExample.PNG)

##Styling
for styling Box class automatically insert a tag
```html
<link rel="stylesheet" href="node_modules/Modal-Box-Input/dist/ModalBoxInput.css">
```
if your path is different you have to link stylesheet in your path name in node_modules folder.

## Validation
it's also possible validate the input applying validation rule

first get validationRule class
```javascript
var VRClass = require("Modal-Box-Input").validationRule;
//use
// var rule = new VRClass("input name", function(value_valueof_input){//code that return a boolean}, "error message");
var username0 = new VRClass("username", function(val){return (val!=null && val!=undefined && val.length>0)?true:false;}, "field can't be empty");
var username1 = new VRClass("username", function(val){return (val.length>3)?true:false;}, "field length must be > 3");
var password0 = new VRClass("password", function(val){return (val!=null && val!=undefined && val.length>0)?true:false;}, "field can't be empty");
var password1 = new VRClass("password", function(val){return (val.length>3)?true:false;}, "field length must be > 3");
```
and now (before open) set validation rule
```javascript
Box.setValidationRule([username0, username1, password0, password1]);
Box.Open();
```
insert rules in a sequence that run by more generic to more specific rule 
![Here Image of an Example](http://LuigiSenzamici.com/Content/Images/BoxInputErrorExample.PNG)

##VALIDATION UPDATE
in this release are available default validation functions obtained by DefaultRules class;
first get an istance of DefaultRules class:
```javascript
var DRClass = require("Modal-Box-Input").DefaultRules;
var DR = new DRClass();
```
DR has this Default Functions
```javascript
DR.NOT_EMPY //no parameters
DR.EQUAL//single number parameter 
DR.MIN_LENGTH(min)//single number parameter evaluate (input val) >= min
DR.MAX_LENGTH(max)//single number parameter evaluate (input val) <= max
DR.BETWEEN(min, max)//two number parameter evaluate (input val)>= min && (input val)<= max
```
Here a complete example:
```javascript
var boxClass = require("Modal-Box-Input").ModalBoxInput;
var DRClass = require("Modal-Box-Input").DefaultClass;
var ValRuleClass = require("Modal-Box-Input").validationRule;
var regExpIsEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var Box = new boxClass("New Account", "Complete your subscription", ["Name", "Surname", "Username", "Password", "Email"]);
var DR = new DRClass();
var name0 = new ValRuleClass("Name", DR.NOT_EMPTY, "field can't be empty");
var name1 = new ValRuleClass("Name", DR.BETWEEN(3, 20), "field lenght must be >= 3 && <= 20");

var surname0 = new ValRuleClass("Surname", DR.NOT_EMPTY, "field can't be empty");
var surname1 = new ValRuleClass("Surname", DR.BETWEEN(3, 20), "field lenght must be >= 3 && <= 20");

var username0 = new ValRuleClass("Username", DR.NOT_EMPTY, "field can't be empty");
var username1 = new ValRuleClass("Username", DR.BETWEEN(3, 20), "field lenght must be >= 3 && <= 20");

var password0 = new ValRuleClass("Password", DR.NOT_EMPTY, "field can't be empty");
var password1 = new ValRuleClass("Password", DR.BETWEEN(8, 20), "field lenght must be >= 8 && <= 20");

var email0 = new ValRuleClass("Email", DR.NOT_EMPTY, , "field can't be empty");
var email1 = new ValRuleClass("Email", DR.BETWEEN(4, 30), "field lenght must be >= 4 && <= 30");

function isEmail(val){
    return val.test(regExpIsEmail);
}
var email2 = new ValRuleClass("Email", isEmail, "field isn't a valid Email");

Box.setValidationRule([name0, name1
                       surname0, surname1
                       username0, username1
                       password0, password1
                       email0, email1, email2]);

Box.setOkButtonEvent(function(dataFromInput){
    console.log(dataFromInput);
    //[
    //  {name:"Name", value:"value of Name field"},
    //  {name:"Surname", value:"value of Surname field"},
    //  {name:"Username", value:"value of Username field"},
    //  {name:"Password", value:"value of Password field"},
    //  {name:"Email", value:"value of Email field"},
    //]
});

Box.Open();
```
![Here Image of an full Example 1](http://LuigiSenzamici.com/Content/Images/BoxInputErrorExample1.PNG)

![Here Image of an full Example 2](http://LuigiSenzamici.com/Content/Images/BoxInputErrorExample2.PNG)




## Documentation

[Documentation Here](http://luigisenzamici.com/Documentazione/ModalBoxInput/modules/_modalboxinput_.html)

## Built With
Typescript

Browserify

Gulp

Stylus
## Author

[Luigi Senzamici](http://luigisenzamici.com)


## License

This project is licensed under the MIT License 



