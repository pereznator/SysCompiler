"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const retorno_1 = require("../abstractas/retorno");
const error_1 = require("../Error/error");
class Declaracion extends instruccion_1.Instruccion {
    constructor(tipo, id, value, line, column) {
        super(line, column);
        this.tipoInstruccion = 'declaracion';
        this.id = id;
        this.value = value;
        this.tipo = tipo;
    }
    ejecutar(environment) {
        console.log('ejecutando declaracion');
        if (environment.getVar(this.id) !== null && environment.getVar(this.id) !== undefined) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `Ya existe una variable con id '${this.id}'`);
        }
        if (this.value !== null) {
            const val = this.value.ejecutar(environment);
            if (val) {
                if (this.tipo !== val.tipo) {
                    throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No coinciden los valores para declaracion de '${this.id}'`);
                }
                if (this.tipo == retorno_1.Tipo.ARRAY) {
                    environment.guardarDynamicList(this.id, val);
                }
                else {
                    environment.guardar(this.id, val.valor, val.tipo);
                }
                const glob = environment.getGlobal();
                glob.simbolos.push({ identificador: this.id, tipoVariable: 'variable', tipo: this.tipo, entorno: environment.nombreEntorno, linea: this.linea, columna: this.columna });
                return;
            }
            else {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se pudo asignar a la variable '${this.id}'`);
            }
        }
        environment.guardar(this.id, null, this.tipo);
        const glob = environment.getGlobal();
        glob.simbolos.push({ identificador: this.id, tipoVariable: 'variable', tipo: this.tipo, entorno: environment.nombreEntorno, linea: this.linea, columna: this.columna });
    }
}
exports.Declaracion = Declaracion;
