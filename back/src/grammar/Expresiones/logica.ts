import { Expresion } from "../abstractas/expresion";
import { Retorno, Tipo } from "../abstractas/retorno";
import { Entorno } from "../simbolos/entorno";

export enum OperadoresLogicos{
    AND,
    OR,
    NOT
}

export class ExpresionLogica extends Expresion{

    public tipo: OperadoresLogicos;
    constructor(private left: Expresion, private right: Expresion, private type : OperadoresLogicos, line: number, column: number){
        super(line,column);
        this.tipo = type;
    }

    public ejecutar(environment : Entorno) : Retorno{
        const leftValue = this.left.ejecutar(environment);
        const rightValue = this.right.ejecutar(environment);
        
        if(this.type == OperadoresLogicos.AND){
            const result = leftValue.valor && rightValue.valor;
            return {valor : result, tipo : Tipo.BOOLEAN};
        }

        else if(this.type == OperadoresLogicos.OR){
            const result = leftValue.valor || rightValue.valor;
            return {valor : result, tipo : Tipo.BOOLEAN};
        }
        
        else if(this.type == OperadoresLogicos.NOT){
            const result = !leftValue.valor;
            return {valor : result, tipo : Tipo.BOOLEAN};
        }
        
        return {valor: 0, tipo : Tipo.BOOLEAN}
    }
}