import { Expresion } from "../abstractas/expresion";
import { Entorno } from "../simbolos/entorno";
import { Retorno } from "../abstractas/retorno";

export class Acceso extends Expresion{

    constructor(private id: string, line : number, column: number){
        super(line, column);
    }

    public ejecutar(environment: Entorno): Retorno {
        const value = environment.getVar(this.id);
        if(value == null)
            throw new Error("La variable no existe");
        return {valor : value.valor, tipo : value.tipo};
    }
}