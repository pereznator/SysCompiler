import { Instruccion } from '../abstractas/instruccion';
import { Tipo, Retorno } from '../abstractas/retorno';
import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';
import { Error_ } from '../Error/error';
export class Casteo extends Instruccion {
    
    public tipoInstruccion = 'casteo';

    constructor(public tipo: Tipo, private expresion: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno): Retorno {
        console.log('Ejecutando casteo');
        const val = this.expresion.ejecutar(env);
        console.log(`tipo esperado ${this.tipo} y tipo cambiando ${val.tipo}`);
        if (val.tipo === this.tipo) {
            return val;
        }
        if (this.tipo === Tipo.INT && val.tipo === Tipo.DOUBLE) {
            return { valor: Math.floor(val.valor), tipo: this.tipo};
        }
        else if (this.tipo === Tipo.DOUBLE && val.tipo === Tipo.INT) {
            return {valor: parseFloat(val.valor), tipo: this.tipo};
        }
        else if (this.tipo === Tipo.STRING && val.tipo === Tipo.INT) {
            return {valor: `${val.valor}`, tipo: this.tipo};
        }
        else if(this.tipo === Tipo.CHAR && val.tipo === Tipo.INT) {
            return {valor: String.fromCharCode(val.valor), tipo: this.tipo};
        }
        else if(this.tipo === Tipo.STRING && val.tipo === Tipo.DOUBLE) {
            return {valor: `${val.valor}`, tipo: this.tipo};
        }
        else if(this.tipo === Tipo.INT && val.tipo === Tipo.CHAR) {
            return {valor: val.valor.charCodeAt(0), tipo: this.tipo};
        }
        else if(this.tipo === Tipo.DOUBLE && val.tipo === Tipo.CHAR) {
            return {valor: parseFloat(val.valor.charCodeAt(0)), tipo: this.tipo};
        }else {
            throw new Error_(this.linea, this.columna , 'Semantico', `No se pudo convertir tiop ${val.tipo} a ${this.tipo}`);
        }
    }
}