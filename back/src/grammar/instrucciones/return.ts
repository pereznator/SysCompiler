import { Instruccion } from '../abstractas/instruccion';
import { Entorno } from '../simbolos/entorno';
import { Expresion } from '../abstractas/expresion';
import { Retorno } from '../abstractas/retorno';

export class Return extends Instruccion {
    public tipoInstruccion = 'return';
    public retorno: Retorno;
    constructor(private expresion: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.retorno = {valor: 0, tipo: 0};
    }

    public ejecutar(env: Entorno) {
        console.log('Ejecutando return');
        if (this.expresion) {
            this.retorno = this.expresion.ejecutar(env);
        }
        return this;
    }
}