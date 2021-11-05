import { Instruccion } from "../abstractas/instruccion";
import { Entorno } from "../simbolos/entorno";
import { Expresion } from "../abstractas/expresion";
import { Error_ } from '../Error/error';
import { FuncionInstruccion } from './funcion-instruccion';
import { Statement } from './statement';
import { Tipo } from "../abstractas/retorno";
import { DeclaracionDynamic } from './declaracion-dynamic';
import { DeclaracionVector } from './declaracion-vector';

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

                if (value.tipo == Tipo.ARRAY && (func.parametros[i] instanceof DeclaracionDynamic || func.parametros[i] instanceof DeclaracionVector)) {
                    
                    if (value.valor.tipo !== func.parametros[i].tipo) {
                        throw new Error_(this.linea, this.columna, 'Semantico', `No coinciden los tipos para el parametro ${func.parametros[i].id}`)
                    }
                    if (func.parametros[i] instanceof DeclaracionDynamic) {
                        newEnv.guardarDynamicList(func.parametros[i].id, value.valor);
                    }else {
                        newEnv.guardarVector(func.parametros[i].id, value.valor);
                    }

                }else {

                    if (func.parametros[i].tipo !== value.tipo) {
                        throw new Error_(this.linea, this.columna, 'Sintactico', `No coinciden los tipos para el parametro ${func.parametros[i].id}`);
                    }

                    newEnv.guardar(func.parametros[i].id, value.valor, value.tipo);
                }
                let global = entorno.getGlobal();

                if (func.contenido instanceof Statement) {
                    global.simbolos.push({identificador: func.parametros[i].id, tipoVariable: 'variable', tipo: value.tipo, entorno: func.contenido.nombreEntorno, linea: func.parametros[i].linea, columna: func.parametros[i].columna});
                }
            }
            let res = func.contenido.ejecutar(newEnv);

            if (!res && func instanceof FuncionInstruccion) {
                throw new Error_(this.linea, this.columna, 'Semantico', `La funcion '${this.id}' debe retornar un valor tipo ${func.tipo}.`);
            }

            if (func instanceof FuncionInstruccion) {
                if (res.tipo !== func.tipo) {
                    throw new Error_(this.linea, this.columna, 'Semantico', `Tipo ${res.tipo} no es valido para retornar en la funcion '${func.id}'`)
                }
            }

            return res;

        }else {
            console.log('No se encontro el metodo');
            throw new Error_(this.linea, this.columna, 'Sintactico', `No se encontro metodo con id ${this.id}`);
        }
    }
}