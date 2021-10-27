import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';
import { Retorno, Tipo } from '../abstractas/retorno';
import { Error_ } from '../Error/error';

export class GetValue extends Expresion {
    
    public tipoExpresion = 'getvalue';

    constructor(private id: string, private posicion: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno): Retorno {
        console.log('Ejecutando getvalue');
        const dym = env.getDynamicList(this.id);
        if (!dym) {
            throw new Error_(this.linea, this.columna, 'Semantico', `No se encontro DynamicList ${this.id}`);
        }
        const val = this.posicion.ejecutar(env);
        if (val.tipo !== Tipo.INT){
            throw new Error_(this.linea, this.columna, 'Semantico', `Para acceder a una posicion de '${this.id}' se necesita un valor entero.`);
        }
        if (dym.elementos.length - 1 < val.valor) {
            throw new Error_(this.linea, this.columna, 'Semantico', `No existe la posicion ${val.valor} en la lista '${this.id}'.`);
        }
        return dym.elementos[val.valor];
    }

}