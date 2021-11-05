import { Instruccion } from "../abstractas/instruccion";
import { Entorno } from "../simbolos/entorno";
import { Expresion } from "../abstractas/expresion";
import { Tipo, Retorno } from '../abstractas/retorno';
import { Ternario } from './ternario';
import { Error_ } from '../Error/error';
import { Casteo } from './casteo';
import { ToCharArray } from '../Expresiones/toCharArray';
import { Llamada } from './llamada-instruccion';

export class Asignacion extends Instruccion{

    public id : string;
    public value : Expresion | Ternario | Casteo | ToCharArray | Llamada;
    public tipoInstruccion = 'asignacion';

    constructor(tipo: Tipo,  id: string, value : Expresion | Ternario | Casteo | ToCharArray | Llamada, line : number, column: number){
        super(line, column);
        this.id = id;
        this.value = value;
    }

    public ejecutar(environment: Entorno) {
        const val = this.value.ejecutar(environment);
        let varaible = environment.getVar(this.id);
        if (!varaible) {
            let vector = environment.getVector(this.id);
            if (!vector) {
                let lista = environment.getDynamicList(this.id);
                if (!lista) {
                    throw new Error_(this.linea, this.columna, 'Semantico', `No se encontro la variable con id '${this.id}'`);
                }
                if (val.tipo !== Tipo.ARRAY) {
                    throw new Error_(this.linea, this.columna, 'Semantico', `No se puede asignar tipo ${val.tipo} a vector '${lista.id}'`);
                }
                if (lista.tipo !== Tipo.CHAR) {
                    throw new Error_(this.linea, this.columna, 'Semantico', `No se puede asignar caracteres a una lista de tipo ${lista.tipo}`);
                }
                lista.elementos = val.valor;
                return;
            }
            console.log('es vector');
            if (val.tipo !== Tipo.ARRAY) {
                throw new Error_(this.linea, this.columna, 'Semantico', `No se puede asignar tipo ${val.tipo} a vector '${vector.id}'`);
            }
            if (val.valor[0].tipo !== vector.tipo) {
                throw new Error_(this.linea, this.columna, 'Semantico', `No se puede asignar tipo ${val.tipo} a vector '${vector.id}'`);
            }
            vector.elementos = val.valor;
            return;
        }
        if (val.tipo !== varaible.tipo){
            throw new Error_(this.linea, this.columna, 'Semantico', `Variable '${this.id}' debe ser de tipo ${varaible.tipo}`);
        }
        return environment.guardar(this.id, val.valor, val.tipo);
    }

}