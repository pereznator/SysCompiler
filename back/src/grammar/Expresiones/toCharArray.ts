import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';
import { Retorno, Tipo } from '../abstractas/retorno';
import { Error_ } from '../Error/error';

export class ToCharArray extends Expresion {
    
    public tipoExpresion = 'tochararray';

    constructor(private valor: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno): Retorno {
        console.log('Ejecutando tochararray');
        const val = this.valor.ejecutar(env);
        if (val.tipo !== Tipo.STRING) {
            throw new Error_(this.linea, this.columna, 'Semantico', 'CharArray solo puede recibir strings.');
        }
        let arr = new Array<Retorno>();
        for (let x = 0; x < val.valor.length; x++) {
            arr.push({valor: val.valor[x], tipo: Tipo.CHAR});
        }
        return {valor: arr, tipo: Tipo.ARRAY};
    }

}