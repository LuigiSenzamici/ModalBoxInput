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

Box.open();
![Here Example](https://github.com/LuigiSenzamici/doc/BoxInputExample.PNG)
## Documentation

[Documentation Here](http://github.com/LuigiSenzamici/ModalBoxInput/blob/master/doc/MD_API_doc/API.md)

## Built With


## Authors

[Luigi Senzamici](http://luigisenzamici.com)


## License

This project is licensed under the MIT License 



