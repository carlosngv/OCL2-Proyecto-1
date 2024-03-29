"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliceVector = void 0;
const Nodo_1 = require("../../AST/Nodo");
const Tipo_1 = require("../../TablaSimbolos/Tipo");
class SliceVector {
    constructor(id, inicio, final, linea, columna) {
        this.id = id;
        this.inicio = inicio;
        this.final = final;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(controlador, ts) {
        return Tipo_1.tipo.CADENA;
    }
    getValor(controlador, ts) {
        this.ejecutar(controlador, ts);
        return this.slicedVector;
    }
    ejecutar(controlador, ts) {
        let inicio = this.inicio.getValor(controlador, ts);
        let tipoInicio = this.inicio.getTipo(controlador, ts);
        let fin = this.final.getValor(controlador, ts);
        if (tipoInicio === Tipo_1.tipo.CADENA) {
            if (inicio === 'begin')
                inicio = 0;
        }
        console.log('inicio: ', inicio);
        console.log('fin: ', fin);
        let valoresVector = this.getValoresVector(ts);
        if (fin === 'end')
            inicio = valoresVector.length - 1;
        let slicedVector = valoresVector.slice(inicio, fin);
        console.log('SLICED VECTOR:', slicedVector);
        this.slicedVector = String(slicedVector);
    }
    getValoresVector(ts) {
        let simAux = ts.getSimbolo(this.id);
        if ((simAux === null || simAux === void 0 ? void 0 : simAux.simbolo) == 4) {
            let valoresVector = simAux.valor;
            return valoresVector;
        }
        return null;
    }
    recorrer() {
        let padre = new Nodo_1.Nodo("Slice", "");
        padre.AddHijo(new Nodo_1.Nodo(this.id, ""));
        padre.AddHijo(new Nodo_1.Nodo("[", ""));
        padre.AddHijo(this.inicio.recorrer());
        padre.AddHijo(new Nodo_1.Nodo(":", ""));
        padre.AddHijo(this.final.recorrer());
        padre.AddHijo(new Nodo_1.Nodo("]", ""));
        return padre;
    }
    traducir(controlador, ts) {
        let c3d = '/*------Slice vector------*/\n';
        return c3d;
    }
}
exports.SliceVector = SliceVector;
