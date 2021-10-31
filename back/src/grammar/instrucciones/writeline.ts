import { Instruccion } from '../abstractas/instruccion';
import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';
import { Error_ } from '../Error/error';

export class WriteLine extends Instruccion {

    public tipoInstruccion = 'writeline';
    public salida = '';

    constructor(private expresion: Expresion, linea: number, columna: number){
        super(linea, columna);
    }

    public ejecutar(env: Entorno): any {
        console.log('Ejecutando writeline');
        const exp = this.expresion.ejecutar(env);
        console.log(exp);
        this.salida = exp.valor.toString();
        env.getGlobal().salidas.push(this.salida);
        
    }
}