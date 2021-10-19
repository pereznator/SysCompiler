import { Instruccion } from "../abstractas/instruccion";
import { Expresion } from "../abstractas/expresion";
import { Entorno } from "../simbolos/entorno";
import { Tipo } from "../abstractas/retorno";

export class WhileInstruccion extends Instruccion{

    public tipoInstruccion = 'while';

    constructor(private condition : Expresion, private code : Instruccion, linea : number, columna : number){
        super(linea, columna);
    }

    public ejecutar(env : Entorno) {
        let condition = this.condition.ejecutar(env);
        if (condition.tipo != Tipo.BOOLEAN) {
            throw {error: "La condicion no es booleana", linea: this.linea, columna : this.columna};
        }
        while(condition.valor == true){
            const element = this.code.ejecutar(env);
            if(element != null || element != undefined){
                console.log(element);
                if(element.type == 'Break')
                    break;
                else if(element.type == 'Continue'){
                    condition = this.condition.ejecutar(env);
                    continue;
                }
                else
                    return element;
            }
            condition = this.condition.ejecutar(env);
            if(condition.tipo != Tipo.BOOLEAN){
                throw {error: "La condicion no es booleana", linea: this.linea, columna : this.columna};
            }
        }
    }
}