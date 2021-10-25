import { Instruccion } from "../abstractas/instruccion";
import { Entorno } from "../simbolos/entorno";
import { Expresion } from "../abstractas/expresion";
import { Tipo } from '../abstractas/retorno';
import { Error_ } from '../Error/error';

export enum OpcionActualizacion {
    MASMAS,
    MENOSMENOS
}

export class Actualizacion extends Instruccion{

    private id : string;
    private operacion : OpcionActualizacion;
    public tipoInstruccion = 'actualizacion';

    constructor(id: string, operacion : OpcionActualizacion, line : number, column: number){
        super(line, column);
        this.id = id;
        this.operacion = operacion;
    }

    public ejecutar(environment: Entorno) {
        const val = environment.getVar(this.id);
        if (val !== undefined && val != null) {
            if (val.tipo !== Tipo.INT && val.tipo !== Tipo.DOUBLE) {
                throw new Error_(this.linea, this.columna, 'Semantico', `Variable ${this.id} no se puede incrementar o decrementar numericamente.`)
            }
            if (this.operacion == OpcionActualizacion.MASMAS) {
                val.valor = Number(val.valor) + 1;
            }else {
                val.valor = Number(val.valor) - 1;
            }
            environment.guardar(this.id, val.valor, val.tipo);
        }else {
            throw new Error_(this.linea, this.columna, 'Semantico', `No se encontro la variable con id ${this.id}`);
        }
    }

}