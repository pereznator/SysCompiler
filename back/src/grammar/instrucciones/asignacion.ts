import { Instruccion } from "../abstractas/instruccion";
import { Entorno } from "../simbolos/entorno";
import { Expresion } from "../abstractas/expresion";
import { Tipo } from '../abstractas/retorno';
import { Ternario } from './ternario';

export class Asignacion extends Instruccion{

    public id : string;
    public value : Expresion | Ternario;
    public tipoInstruccion = 'asignacion';

    constructor(tipo: Tipo,  id: string, value : Expresion | Ternario, line : number, column: number){
        super(line, column);
        this.id = id;
        this.value = value;
    }

    public ejecutar(environment: Entorno) {
        const val = this.value.ejecutar(environment);
        environment.guardar(this.id, val.valor, val.tipo);
    }

}