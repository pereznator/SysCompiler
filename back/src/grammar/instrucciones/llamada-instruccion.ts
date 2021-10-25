import { Instruccion } from "../abstractas/instruccion";
import { Entorno } from "../simbolos/entorno";
import { Expresion } from "../abstractas/expresion";
import { Error_ } from '../Error/error';

export class Llamada extends Instruccion{

    public tipoInstruccion = 'llamada';

    constructor(private id: string, private expresiones : Array<Expresion>, line : number, column : number){
        super(line, column);
    }

    public ejecutar(entorno : Entorno) {
        console.log('ejecutando llamada');
        const func = entorno.getFuncion(this.id);
        if(func != undefined){
            const newEnv = new Entorno(entorno.getGlobal());
            if (func.parametros.length !== this.expresiones.length) {
                console.log('No coincide el numero de parametros en la llamada');
                throw new Error_(this.linea, this.columna, 'Sintactico', `No coincide el numero de parametros para la funcion ${this.id}`);
            }
            for(let i = 0; i < this.expresiones.length; i++){
                const value = this.expresiones[i].ejecutar(entorno);
                if (func.parametros[i].tipo !== value.tipo) {
                    throw new Error_(this.linea, this.columna, 'Sintactico', `No coinciden los tipos para el parametro ${func.parametros[i].id}`);
                }
                newEnv.guardar(func.parametros[i].id, value.valor, value.tipo);
            }
            func.contenido.ejecutar(newEnv);
        }else {
            console.log('No se encontro el metodo');
            throw new Error_(this.linea, this.columna, 'Sintactico', `No se encontro metodo con id ${this.id}`);
        }
    }
}