import { Instruccion } from "../abstractas/instruccion";
import { Entorno } from "../simbolos/entorno";
import { Expresion } from "../abstractas/expresion";
import { Tipo } from '../abstractas/retorno';
import { Ternario } from './ternario';
import { Error_ } from '../Error/error';
import { Casteo } from './casteo';
import { Llamada } from './llamada-instruccion';

export class Declaracion extends Instruccion{

    public id : string;
    public value : Expresion | Ternario | Casteo | Llamada;
    public tipoInstruccion = 'declaracion';
    public tipo: Tipo;

    constructor(tipo: Tipo,  id: string, value : Expresion | Ternario | Casteo | Llamada, line : number, column: number){
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
            if (val) {
                if (this.tipo !== val.tipo) {
                    throw new Error_(this.linea, this.columna, 'Semantico', `No coinciden los valores para declaracion de '${this.id}'`);
                }
                if (this.tipo == Tipo.ARRAY) {
                    environment.guardarDynamicList(this.id, val);
                }else {
                    environment.guardar(this.id, val.valor, val.tipo);
                }
                const glob = environment.getGlobal()
                glob.simbolos.push({identificador: this.id, tipoVariable: 'variable', tipo: this.tipo, entorno: environment.nombreEntorno, linea: this.linea, columna: this.columna});
                return;
            }else {
                throw new Error_(this.linea, this.columna, 'Semantico', `No se pudo asignar a la variable '${this.id}'`);
            }
        }
        environment.guardar(this.id, null, this.tipo);
        const glob = environment.getGlobal()
        glob.simbolos.push({identificador: this.id, tipoVariable: 'variable', tipo: this.tipo, entorno: environment.nombreEntorno, linea: this.linea, columna: this.columna});
    }

}