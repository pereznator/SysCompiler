import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';
import { Retorno, Tipo } from '../abstractas/retorno';
import { Error_ } from '../Error/error';

export class ToString extends Expresion {
    
    public tipoExpresion = 'tostring';

    constructor(private valor: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno): Retorno {
        console.log('Ejecutando tostring');
        const val = this.valor.ejecutar(env);
        if (val.tipo !== Tipo.DOUBLE && val.tipo !== Tipo.INT && val.tipo !== Tipo.BOOLEAN && val.tipo !== Tipo.STRING && val.tipo !== Tipo.CHAR){
            throw new Error_(this.linea, this.columna, 'Semantico', `No se puede convertir a string tipo ${val.tipo}`);
        }
        return {valor: `${val.valor}`, tipo: Tipo.STRING};
    }

}