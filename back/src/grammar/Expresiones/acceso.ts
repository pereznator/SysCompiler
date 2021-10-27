import { Expresion } from "../abstractas/expresion";
import { Entorno } from "../simbolos/entorno";
import { Retorno, Tipo } from "../abstractas/retorno";

export class Acceso extends Expresion{

    constructor(public id: string, line : number, column: number){
        super(line, column);
    }

    public ejecutar(environment: Entorno): Retorno {
        let value;
        value = environment.getVar(this.id);
        if (value) {
            return {valor : value.valor, tipo : value.tipo};
        }
        value = environment.getFuncion(this.id);
        if (value) {
            const val = value.ejecutar(environment);
            return {valor: val.valor, tipo: val.tipo};
        }
        value = environment.getVector(this.id);
        if (value) {
            return {valor: value, tipo: Tipo.ARRAY};
        }
        value = environment.getDynamicList(this.id);
        if (value) {
            return {valor: value, tipo: Tipo.ARRAY}
        }
        throw new Error("La variable no existe");

    }
}