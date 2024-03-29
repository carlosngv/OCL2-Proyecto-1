"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModificarStruct = void 0;
const Errores_1 = require("../../AST/Errores");
const Nodo_1 = require("../../AST/Nodo");
class ModificarStruct {
    constructor(id, atributo, nuevoValor, linea, columna) {
        this.id = id;
        this.atributo = atributo;
        this.nuevoValor = nuevoValor;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(controlador, ts) {
        let atributos = this.getAtributosStruct(ts);
        let nuevoValorTipo = this.nuevoValor.getTipo(controlador, ts);
        let nuevoValorV = this.nuevoValor.getValor(controlador, ts);
        // Válida si el struct no es nulo
        if (!atributos) {
            let error = new Errores_1.Errores("Semantico", `${this.id} no está definido.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`ERROR: Semántico, ${this.id} no está definido. En la linea ${this.linea} y columna ${this.columna}`);
            return;
        }
        let structPadre = atributos[0]['identificador'];
        structPadre = structPadre.split("_")[0];
        console.log('STRUCT PADRE', structPadre);
        let valorAtributo = `${structPadre}_${this.atributo}`;
        for (let atributo of atributos) {
            if ((valorAtributo === atributo.identificador)) {
                if (!(nuevoValorTipo === atributo.tipo.n_tipo)) {
                    let error = new Errores_1.Errores("Semantico", `${this.atributo} difiere del tipo con el mismo nombre en ${this.id}.`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`ERROR: Semántico, ${this.atributo} difiere del tipo con el mismo nombre en ${this.id}. En la linea ${this.linea} y columna ${this.columna}`);
                    return;
                }
                atributo.valor = nuevoValorV;
                return;
            }
        }
        let error = new Errores_1.Errores("Semantico", `${this.atributo} no es un atributo de ${this.id}.`, this.linea, this.columna);
        controlador.errores.push(error);
        controlador.append(`ERROR: Semántico, ${this.atributo} no es un atributo de ${this.id}. En la linea ${this.linea} y columna ${this.columna}`);
    }
    getAtributosStruct(ts) {
        let struct = ts.getSimbolo(this.id);
        if (!struct) {
            return null;
        }
        return struct.valor;
    }
    recorrer() {
        let padre = new Nodo_1.Nodo("MODIFICAR STRUCT", "");
        padre.AddHijo(new Nodo_1.Nodo(this.id, ""));
        padre.AddHijo(new Nodo_1.Nodo(".", ""));
        padre.AddHijo(new Nodo_1.Nodo(this.atributo, ""));
        padre.AddHijo(new Nodo_1.Nodo("=", ""));
        padre.AddHijo(this.nuevoValor.recorrer());
        return padre;
    }
    traducir(controlador, ts) {
        let c3d = '/*------Modificar structs------*/\n';
        return c3d;
    }
}
exports.ModificarStruct = ModificarStruct;
