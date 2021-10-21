import { Instruccion } from '../abstractas/instruccion';
import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';
import { Error_ } from '../Error/error';
import { Tipo } from '../abstractas/retorno';
import { Llamada } from './llamada-instruccion';

export class AsignacionVector extends Instruccion {
    
    public tipoInstruccion = 'asignacion vector';

    constructor(private id: string, private posicion: Expresion, private valor: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno): any {
        const vec = env.getVector(this.id);
        if (!vec) {
            throw new Error_(this.linea, this.columna, 'Sintactico', 'No se encontro el vector.');
        }
        const pos = this.posicion.ejecutar(env);
        if (pos.tipo !== Tipo.INT) {
            throw new Error_(this.linea, this.columna, 'Sintactico', 'Posicion invalida.');
        }
        if (!vec.elementos[Number(pos.valor)]) {
            throw new Error_(this.linea, this.columna, 'Sintactico', 'Posicion supera el indice.');
        }
        if (typeof this.valor == 'string') {
            
        }
        const val = this.valor.ejecutar(env);
        if (val.tipo !== vec.tipo) {
            throw new Error_(this.linea, this.columna, 'Sintactico', 'No coinciden los tipos de datos.');
        }
        vec.elementos[Number(pos.valor)] = val.valor;

    }

}