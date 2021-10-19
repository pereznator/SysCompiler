"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const retorno_1 = require("../abstractas/retorno");
const error_1 = require("../Error/error");
class Ternario extends instruccion_1.Instruccion {
    constructor(condicion, expresionUno, expresiondDos, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.expresionUno = expresionUno;
        this.expresiondDos = expresiondDos;
        this.tipoInstruccion = 'ternario';
    }
    ejecutar(env) {
        const cond = this.condicion.ejecutar(env);
        let resultado = null;
        if (cond.tipo == retorno_1.Tipo.BOOLEAN) {
            if (cond.valor == true) {
                resultado = this.expresionUno.ejecutar(env);
            }
            else {
                resultado = this.expresiondDos.ejecutar(env);
            }
        }
        else {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `La expresion ${cond.tipo} no es booleana`);
        }
        return resultado;
    }
}
exports.Ternario = Ternario;
