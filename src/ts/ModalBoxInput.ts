
class ElementoBase {
    nome: string;
    id: string;
    classe: string;
    parent: string;
    protected elementInstance: any;
    protected attrList: string[];
    constructor(nome: string, id: string, classe: string, parent: string) {
        this.nome = nome;
        this.id = id;
        this.classe = classe;
        this.parent = parent;
    }
    public create(): any {
        var e = document.createElement(this.nome);
        e.id = this.id;
        e.setAttribute("class", this.classe);
        var p = document.getElementById(this.parent);
        p.appendChild(e);
        this.elementInstance = e;
        return e;
    }
    public attr(name:string, val: string) :any{
        if (val) {
            this.elementInstance.setAttribute(name, val);
            this.attrList.push(name);
            return;
        }
        if (this.attrList.indexOf(name) != -1) {
            return this.elementInstance.getAttribute(name);
        }
        return null;
    }
    public removeAttr(name: string):void{
        if (this.attrList.indexOf(name) != -1) this.elementInstance.removeAttribute(name);
    }
    public removeClass(classe:string ):void{
    var res = [];
    var strClassi = this.elementInstance.getAttribute("class");
    if (strClassi != null && strClassi != undefined && strClassi.length > 0) {
        var elencoClassi = strClassi.split(" ");
        if (elencoClassi != null && elencoClassi != undefined && elencoClassi.length > 0) {
            if (classe.indexOf("@") != -1) {
                var check = classe.substring(1, classe.length);
                res = elencoClassi.filter(function (e:any) {
                    return e.indexOf(check) == -1
                });
            } else {
                res = elencoClassi.filter(function (e:any) {
                    return e != classe;
                });
            }
        }
        var newClassi = res.join(" ");
        this.elementInstance.setAttribute("class", newClassi);
    }
}
    public setClass(classe:string):void{
    var res = [];
    var strClassi = this.elementInstance.getAttribute("class");
    if (strClassi != null && strClassi != undefined && strClassi.length > 0) {
        var elencoClassi = strClassi.split(" ");
        if (elencoClassi != null && elencoClassi != undefined && elencoClassi.length > 0) {
            elencoClassi.push(classe);
            var newClassi = elencoClassi.join(" ");
            this.elementInstance.setAttribute("class", newClassi);
        } else {
            this.elementInstance.setAttribute("class", classe);
        }

    } else {
        this.elementInstance.setAttribute("class", classe);
    }
    }
    public getInstance(): any { return this.elementInstance; }
}
class ElementoInput extends ElementoBase {
    name: string;
    tipo: string;
    constructor(tipo: string, id: string, classe: string, parent: string ) {
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
}
class ElementoLabel extends ElementoBase {
    forId: string;
    constructor(forId: string, parent: string) {
        super("label", "", "", parent);
        this.forId = forId;
    }
    public create(): any {
        this.elementInstance = super.create();
        this.elementInstance.setAttribute("for", this.forId);
        return this.elementInstance;
    }
}
class ElementoButton extends ElementoBase {
    id: string;
    text: string;
    constructor(id: string, classe:string, parent: string, text:string) {
        super("button", id, classe, parent);
        this.text = text;
    }
    public create(): any {
        this.elementInstance = super.create();
        var t = document.createTextNode(this.text);
        this.elementInstance.appendChild(t);
        return this.elementInstance;
    }
}

export { ElementoBase, ElementoInput, ElementoLabel, ElementoButton};