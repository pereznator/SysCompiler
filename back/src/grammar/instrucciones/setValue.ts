import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';
import { Error_ } from '../Error/error';
import { Instruccion } from '../abstractas/instruccion';
import { Tipo } from '../abstractas/retorno';

export class SetValue extends Instruccion {
    
    public tipoInstruccion = 'setvalue';

    constructor(private id: string, private posicion: Expresion, private valor: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno): any {
        console.log('Ejecutando setvalue');
        const dym = env.getDynamicList(this.id);
        if (!dym) {
            throw new Error_(this.linea, this.columna, 'Semantico', `No se encontro DynamicList ${this.id}`);
        }
        const pos = this.posicion.ejecutar(env);
        if (pos.tipo !== Tipo.INT) {
            throw new Error_(this.linea, this.columna, 'Semantico', `Se necesita un numero entero para acceder a una posicion de la lista '${this.id}'`);
        }
        if (pos.valor > dym.elementos.length - 1 || pos.valor < 0) {
            throw new Error_(this.linea, this.columna, 'Semantico', `No existe la posicion ${pos.valor} en la lista '${this.id}'`);
        }
        const valor = this.valor.ejecutar(env);
        if (valor.tipo !== dym.tipo) {
            throw new Error_(this.linea, this.columna, 'Semantico', `No se puede asignar tipo ${pos.tipo} a la lista '${this.id}'`);
        }
        dym.elementos[pos.valor] = valor;
    }

}