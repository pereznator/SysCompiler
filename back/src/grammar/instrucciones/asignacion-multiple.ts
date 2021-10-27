import { Instruccion } from "../abstractas/instruccion";
import { Entorno } from "../simbolos/entorno";
import { Expresion } from "../abstractas/expresion";
import { Tipo, Retorno } from '../abstractas/retorno';
import { Error_ } from '../Error/error';
import { Casteo } from './casteo';
import { Ternario } from './ternario';
import { Llamada } from './llamada-instruccion';

export class AsignacionMultiple extends Instruccion{

    private ids : Array<string>;
    private value : Expresion | Casteo | Ternario | Llamada;
    public declaracion = 'asignacion multiple';

    constructor(ids: Array<string>, value : Expresion | Casteo | Ternario | Llamada, line : number, column: number){
        super(line, column);
        this.ids = ids;
        this.value = value;
    }

    public ejecutar(environment: Entorno) {
        const val = this.value.ejecutar(environment);
        if (!val) {
            throw new Error_(this.linea, this.columna, 'Semantico', `No se pudo asignar valor a las variables`);
        }
        for (const id of this.ids) {
            const variable = environment.getVar(id);
            if (!variable) {
                throw new Error_(this.linea, this.columna, 'Semantico', `No se encontro variable con id '${id}'.`);
            }
            if (variable.tipo !== val.tipo) {
                throw new Error_(this.linea, this.columna, 'Semantico', `No se pude asignar tipo ${val.tipo} a '${id}'.`);
            }
            environment.guardar(id, val.valor, val.tipo);
        }
    }

}