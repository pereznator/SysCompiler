import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';
import { Retorno, Tipo } from '../abstractas/retorno';
import { Error_ } from '../Error/error';

export class Length extends Expresion {
    
    public tipoExpresion = 'length';

    constructor(private id: string, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno): Retorno {
        if (env.getVar(this.id)) {
            return {valor: env.getVar(this.id)?.valor.length, tipo: Tipo.STRING};
        }else if (env.getDynamicList(this.id)) {
            return {valor: env.getDynamicList(this.id)?.elementos.length, tipo: Tipo.STRING};
        }else if (env.getVector(this.id)) {
            return {valor: env.getVector(this.id)?.elementos.length, tipo: Tipo.STRING};
        }
        throw new Error_(this.linea, this.columna, 'Sintactico', 'No se encontro la variable');
    }

}