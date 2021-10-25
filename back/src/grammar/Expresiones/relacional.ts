import { Expresion } from "../abstractas/expresion";
import { Retorno, Tipo } from "../abstractas/retorno";
import { Entorno } from "../simbolos/entorno";
import { Error_ } from '../Error/error';

export enum OpcionRelacional{
    IGUAL,
    DESIGUAL,
    MENOR,
    MENORIGUAL,
    MAYOR,
    MAYORIGUAL
}

export class Relacional extends Expresion{

    public tiopExpresion = 'relacional';

    constructor(private left: Expresion, private right: Expresion, private type : OpcionRelacional, line: number, column: number){
        super(line,column);
    }

    public ejecutar(environment : Entorno) : Retorno{
        console.log('ejecutando relacional');
        const leftValue = this.left.ejecutar(environment);
        const rightValue = this.right.ejecutar(environment);

        if(this.type == OpcionRelacional.IGUAL){
            const result = leftValue.valor == rightValue.valor;
            return {valor : result, tipo : Tipo.BOOLEAN};
        }

        else if(this.type == OpcionRelacional.DESIGUAL){
            const result = leftValue.valor != rightValue.valor;
            return {valor : result, tipo : Tipo.BOOLEAN};
        }
        else {

            if ((leftValue.tipo !== Tipo.DOUBLE && leftValue.tipo !== Tipo.INT && leftValue.tipo !== Tipo.CHAR)
                || (rightValue.tipo !== Tipo.DOUBLE && rightValue.tipo !== Tipo.INT && rightValue.tipo !== Tipo.CHAR)) {
                throw new Error_(this.linea, this.columna, 'Semantico', `No son compatibles los tipos de ${leftValue.valor} y  ${rightValue.valor} para comparar.`);
            }

            if (leftValue.tipo == Tipo.CHAR) {
                leftValue.valor = leftValue.valor.charCodeAt(0); 
            }
            if (rightValue.tipo == Tipo.CHAR) {
                rightValue.valor = rightValue.valor.charCodeAt(0); 
            }

            if(this.type == OpcionRelacional.MAYOR){
                
                const result = leftValue.valor > rightValue.valor;
                return {valor : result, tipo : Tipo.BOOLEAN};
            }
    
            else if (this.type == OpcionRelacional.MAYORIGUAL) {
                const result = leftValue.valor >= rightValue.valor;
                return {valor: result, tipo: Tipo.BOOLEAN}
            }
            
            else if (this.type == OpcionRelacional.MENOR) {
                const result = leftValue.valor < rightValue.valor;
                return {valor: result, tipo: Tipo.BOOLEAN}
            }
            
            else if (this.type == OpcionRelacional.MENORIGUAL) {
                const result = leftValue.valor <= rightValue.valor;
                return {valor: result, tipo: Tipo.BOOLEAN}
            }
        }

        
        return {valor: 0, tipo : Tipo.INT}
    }
}