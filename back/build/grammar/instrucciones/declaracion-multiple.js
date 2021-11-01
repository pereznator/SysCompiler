"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const error_1 = require("../Error/error");
class DeclaracionMultiple extends instruccion_1.Instruccion {
    constructor(tipo, ids, value, line, column) {
        super(line, column);
        this.declaracion = 'declaracion multiple';
        this.ids = ids;
        this.value = value;
        this.tipo = tipo;
    }
    ejecutar(environment) {
        if (this.value == null) {
            for (const id of this.ids) {
                if (environment.getVar(id) !== null && environment.getVar(id) !== undefined) {
                    throw new error_1.Error_(this.linea, this.columna, 'Semantico', `Ya existe la variable con id '${id}'.`);
                }
                environment.guardar(id, null, this.tipo);
                const glob = environment.getGlobal();
                glob.simbolos.push({ identificador: id, tipoVariable: 'variable', tipo: this.tipo, entorno: environment.nombreEntorno, linea: this.linea, columna: this.columna });
            }
            return;
        }
        const val = this.value.ejecutar(environment);
        if (this.tipo !== val.tipo) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se puede asignar tipo ${val.tipo} a ${this.tipo}`);
        }
        for (const id of this.ids) {
            if (environment.getVar(id) !== null && environment.getVar(id) !== undefined) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `Ya existe la variable con id '${id}'.`);
            }
            environment.guardar(id, val.valor, val.tipo);
            const glob = environment.getGlobal();
            glob.simbolos.push({ identificador: id, tipoVariable: 'variable', tipo: this.tipo, entorno: environment.nombreEntorno, linea: this.linea, columna: this.columna });
        }
    }
}
exports.DeclaracionMultiple = DeclaracionMultiple;
