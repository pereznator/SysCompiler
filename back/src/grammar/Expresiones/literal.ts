import { Expresion } from "../abstractas/expresion";
import { Retorno, Tipo } from "../abstractas/retorno";

export class Literal extends Expresion{
    
    constructor(private valor : any, linea : number, columna: number, private tipo : number){
        super(linea, columna);
    }

    public ejecutar() : Retorno{
        if (this.tipo == 0) 
            return {valor: Number(this.valor), tipo: Tipo.INT}
        else if(this.tipo == 1)
            return {valor : Number(this.valor), tipo : Tipo.DOBULE};
        else if(this.tipo == 2)
            return {valor : this.valor, tipo : Tipo.STRING};
        else if(this.tipo == 3)
            return {valor : this.valor, tipo : Tipo.CHAR};
        else if(this.tipo == 4)
            return {valor : this.valor, tipo : Tipo.BOOLEAN};
        else
            return {valor : null, tipo : Tipo.NULL};
    }
}