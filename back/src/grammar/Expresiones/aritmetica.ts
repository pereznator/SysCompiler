import { Expresion } from "../abstractas/expresion";
import { Retorno, Tipo } from "../abstractas/retorno";
import { Entorno } from "../simbolos/entorno";
import { env } from "process";
import { Error_ } from "../Error/error";

export enum OperacionAritmetica{
    SUMA,
    RESTA,
    MULTI,
    DIV,
    POT,
    MOD
}

export class Aritmetica extends Expresion{

    constructor(private left: Expresion, private right: Expresion, private type : OperacionAritmetica, linea: number, columna: number){
        super(linea,columna);
    }

    public ejecutar(environment : Entorno) : Retorno{
        const leftValue = this.left.ejecutar(environment);
        const rightValue = this.right.ejecutar(environment);
        let result : Retorno;
        const tipoDominante = this.tipoDominante(leftValue.tipo, rightValue.tipo);
        
        if(this.type == OperacionAritmetica.SUMA){
            if(tipoDominante == Tipo.STRING)
                result = {valor : (leftValue.valor.toString() + rightValue.valor.toString()), tipo : Tipo.STRING};
            else if(tipoDominante == Tipo.INT)
                result = {valor : (leftValue.valor + rightValue.valor), tipo : Tipo.INT};
            else
                throw new Error_(this.linea, this.columna, 'Semantico', 'No se puede operar: ' + leftValue.tipo + ' _ ' + rightValue.tipo);            
        }
        else if(this.type == OperacionAritmetica.RESTA){
            if(tipoDominante == Tipo.STRING)
                throw new Error_(this.linea, this.columna, 'Semantico', 'No se puede operar: ' + leftValue.tipo + ' _ ' + rightValue.tipo);
            result = {valor : (leftValue.valor - rightValue.valor), tipo : Tipo.INT};
        }
        else if(this.type == OperacionAritmetica.MULTI){
            result = {valor : (leftValue.valor * rightValue.valor), tipo : Tipo.INT};
        }
        else if (this.type == OperacionAritmetica.DIV) {
            if(rightValue.valor == 0){
                throw new Error_(this.linea, this.columna, "Semantico", "No se puede dividir entre 0");
            }
            result = {valor : (leftValue.valor / rightValue.valor), tipo : Tipo.INT};
        }else if (this.type == OperacionAritmetica.POT) {
            if (tipoDominante != Tipo.INT && tipoDominante != Tipo.DOBULE) {
                throw new Error_(this.linea, this.columna, "Semantico", "No se puede elevar con valores no numeros");
            }
            result = {valor : (Math.pow(leftValue.valor, rightValue.valor)), tipo : Tipo.DOBULE};
        }else {
            if(rightValue.valor == 0){
                throw new Error_(this.linea, this.columna, "Semantico", "No se puede dividir entre 0");
            }
            result = {valor : (leftValue.valor % rightValue.valor), tipo : Tipo.INT};
        }
        return result;
    }
}