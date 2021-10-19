import { Instruccion } from "../abstractas/instruccion";
import { Entorno } from "../simbolos/entorno";
import { Expresion } from "../abstractas/expresion";

export class Llamada extends Instruccion{

    public tipoInstruccion = 'llamada';

    constructor(private id: string, private expresiones : Array<Expresion>, line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno : Entorno) {
        const func = entorno.getFuncion(this.id);
        if(func != undefined){
            const newEnv = new Entorno(entorno.getGlobal());
            for(let i = 0; i < this.expresiones.length; i++){
                const value = this.expresiones[i].ejecutar(entorno);
                newEnv.guardar(func.parametros[i], value.valor, value.tipo);
            }
            func.contenido.ejecutar(newEnv);
        }
    }
}