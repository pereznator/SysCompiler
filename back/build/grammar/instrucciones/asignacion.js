"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const retorno_1 = require("../abstractas/retorno");
const error_1 = require("../Error/error");
class Asignacion extends instruccion_1.Instruccion {
    constructor(tipo, id, value, line, column) {
        super(line, column);
        this.tipoInstruccion = 'asignacion';
        this.id = id;
        this.value = value;
    }
    ejecutar(environment) {
        const val = this.value.ejecutar(environment);
        let varaible = environment.getVar(this.id);
        if (!varaible) {
            let vector = environment.getVector(this.id);
            if (!vector) {
                let lista = environment.getDynamicList(this.id);
                if (!lista) {
                    throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se encontro la variable con id '${this.id}'`);
                }
                if (val.tipo !== retorno_1.Tipo.ARRAY) {
                    throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se puede asignar tipo ${val.tipo} a vector '${lista.id}'`);
                }
                if (lista.tipo !== retorno_1.Tipo.CHAR) {
                    throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se puede asignar caracteres a una lista de tipo ${lista.tipo}`);
                }
                lista.elementos = val.valor;
                return;
            }
            console.log('es vector');
            if (val.tipo !== retorno_1.Tipo.ARRAY) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se puede asignar tipo ${val.tipo} a vector '${vector.id}'`);
            }
            if (val.valor[0].tipo !== vector.tipo) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se puede asignar tipo ${val.tipo} a vector '${vector.id}'`);
            }
            vector.elementos = val.valor;
            return;
        }
        if (val.tipo !== varaible.tipo) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `Variable '${this.id}' debe ser de tipo ${varaible.tipo}`);
        }
        return environment.guardar(this.id, val.valor, val.tipo);
    }
}
exports.Asignacion = Asignacion;
