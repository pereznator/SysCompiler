"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const error_1 = require("../Error/error");
var OpcionActualizacion;
(function (OpcionActualizacion) {
    OpcionActualizacion[OpcionActualizacion["MASMAS"] = 0] = "MASMAS";
    OpcionActualizacion[OpcionActualizacion["MENOSMENOS"] = 1] = "MENOSMENOS";
})(OpcionActualizacion = exports.OpcionActualizacion || (exports.OpcionActualizacion = {}));
class Actualizacion extends instruccion_1.Instruccion {
    constructor(id, operacion, line, column) {
        super(line, column);
        this.tipoInstruccion = 'actualizacion';
        this.id = id;
        this.operacion = operacion;
    }
    ejecutar(environment) {
        const val = environment.getVar(this.id);
        if (val !== undefined && val != null) {
            if (this.operacion == OpcionActualizacion.MASMAS) {
                val.valor = Number(val.valor) + 1;
            }
            else {
                val.valor = Number(val.valor) - 1;
            }
            environment.guardar(this.id, val.valor, val.tipo);
        }
        else {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se encontro la variable con id ${this.id}`);
        }
    }
}
exports.Actualizacion = Actualizacion;
