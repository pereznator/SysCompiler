import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';
import { Error_ } from '../Error/error';
import { Instruccion } from '../abstractas/instruccion';

export class SetValue extends Instruccion {
    
    public tipoInstruccion = 'setvalue';

    constructor(private id: string, private posicion: Expresion, private valor: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno): any {
        const pos = this.posicion.ejecutar(env);
        const valor = this.valor.ejecutar(env);
        const dym = env.getDynamicList(this.id);
        if (dym) {
            dym.elementos[pos.valor] = valor.valor;
            return;
        }
        throw new Error_(this.linea, this.columna, 'Semantico', `No se encontro DynamicList ${this.id}`);
    }

}