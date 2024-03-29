"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccesoStruct = void 0;
const Tipo_1 = require("../../TablaSimbolos/Tipo");
class AccesoStruct {
    constructor(id, valor, modificar, linea, columna) {
        this.id = id;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        console.log('ACCESO STRUCT');
    }
    getTipo(controlador, ts) {
        return Tipo_1.tipo.STRUCT;
    }
    getAtributosStruct(ts) {
        let struct = ts.getSimbolo(this.id);
        console.log('Struct encontrado:', struct);
        if (struct.simbolo === 1) {
            return struct.valor;
        }
        return null;
    }
    getValor(controlador, ts) {
        console.log('Obteniendo valor en acceso struct');
        let atributos = this.getAtributosStruct(ts);
        let valorAtributo = ts.getSimbolo(this.valor);
        // let valorAtributo = this.valor.getValor( controlador, ts );
        console.log('Valor Atributo', valorAtributo);
        console.log('LISTA ATRIBUTOS:', atributos);
        return 'hola';
    }
    traducir(controlador, ts) {
        throw new Error("Method not implemented.");
    }
    recorrer() {
        throw new Error("Method not implemented.");
    }
}
exports.AccesoStruct = AccesoStruct;
