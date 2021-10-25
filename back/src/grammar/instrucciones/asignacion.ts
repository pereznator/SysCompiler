import { Instruccion } from "../abstractas/instruccion";
import { Entorno } from "../simbolos/entorno";
import { Expresion } from "../abstractas/expresion";
import { Tipo } from '../abstractas/retorno';
import { Ternario } from './ternario';
import { Error_ } from '../Error/error';
import { Casteo } from './casteo';

export class Asignacion extends Instruccion{

    public id : string;
    public value : Expresion | Ternario | Casteo;
    public tipoInstruccion = 'asignacion';

    constructor(tipo: Tipo,  id: string, value : Expresion | Ternario | Casteo, line : number, column: number){
        super(line, column);
        this.id = id;
        this.value = value;
    }

    public ejecutar(environment: Entorno) {
        const val = this.value.ejecutar(environment);
        const varaible = environment.getVar(this.id);
        if (!varaible) {
            throw new Error_(this.linea, this.columna, 'Semantico', `No se encontro la variable con id '${this.id}'`);
        }
        if (val.tipo !== varaible.tipo){
            throw new Error_(this.linea, this.columna, 'Semantico', `Variable '${this.id}' debe ser de tipo ${varaible.tipo}`);
        }
        environment.guardar(this.id, val.valor, val.tipo);
    }

}