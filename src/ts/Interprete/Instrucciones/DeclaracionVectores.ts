import {Errores} from "../AST/Errores";
import {Nodo} from "../AST/Nodo";
import {Controlador }from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import {Simbolo} from "../TablaSimbolos/Simbolo";
import {TablaSimbolos} from "../TablaSimbolos/TablaSimbolos";
import  {Tipo } from "../TablaSimbolos/Tipo";



export class DeclaracionVectores implements Instruccion{

    public type : Tipo;
    public listaIds : Array<string>
    public listaExpresiones : Array<Expresion>;

    public linea: number;
    public columna: number;
    public posicion:number;

    constructor (type: Tipo, listaIds:Array<string>, listaExpresiones: Array<Expresion> = [], linea:number, columna:number){
        this.type = type;
        this.listaIds = listaIds;
        this.listaExpresiones = listaExpresiones;
        this.linea = linea;
        this.columna = columna;
        this.posicion = 0;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {

        for(let id of this.listaIds){
            // Verificar si existe en la tabla actual
            if(ts.existeEnActual(id)){

                let error = new Errores("Semantico",`La variable ${id} ya existe en el entorno actual, no se puede declarar otra vez.`,this.linea,this.columna);
                controlador.errores.push(error);
                controlador.append(`ERROR: Semántico, La variable ${id} ya existe en el entorno actual, no se puede declarar otra vez. En la linea ${this.linea} y columna ${this.columna}`);
                continue;
            }

            let valores = [];

            if(this.listaExpresiones.length > 0) {

                for(let exp of this.listaExpresiones){ //{1,2,3}

                    let valor = exp.getValor(controlador,ts);
                    let tipoValor = exp.getTipo(controlador,ts);

                    if(this.type.n_tipo == tipoValor){

                        valores.push(valor);

                    }else{

                        let error = new Errores("Semantico",`La variable ${id} posee un tipo diferente al de la declaracion del vector.`,this.linea,this.columna);
                        controlador.errores.push(error);
                        controlador.append(`ERROR: Semántico, La variable ${id}  posee un tipo diferente al de la declaracion del vector. En la linea ${this.linea} y columna ${this.columna}`);

                    }

                }

            } else {
                valores = [];
            }

            let nuevo_simbolo = new Simbolo(4, this.type , id, valores,this.posicion);
            ts.agregar(id, nuevo_simbolo);

        }
    }



    recorrer(): Nodo {
        let padre = new Nodo("DECLARACION VECTORES","");
        padre.AddHijo(new Nodo(this.type.nombre_tipo,""));
        let hijos_id = new Nodo("Ids","");
        for (let id of this.listaIds){
            hijos_id.AddHijo(new Nodo(id,""))
        }
        padre.AddHijo(hijos_id);
        padre.AddHijo(new Nodo("=",""))
        padre.AddHijo(new Nodo("[",""))
        let hijos_id2 = new Nodo("EXPRESIONES","");
        for (let id of this.listaExpresiones){
            hijos_id2.AddHijo(id.recorrer())
        }
        padre.AddHijo(new Nodo("]",""))

        return padre
    }

    traducir(controlador: Controlador, ts: TablaSimbolos): String {
        let c3d = '/*------Declaracion de vectores------*/\n';
        return c3d
    }

}
