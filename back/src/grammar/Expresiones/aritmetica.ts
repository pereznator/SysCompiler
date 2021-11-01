import { Expresion } from "../abstractas/expresion";
import { Retorno, Tipo } from "../abstractas/retorno";
import { Entorno } from "../simbolos/entorno";
import { Error_ } from "../Error/error";
import { Simbolo } from '../simbolos/simbolo';
import { Acceso } from './acceso';
import { Llamada } from '../instrucciones/llamada-instruccion';

export enum OperacionAritmetica{
    SUMA,
    RESTA,
    MULTI,
    DIV,
    POT,
    MOD,
    NEG
}

export class Aritmetica extends Expresion{

    public tipoExpresion = 'aritmetica';

    constructor(private left: any, private right: any, private type : OperacionAritmetica, linea: number, columna: number){
        super(linea,columna);
    }

    public ejecutar(environment : Entorno) : any{
        console.log('Ejecutando aritmetica');
        
        const rightValue = this.verTipoVariable(this.right, environment);
        let leftValue;
        if (this.left) {
            leftValue = this.verTipoVariable(this.left, environment);
        }else {
            leftValue = rightValue;
        }
        console.log(`Izquierda: ${leftValue?.valor}, derecha: ${rightValue?.valor}`);
        let result : Retorno;
        if (!rightValue || !leftValue) {
            throw new Error_(this.linea, this.columna, 'Semantico', 'Error en la aritmetica.');
        }

        if (rightValue.tipo === Tipo.CHAR && (leftValue.tipo === Tipo.INT || leftValue.tipo === Tipo.DOUBLE)) {
            rightValue.valor = rightValue.valor.charCodeAt(0);
        }

        if (leftValue.tipo === Tipo.CHAR && (rightValue.tipo === Tipo.INT || rightValue.tipo === Tipo.DOUBLE)) {
            leftValue.valor = leftValue.valor.charCodeAt(0);
        }

        let tipoDominante;
        
        if(this.type == OperacionAritmetica.SUMA){
            tipoDominante = this.tipoDominante(leftValue.tipo, rightValue.tipo);
            if(tipoDominante == Tipo.STRING)
                result = {valor : (leftValue.valor.toString() + rightValue.valor.toString()), tipo : Tipo.STRING};
            else if(tipoDominante == Tipo.INT || tipoDominante == Tipo.DOUBLE)
                result = {valor : (leftValue.valor + rightValue.valor), tipo : tipoDominante};
            else
                throw new Error_(this.linea, this.columna, 'Semantico', 'No se puede operar: ' + leftValue.tipo + ' _ ' + rightValue.tipo);            
        }
        else if(this.type == OperacionAritmetica.RESTA){
            tipoDominante = this.tipoDominanteResta(leftValue.tipo, rightValue.tipo);
            if(tipoDominante !== Tipo.INT && tipoDominante !== Tipo.DOUBLE)
                throw new Error_(this.linea, this.columna, 'Semantico', 'No se puede operar: ' + leftValue.tipo + ' _ ' + rightValue.tipo);
            result = {valor : (leftValue.valor - rightValue.valor), tipo : tipoDominante};
        }
        else if(this.type == OperacionAritmetica.MULTI){
            tipoDominante = this.tipoDominanteMulti(leftValue.tipo, rightValue.tipo);
            if (tipoDominante === Tipo.NULL) {
                throw new Error_(this.linea, this.columna, 'Semantico', `No se puede operar tipo ${leftValue.tipo} con ${rightValue.tipo}`)
            }
            result = {valor : (leftValue.valor * rightValue.valor), tipo : tipoDominante};
        }
        else if (this.type == OperacionAritmetica.DIV) {
            if(rightValue.valor == 0){
                throw new Error_(this.linea, this.columna, "Semantico", "No se puede dividir entre 0");
            }
            tipoDominante = this.tipoDominanteMulti(leftValue.tipo, rightValue.tipo);
            if (tipoDominante === Tipo.NULL) {
                throw new Error_(this.linea, this.columna, 'Semantico', `No se puede operar tipo ${leftValue.tipo} con ${rightValue.tipo}`)
            }
            result = {valor : (leftValue.valor / rightValue.valor), tipo : Tipo.DOUBLE};
        }else if (this.type == OperacionAritmetica.POT) {
            tipoDominante = this.tipoDominantePotencia(leftValue.tipo, rightValue.tipo);
            if (tipoDominante === Tipo.NULL) {
                throw new Error_(this.linea, this.columna, "Semantico", `No se puede elevar ${leftValue.valor} con ${rightValue.valor}`);
            }
            result = {valor : (Math.pow(leftValue.valor, rightValue.valor)), tipo : tipoDominante};
        }else if (this.type == OperacionAritmetica.NEG) {
            if (rightValue.tipo !== Tipo.INT && rightValue.tipo !== Tipo.DOUBLE) {
                throw new Error_(this.linea, this.columna, "Semantico", `No se negar la expresion ${rightValue.valor}`);
            }
            result = {valor : -rightValue.valor, tipo : rightValue.tipo};
            
        }else {
            tipoDominante = this.tipoDominantePotencia(leftValue.tipo, rightValue.tipo);
            if(rightValue.valor == 0){
                throw new Error_(this.linea, this.columna, "Semantico", "No se puede dividir entre 0");
            }
            if (tipoDominante === Tipo.NULL) {
                throw new Error_(this.linea, this.columna, "Semantico", `No se puede dividir ${leftValue.valor} entre ${rightValue.valor}`);
            }
            result = {valor : (leftValue.valor % rightValue.valor), tipo : tipoDominante};
        }
        return result;
    }

    verTipoVariable(variable: any, entorno: Entorno): Retorno | null {
        if (variable instanceof Acceso) {
            const val = entorno.getVar(variable.id);
            if (val !== undefined && val !== null) {
                return { valor: val.valor, tipo: val.tipo };
            }else {
                throw new Error_(this.linea, this.columna, 'Semantico', `No se encontro la variable con id '${variable.id}'`)
            }
        }else if (variable instanceof Expresion) {
            return variable.ejecutar(entorno);
        }else if (variable instanceof Llamada) {
            return variable.ejecutar(entorno);
        }
        return null;
    }
}