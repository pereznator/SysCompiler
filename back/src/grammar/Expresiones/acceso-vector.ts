import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';
import { Retorno, Tipo } from '../abstractas/retorno';
import { Error_ } from '../Error/error';

export class AccesoVector extends Expresion {
    public tipoInstruccion = 'acceso vector';
    
    constructor(private id: string, private posicion: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno): Retorno {
        const val = this.posicion.ejecutar(env);
        if (val.tipo !== Tipo.INT) {
            throw new Error_(this.linea, this.columna, 'Semantico', `Solo se puede acceder a posiciones del vector ${this.id} con valores enteros.`);
        }
        const vector = env.getVector(this.id);
        if (!vector) {
            throw new Error_(this.linea, this.columna, 'Semantico', `No se encontro el vector con id '${this.id}'.`);
        }
        
        if (vector.elementos.length - 1 < val.valor || val.valor < 0) {
            throw new Error_(this.linea, this.columna, 'Semantico', `No existe la posicion ${val.valor} en el vector '${this.id}'.`);
        }
        return vector.elementos[val.valor];
    }

}
