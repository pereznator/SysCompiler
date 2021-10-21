import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';
import { Retorno } from '../abstractas/retorno';

export class AccesoVector extends Expresion {
    public tipoInstruccion = 'acceso vector';
    
    constructor(private id: string, private posicion: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno): Retorno {
        const val = this.posicion.ejecutar(env);
        const vector = env.getVector(this.id);
        return vector?.elementos[val.valor];
    }

}
