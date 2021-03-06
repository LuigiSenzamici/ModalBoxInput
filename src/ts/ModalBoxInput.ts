﻿

class ElementoBase {
    nome: string;
    id: string;
    classe: string;
    parent: any;
    protected elementInstance: any;
    protected removeText(){
        while(this.elementInstance.hasChildNodes())this.elementInstance.removeChild(this.elementInstance.firstChild);
    }
    constructor(nome: string, id: string, classe: string, parent: any) {
        this.nome = nome;
        this.id = id;
        this.classe = classe;
        this.parent = (typeof (parent) === "string") ? document.getElementById(parent): parent;
    }
    public create(): any {
        var e = document.createElement(this.nome);
        e.id = this.id;
        e.setAttribute("class", this.classe);
        this.parent.appendChild(e);
        this.elementInstance = e;
        return e;
    }
    public attr(name:string, value: string) :any{
        if (value) {
            this.elementInstance.setAttribute(name, value);
            return;
        }
      return this.elementInstance.getAttribute(name);
    }
    public removeAttr(name: string):void{
        this.elementInstance.removeAttribute(name);
    }

    public removeClass(className:string ):void{
    var res = [];
    var strClassi = this.elementInstance.getAttribute("class");
    if (strClassi != null && strClassi != undefined && strClassi.length > 0) {
        var elencoClassi = strClassi.split(" ");
        if (elencoClassi != null && elencoClassi != undefined && elencoClassi.length > 0) {
            if (className.indexOf("@") != -1) {
                var check = className.substring(1, className.length);
                res = elencoClassi.filter(function (e:any) {
                    return e.indexOf(check) == -1
                });
            } else {
                res = elencoClassi.filter(function (e:any) {
                    return e != className;
                });
            }
        }
        var newClassi = res.join(" ");
        this.elementInstance.setAttribute("class", newClassi);
    }
    }

    public setClass(className:string):void{
    var res = [];
    var strClassi = this.elementInstance.getAttribute("class");
    if (strClassi != null && strClassi != undefined && strClassi.length > 0) {
        var elencoClassi = strClassi.split(" ");
        if (elencoClassi != null && elencoClassi != undefined && elencoClassi.length > 0) {
            elencoClassi.push(className);
            var newClassi = elencoClassi.join(" ");
            this.elementInstance.setAttribute("class", newClassi);
        } else {
            this.elementInstance.setAttribute("class", className);
        }

    } else {
        this.elementInstance.setAttribute("class", className);
    }
    }

    public setStyle(nameValueString: string): void {
        if (nameValueString.indexOf(";") == -1) throw new Error("Bad Format: 'name:value;' is correct.");
        let listaImp :string[] = nameValueString.split(";");
        listaImp.pop();
        let stStile = this.getStyle(null);

        if (stStile == null) {
            this.attr("style", nameValueString);
            return;
        }

        let listaStili: string[] = stStile.split(";");
        let updated: Array<string> = [];
        listaImp.forEach((eI, iI, aI) => {
            let nameI: string = eI.split(":")[0];
            let valI: string = eI.split(":")[1];
            listaStili.forEach((e, i, a) => {
                let name: string = e.split(":")[0];
                let value: string = e.split(":")[1];
                if (name == nameI) {
                    e = [name, valI].join(":");
                    a[i] = e;
                    updated.push(eI);
                    return;
                }
            });
        });
        if (listaImp.length != updated.length) {
            updated.forEach((e, i, a) => {
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
    }

    public getStyle(name: string): any {
        if (name == null || name == undefined) {
            let res:string =this.attr("style", null);
            if(res!=null){
            if(res.lastIndexOf(";")!=res.length -1)res+=";";
            }
            return res;
        }
        let stStile = this.attr("style", null);
        if (stStile == null || stStile == undefined) return null;
        let listaStili: string[] = stStile.split(";");
        listaStili.forEach((e, i, a) => {
            let nome: string = e.split(":")[0];
            if (name == nome) return e.split(":")[1];
        });
        return null;
    }
    public removeStyle(name:string):void{
        if (name == null || name == undefined) return this.attr("style", null);
        let stStile = this.attr("style", null);
        if (stStile == null || stStile == undefined) return null;
        let listaStili: string[] = stStile.split(";");
        listaStili.pop();
        let res:string[] = [];
        listaStili.forEach((e, i, a)=>{
                let nome:string = e.split(":")[0];
                if(name !=nome)res.push(e);
        });
        this.attr("style", res.join(";"));
    }
    public getInstance(): any { return this.elementInstance; }
    public on(event: string, Func: Function, bubling: boolean=false):void {
        this.elementInstance.addEventListener(event, Func, bubling);
        
        }
}
class ElementoInput extends ElementoBase {
    name: string;
    tipo: string;
    constructor(tipo: string, id: string, classe: string, parent: any ) {
        super("input", id, classe, parent);
        this.name = id;
        this.tipo = tipo;
    }
    public create(): any {
        this.elementInstance = super.create();
        this.elementInstance.setAttribute("name", this.name);
        this.elementInstance.setAttribute("type", this.tipo);
        return this.elementInstance;
    }
    public setValue(value: string): void {
        (document.getElementById(this.id) as HTMLInputElement).value = value;
       
    }
    public getValue(): string {
        return (document.getElementById(this.id) as HTMLInputElement).value;
    }
}
class ElementoLabel extends ElementoBase {
    forId: string;
    text: string;
    constructor(forId: string, text: string, parent: any) {
        super("label", "", "", parent);
        this.forId = forId;
        this.text = text;
    }
    public create(): any {
        this.elementInstance = super.create();
        this.elementInstance.setAttribute("for", this.forId);
        var testo = document.createTextNode(this.text);
        this.elementInstance.appendChild(testo);
        return this.elementInstance;
    }
}
class ElementoButton extends ElementoBase {
    text: string;
    constructor(id: string, classe:string, parent: any, text:string) {
        super("button", id, classe, parent);
        this.text = text;
    }
    public create(): any {
        this.elementInstance = super.create();
        var t = document.createTextNode(this.text);
        this.elementInstance.appendChild(t);
        return this.elementInstance;
    }
    public setText(value:string){
        this.removeText();
        var testo = document.createTextNode(value);
        this.elementInstance.appendChild(testo);
    }
}
class ElementoText extends ElementoBase {
    text: string;

    constructor(id: string, classe: string, parent: any, text: string) {
        super("div", id, classe, parent);
        this.text = text;
    }
    public create(): any {
        this.elementInstance = super.create();
        var testo = document.createTextNode(this.text);
        this.elementInstance.appendChild(testo);
        return this.elementInstance;
    }
    public setText(val:string):void{
        this.removeText();
        var testo = document.createTextNode(val);
        this.elementInstance.appendChild(testo);
    }
    public getText():string{
        var testo = this.elementInstance.firstChild;
        return testo;
    }
}
class ElementoInputForm extends ElementoBase {
    labelElement: ElementoLabel;
    inputElement: ElementoInput;
    label: string;
    errorText:ElementoText;
    N_labelElement: any;
    N_inputElement: any;
    N_errorText:any;
    constructor(label: string, parent:any) {
        super("div", "MB-inlineInputBox", "MBI-inlineInputBox", parent);
        this.label = label;
    }
    public create(): any {
        this.elementInstance = super.create();
        this.labelElement = new ElementoLabel("id-" + this.label, this.label, this.elementInstance);
        this.inputElement = new ElementoInput("text", "id-" + this.label, "MBI-inputElement", this.elementInstance);
        this.errorText = new ElementoText("ErrorText-"+this.label, "MBI-ErrorText", this.elementInstance, "");
        this.N_labelElement = this.labelElement.create();
        this.N_inputElement = this.inputElement.create();
        this.N_errorText = this.errorText.create();
        this.errorText.setStyle("display:none;");
        return this.elementInstance;
    }
    public getValue(): string {
        return this.inputElement.getValue();
    }
    public setValue(val: string): void {
        this.inputElement.setValue(val);
    }
    public showErrorMessage(val:string):void{
        this.errorText.setText(val);
        this.errorText.setStyle("display:block;");
    }
    public hideErrorMessage():void{
        this.errorText.setText("");
        this.errorText.setStyle("display:none;");
    }
}

class Overlay extends ElementoBase {
    visibility: boolean = false;
    private stileDefault: string;
    constructor(visibility: boolean =false) {
    super("div", "MB-Overlay", "MBI-Overlay", document.getElementsByTagName("body")[0]);
    this.visibility = visibility;
    let display: string = (this.visibility) ? "display:block;" : "display:none;";
    let width: string = "width:" + window.innerWidth + "px;";
    let height: string = "height:" + window.innerHeight + "px;";
    this.stileDefault = display + width + height + "position:fixed;top:0;left:0;z-index:1000;"
    }
    public create(): any {
        this.elementInstance = super.create();
        this.setStyle(this.stileDefault);
        return this.elementInstance;
    }
    public setVisibility(val: boolean): void {
        this.visibility = val;
        let display: string = (this.visibility) ? "display:block;" : "display:none;";
        let width: string = "width:" + window.innerWidth + "px;";
        let height: string = "height:" + window.innerHeight + "px;";
        this.setStyle(display + width + height);
    }

}
class Box extends ElementoBase {
    visibility: boolean = false;
    width: string;
    height: string;
    top:string;
    left:string;
    private stileDefault: string;
    constructor(visibility: boolean = false, width:string = "400px", height:string="auto") {
        super("div", "MB-Box", "MBI-Box", document.getElementsByTagName("body")[0]);
        this.visibility = visibility;
        let display: string = (this.visibility) ? "display:block;" : "display:none;";
        this.width= "width:" + width + ";";
        this.height = "height:" + height + ";";
        this.stileDefault = display + this.width + this.height + "top:0px;left:0px;position:fixed;z-index:1001;background-color:white;opacity:1;"
    }
    public create(): any {
        this.elementInstance = super.create();
        this.setStyle(this.stileDefault);
        return this.elementInstance;
    }
    public setVisibility(val: boolean): void {
        this.visibility = val;
        let display: string = (this.visibility) ? "display:block;" : "display:none;";
        this.setStyle(display);
    }
}
class DefaultRules{
    public NOT_EMPTY = (val:any)=>{
        if(val!=null && val!=undefined){
            if(typeof val === "number")return true;
            if(val.length > 0)return true;
        }
        return false;
    };
    public MIN_LENGTH = (val:any)=>{
        if(val==null)throw new Error("Min Length can't be null !");
        if(val==undefined)throw new Error("Min Length can't be undefined !");
        if(val =="")throw new Error("Min Length can't be empty !");
        if(typeof val === "string")throw new Error("Min Length can't be a string");
        if(val<0)throw new Error("Min Length can't be a negative value !");
        return (checkValue:any)=>{
                if(checkValue == null)return false;
                if(checkValue == undefined)return false;
                if(typeof checkValue !== "string")checkValue = checkValue.toString();
                if(checkValue.length == 0)return false;
                if(checkValue.length >= val)return true;
                return false;
        }

    }
    public MAX_LENGTH = (val:any)=>{
        if(val==null)throw new Error("Max Length can't be null !");
        if(val==undefined)throw new Error("Max Length can't be undefined !");
        if(val =="")throw new Error("Max Length can't be empty !");
        if(typeof val === "string")throw new Error("Max Length can't be a string");
        if(val<0)throw new Error("Max Length can't be a negative value !");
        return (checkValue:any)=>{
                if(checkValue == null)return false;
                if(checkValue == undefined)return false;
                if(typeof checkValue !== "string")checkValue = checkValue.toString();
                if(checkValue.length == 0)return false;
                if(checkValue.length <= val)return true;
                return false;
        }

    }  
    public EQUAL = (val:any)=>{
        if(val==null)throw new Error("Value can't be null !");
        if(val==undefined)throw new Error("Value can't be undefined !");
        if(val =="")throw new Error("Value can't be empty !");
        return (checkValue:any)=>{
                if(checkValue == null)return false;
                if(checkValue == undefined)return false;
                 if(checkValue.length == 0)return false;
                if(checkValue == val)return true;
                return false;
        }
    }
    public BETWEEN = (val_A:any, val_B:any)=>{
        if(val_A == null)throw new Error("val_A can't be null !");
        if(val_A == undefined)throw new Error("val_A can't be undefined !");
        if(val_A == "")throw new Error("val_A can't be empty !");
        if(val_B == null)throw new Error("val_B can't be null !");
        if(val_B == undefined)throw new Error("val_B can't be undefined !");
        if(val_B == "")throw new Error("val_B can't be empty !");
        if(typeof val_A === 'string' || typeof val_B ==='string')throw new Error("values can't be string !")
        if(val_A<0 || val_B <0)throw new Error("values can't be negative !");
        if(val_A >= val_B)throw new Error("Bad values: val_A can't be >= val_B !");
        return (checkValue:any)=>{
                 if(checkValue == null)return false;
                if(checkValue == undefined)return false;
                 if(checkValue.length == 0)return false;
                if(checkValue.length >= val_A && checkValue.length <= val_B)return true;
                return false;
        }
    }   
    constructor(){}
}
class validationRule{
    field:string;
    rule:Function;
    errorMessage:string;
    constructor(field:string, validationFunction:any, errorMessage:string){
        this.field=field;
        this.errorMessage=errorMessage;
        this.rule = validationFunction;
    }

}
class ModalBoxInput {
        overlay: Overlay;
        mainBox: Box;
        titleBox: ElementoBase;
        titleText: ElementoText;
        textBox: ElementoBase;//qui va il testo
        text: ElementoText;
        buttonBox: ElementoBase;
        okButton: ElementoButton;
        resetButton: ElementoButton;
        closeButton: ElementoButton;
        inputBox: ElementoBase;
        inputList: Array<ElementoInputForm> = [];
        validationRule : validationRule;
        validationRules:Array<validationRule> = [];
        private cssDefaultFileName = "ModalBoxInput.css";
        private cssDefaultFilePath = "node_modules/modal-box-input/dist/";
        private cssDefaultBasePath = "../";

        private cssFileName = "ModalBoxInput.css";
        private cssFilePath = "node_modules/modal-box-input/dist/";
        private cssBasePath = "../";

        private currentCssFile = "";
            EventOk: (event: any) =>void;
            private updateCssLinkRef(){
                var link = document.querySelectorAll('link[data-module="cssPath"')[0];
                this.currentCssFile = this.cssBasePath + this.cssFilePath + this.cssFileName
                link.setAttribute("href", this.currentCssFile);
            }            
            private genTitolo(parent: any, titolo:string): void {
                //titleBox
                this.titleBox = new ElementoBase("div", "MB-titleBox", "MBI-titleBox", parent);
                let N_titleBox = this.titleBox.create();
                this.titleBox.setStyle("min-height:17px;")
                //title
                this.titleText = new ElementoText("MB-Text", "MBI-Text", N_titleBox, titolo);
                let N_titleText = this.titleText.create();
                this.titleText.setStyle("position:relative;max-width:90%;float:left;");
                //close button
                this.closeButton = new ElementoButton("MB-closeButton", "MBI-closeButton", N_titleBox, "X");
                let N_closeButton = this.closeButton.create();
                var that = this;
                function Event_Chiudi(event: any): void {
                    that.inputList.forEach((e, i, a) => {
                        e.setValue("");
                        e.hideErrorMessage();
                    });
                        that.Close();
                }
                this.closeButton.on("click", Event_Chiudi);
        }
            private genTesto(parent: any, messaggio:string): void {
                //TextBox
                this.textBox = new ElementoBase("div", "MB-TextBox", "MBI-TextBox", parent);
                let N_textBox = this.textBox.create();

                //Text
                this.text = new ElementoText("MB-Text", "MBI-Text", N_textBox, messaggio);
                let N_text = this.text.create();
            }
            private genInputList(parent: any, listaInputP:string[]): void {
                this.inputBox = new ElementoBase("div", "MB-inputBox", "MBI-inputBox", parent);
                let N_inputBox = this.inputBox.create();
                listaInputP.forEach((e, i, a) => {
                    this.inputList.push(new ElementoInputForm(e, N_inputBox));
                });
                this.inputList.forEach((e, i, a) => {
                    e.create();
                });
                
            }
            private genButtonBox(parent: any, testoBottoniP: string[]): void {
                this.buttonBox = new ElementoBase("div", "MB-buttonBox", "MBI-buttonBox", parent);
                let N_buttonBox = this.buttonBox.create();

                this.okButton = new ElementoButton("MB-okButton", "MBI-okButton", N_buttonBox, testoBottoniP[0]);
                let N_okButton = this.okButton.create();
                this.okButton.on("click", this.EventOk);
                let that = this;
                this.resetButton = new ElementoButton("MB-resetButton", "MBI-resetButton", N_buttonBox, testoBottoniP[1]);
                let N_resetButton = this.resetButton.create();
                
                function EventReset(event: any): void{
                    that.inputList.forEach((e, i, a) => {
                        e.setValue("");
                        e.hideErrorMessage();
                    });
                    
                }
                this.resetButton.on("click", EventReset);
                
            }
            private dataIsValid():boolean{
                let res:boolean=true;
                if(this.validationRules.length ==0)return true;
                this.inputList.forEach((e, i, a)=>{
                    let rules:validationRule[] = this.validationRules.filter((ev, iv, av): any =>{
                                return e.label==ev.field;
                    });
                    rules.every((er:validationRule):boolean =>{
                        if(er.rule(e.getValue())==false){
                        e.showErrorMessage(er.errorMessage);
                        res = false;
                        return false;
                        }
                    return true;
                    });
                });
                return res;
            }
            private getComputed(element:any, dim:any):number{
                let res:number= -1;
                let st:string;
                let computed = window.getComputedStyle(element, null);
                st = computed.getPropertyValue(dim);
                res = parseInt(st.substring(0, st.length -2));
                return res;
             }
            private calculateTop():number{
                let res = -1;
                let WH:number = window.innerHeight;
                let height:number = this.getComputed(this.mainBox.getInstance(), "height");
                if(WH<=height){
                    this.mainBox.setStyle("overflow-y:scroll;height:" + WH.toString() + "px;");
                    return 0;
                }
                this.mainBox.removeStyle("overflow-y");
                res = (WH - height)/2;
                res = res -height;
                return res;
            }
            private calculateLeft():number{
                let res = -1;
                let WW:number = window.innerWidth;
                let width:number = this.getComputed(this.mainBox.getInstance(), "width");
                if(WW<=width){
                    this.mainBox.setStyle("overflow-x:scroll;width:" + WW.toString() + "px;");
                    return 0;
                }
                this.mainBox.removeStyle("overflow-x");
                res = (WW - width)/2;
                //res = res -width/2;
                return res;
            }
            private genCssReference():void{
                var res = document.querySelectorAll('link[data-module="cssPath"');
                if(res!=null && res!=undefined && res.length > 0)return;
                let head = document.getElementsByTagName("head")[0];
                let stile = document.createElement("link");
                stile.setAttribute("rel","stylesheet");
                stile.setAttribute("data-module", "cssPath");
                this.cssBasePath = this.cssDefaultBasePath;
                this.cssFileName = this.cssDefaultFileName;
                this.cssFilePath = this.cssDefaultFilePath;
                stile.setAttribute("href", this.cssDefaultBasePath +  this.cssDefaultFilePath + this.cssDefaultFileName);
                head.appendChild(stile);
            }
            constructor(titolo:string = "", messaggio:string="", listaInput:string[]=[], testoBottoni:string[]=["Ok", "Reset"]) {
                this.overlay = new Overlay(false);
                this.mainBox = new Box(false);
                let N_overlay = this.overlay.create();
                let N_mainBox = this.mainBox.create();

                this.genTitolo(N_mainBox, titolo);
                this.genTesto(N_mainBox, messaggio);
                this.genInputList(N_mainBox, listaInput);
                this.genButtonBox(N_mainBox, testoBottoni);   
                this.genCssReference();            

            }
            public Open():void {
                this.overlay.setVisibility(true);

                this.mainBox.setVisibility(true);
                let top:number = this.calculateTop();
                let left:number = this.calculateLeft();
                this.mainBox.setStyle("top:" + top + "px;left:" + left + "px;");
            }
            public Close(): void {
                this.overlay.setVisibility(false);
                this.mainBox.setVisibility(false);
            }
            public setTitle(title:string){
                this.titleText.setText(title);
            }
            public setMessage(message:string){
                this.text.setText(message);
            }
            public setButtonsText(ok_reset:string[]){
                this.okButton.setText(ok_reset[0]);
                this.resetButton.setText(ok_reset[1]);
            }
            public setOKButtonText(value:string){
                this.okButton.setText(value);
            }
            public setResetButtonText(value:string){
                this.resetButton.setText(value);
            }
            public setOkButtonEvent(functionToExec: Function): void {
                this.EventOk = (event: any): void => {
                   this.inputList.forEach((e, i, a) => {
                        e.hideErrorMessage();
                    });
                    if(this.dataIsValid()){
                    let Res: Array<any>= [];
                    this.inputList.forEach((e, i, a) => {
                        Res.push({name:e.label, value:e.getValue()});
                    });
                    this.Close();
                    functionToExec(Res);
                    }
                }
                this.okButton.on("click", this.EventOk);
            }
            public setValidationRule(rules:Array<validationRule>):void{
                this.validationRules = rules;
            }
            public setCssFileName(filename:string){
                this.cssFileName = filename;
                this.updateCssLinkRef();
            }
            public setCssFilePath(filepath:string){
                this.cssFilePath = filepath;
                this.updateCssLinkRef();
            }
            public setCssBasePath(filebase:string){
                this.cssBasePath = filebase;
                this.updateCssLinkRef();
            }
            public setCssFile(filepath:string){
                var link = document.querySelectorAll('link[data-module="cssPath"')[0];
                this.currentCssFile = filepath;
                link.setAttribute("href", filepath);
            }

}

export {ModalBoxInput, validationRule, DefaultRules};