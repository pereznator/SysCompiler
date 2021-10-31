import { Instruccion } from "../abstractas/instruccion";
import { Expresion } from "../abstractas/expresion";
import { Entorno } from "../simbolos/entorno";
import { Tipo } from "../abstractas/retorno";
import { Error_ } from '../Error/error';

export class WhileInstruccion extends Instruccion{

    public tipoInstruccion = 'while';

    constructor(private condition : Expresion, private code : Instruccion, linea : number, columna : number){
        super(linea, columna);
    }

    public ejecutar(env : Entorno) {
        console.log('ejecutando while');
        let condition = this.condition.ejecutar(env);
        if (condition.tipo != Tipo.BOOLEAN) {
            throw {error: "La condicion no es booleana", linea: this.linea, columna : this.columna};
        }
        while(condition.valor == true){
            const element = this.code.ejecutar(env);
            if(element != null && element != undefined){
                if(element.tipoInstruccion == 'break'){
                    break;
                }
                else if(element.tipoInstruccion == 'continue'){
                    continue;
                }else if (element.tipoInstruccion == 'return') {
                    return element;
                }
                else{
                    return element;
                }
            }
            condition = this.condition.ejecutar(env);
            if(condition.tipo != Tipo.BOOLEAN){
                throw new Error_(this.linea, this.columna, 'Semantico', `No se`);
            }
        }
    }
}