import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';
import { Retorno, Tipo } from '../abstractas/retorno';
import { Error_ } from '../Error/error';

export class TypeOf extends Expresion {
    
    public tipoExpresion = 'typeof';

    constructor(private valor: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno): Retorno {
        console.log('Ejecutando typeof');
        const val = this.valor.ejecutar(env);
        if (val.tipo === Tipo.INT) {
            return {valor: 'int', tipo: Tipo.STRING};
        }
        else if (val.tipo === Tipo.DOUBLE) {
            return {valor: 'double', tipo: Tipo.STRING};
        }
        else if (val.tipo === Tipo.STRING) {
            return {valor: 'string', tipo: Tipo.STRING};
        }
        else if (val.tipo === Tipo.CHAR) {
            return {valor: 'char', tipo: Tipo.STRING};
        }
        else if (val.tipo === Tipo.BOOLEAN) {
            return {valor: 'boolean', tipo: Tipo.STRING};
        }
        else if (val.tipo === Tipo.ARRAY) {
            return {valor: 'array', tipo: Tipo.STRING};
        }
        throw new Error_(this.linea, this.columna, 'Semantico', 'No se encontro tipo para la variable '+ val.valor)
    }

}