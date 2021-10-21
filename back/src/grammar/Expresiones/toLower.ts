import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';
import { Retorno, Tipo } from '../abstractas/retorno';
import { Error_ } from '../Error/error';

export class ToLower extends Expresion {
    
    public tipoExpresion = 'tolower';

    constructor(private expresion: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno): Retorno {
        const val = this.expresion.ejecutar(env);
        if (val.tipo == Tipo.STRING) {
            return {valor: String(val.valor).toLowerCase(), tipo: Tipo.STRING};
        }else {
            throw new Error_(this.linea, this.columna, 'Semantico', 'No se pudo convertir a minusculas');
        }
    }

}