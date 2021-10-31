import { Instruccion } from "../abstractas/instruccion";
import { Entorno } from "../simbolos/entorno";
import { Expresion } from "../abstractas/expresion";
import { Tipo } from '../abstractas/retorno';
import { Ternario } from './ternario';
import { Error_ } from '../Error/error';
import { Casteo } from './casteo';

export class Declaracion extends Instruccion{

    public id : string;
    public value : Expresion | Ternario | Casteo;
    public tipoInstruccion = 'declaracion';
    public tipo: Tipo;

    constructor(tipo: Tipo,  id: string, value : Expresion | Ternario | Casteo, line : number, column: number){
        super(line, column);
        this.id = id;
        this.value = value;
        this.tipo = tipo;
    }

    public ejecutar(environment: Entorno) {
        console.log('ejecutando declaracion');
        if (environment.getVar(this.id) !== null && environment.getVar(this.id) !== undefined) {
            throw new Error_(this.linea, this.columna, 'Semantico', `Ya existe una variable con id '${this.id}'`);
        }
        if (this.value !== null) {
            const val = this.value.ejecutar(environment);
            if (this.tipo !== val.tipo) {
                throw new Error_(this.linea, this.columna, 'Semantico', `No coinciden los valores para declaracion de ${this.id}`);
            }
            return environment.guardar(this.id, val.valor, val.tipo);
        }
        environment.guardar(this.id, null, this.tipo);
    }

}