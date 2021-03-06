import { Instruccion } from "../abstractas/instruccion";
import { Entorno } from "../simbolos/entorno";
import { Expresion } from "../abstractas/expresion";
import { Tipo } from '../abstractas/retorno';
import { Error_ } from '../Error/error';

export class DeclaracionMultiple extends Instruccion{

    private ids : Array<string>;
    private value : Expresion;
    private tipo: Tipo
    public declaracion = 'declaracion multiple';

    constructor(tipo: Tipo,  ids: Array<string>, value : Expresion, line : number, column: number){
        super(line, column);
        this.ids = ids;
        this.value = value;
        this.tipo = tipo;
    }

    public ejecutar(environment: Entorno) {
        if (this.value == null) {
            for (const id of this.ids) {
                if (environment.getVar(id) !== null && environment.getVar(id) !== undefined) {
                    throw new Error_(this.linea, this.columna, 'Semantico', `Ya existe la variable con id '${id}'.`)
                }
                environment.guardar(id, null, this.tipo);
                const glob = environment.getGlobal()
                glob.simbolos.push({identificador: id, tipoVariable: 'variable', tipo: this.tipo, entorno: environment.nombreEntorno, linea: this.linea, columna: this.columna});
            }
            return;
        }
        const val = this.value.ejecutar(environment);
        if (this.tipo !== val.tipo) {
            throw new Error_(this.linea, this.columna, 'Semantico', `No se puede asignar tipo ${val.tipo} a ${this.tipo}`);
        }
        for (const id of this.ids) {
            if (environment.getVar(id) !== null && environment.getVar(id) !== undefined) {
                throw new Error_(this.linea, this.columna, 'Semantico', `Ya existe la variable con id '${id}'.`)
            }
            environment.guardar(id, val.valor, val.tipo);
            const glob = environment.getGlobal()
            glob.simbolos.push({identificador: id, tipoVariable: 'variable', tipo: this.tipo, entorno: environment.nombreEntorno, linea: this.linea, columna: this.columna});
        }
    }

}