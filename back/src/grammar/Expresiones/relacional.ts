import { Expresion } from "../abstractas/expresion";
import { Retorno, Tipo } from "../abstractas/retorno";
import { Entorno } from "../simbolos/entorno";

export enum OpcionRelacional{
    IGUAL,
    DESIGUAL,
    MENOR,
    MENORIGUAL,
    MAYOR,
    MAYORIGUAL
}

export class Relacional extends Expresion{

    constructor(private left: Expresion, private right: Expresion, private type : OpcionRelacional, line: number, column: number){
        super(line,column);
    }

    public ejecutar(environment : Entorno) : Retorno{
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

        else if(this.type == OpcionRelacional.MAYOR){
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
        
        return {valor: 0, tipo : Tipo.INT}
    }
}