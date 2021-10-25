import { Instruccion } from '../abstractas/instruccion';
import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';
import { Tipo, Retorno } from '../abstractas/retorno';
import { Error_ } from '../Error/error';

export class Ternario extends Instruccion {

    public tipoInstruccion = 'ternario';

    constructor(private condicion: Expresion, private expresionUno: Expresion, private expresiondDos: Expresion, linea: number, columna: number){
        super(linea, columna);
    }

    public ejecutar(env: Entorno): Retorno {
        const cond = this.condicion.ejecutar(env);
        let resultado = null;
        if (cond.tipo == Tipo.BOOLEAN) {
            if (cond.valor == true) {
                resultado = this.expresionUno.ejecutar(env);
            }else {
                resultado = this.expresiondDos.ejecutar(env);
            }
        }else {
            throw new Error_(this.linea, this.columna, 'Semantico', `La expresion ${cond.tipo} no es booleana`);
        }
        return resultado;
    }
}