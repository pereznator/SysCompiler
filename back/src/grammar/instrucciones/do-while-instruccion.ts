import { Instruccion } from "../abstractas/instruccion";
import { Expresion } from "../abstractas/expresion";
import { Entorno } from "../simbolos/entorno";
import { Tipo } from "../abstractas/retorno";
import { Statement } from './statement';

export class DoWhileInstruccion extends Instruccion{

    public tipoInstruccion = 'dowhile';

    constructor(private condition : Expresion, private code : Instruccion, linea : number, columna : number){
        super(linea, columna);
    }

    public ejecutar(env : Entorno) {
        console.log('Ejecutando dowhile');
        let condition = this.condition.ejecutar(env);
        if (condition.tipo != Tipo.BOOLEAN) {
            throw {error: "La condicion no es booleana", linea: this.linea, columna : this.columna};
        }
        if (this.code instanceof Statement) {
            this.code.nombreEntorno = 'instruccion do while';
        }
        let element = this.code.ejecutar(env);
        if(element != null || element != undefined){
            if (element.valor) {
                console.log('[element]'+element);
                return element;
            }

            if(element.tipoInstruccion == 'break')
                return;
            else if(element.tipoInstruccion == 'continue'){
                condition = this.condition.ejecutar(env);
                return;
            }else if (element.tipoInstruccion == 'return') {
                return;
            }
            else
                return element;
        }
        while(condition.valor == true){
            element = this.code.ejecutar(env);
            if(element != null || element != undefined){
                if (element.valor) {
                    console.log('[element]'+element);
                    return element;
                }
                
                if(element.tipoInstruccion == 'break')
                    break;
                else if(element.tipoInstruccion == 'continue'){
                    condition = this.condition.ejecutar(env);
                    continue;
                }else if (element.tipoInstruccion == 'return') {
                    return element;
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