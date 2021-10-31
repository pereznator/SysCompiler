import { Instruccion } from '../abstractas/instruccion';
import { Entorno } from '../simbolos/entorno';
import { Error_ } from '../Error/error';
import { Llamada } from './llamada-instruccion';

export class StartWith extends Instruccion {
    
    public tipoInstruccion = 'start with';

    constructor(private id: Llamada, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno) {
        console.log('Start with ejecutandose');
        return this.id.ejecutar(env);
    }

}