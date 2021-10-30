"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const entorno_1 = require("../simbolos/entorno");
const retorno_1 = require("../abstractas/retorno");
const declaracion_1 = require("./declaracion");
const error_1 = require("../Error/error");
class ForInstruccion extends instruccion_1.Instruccion {
    constructor(inicio, condicion, actualizacion, contenido, linea, columna) {
        super(linea, columna);
        this.inicio = inicio;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.contenido = contenido;
        this.tipoInstruccion = 'for';
    }
    ejecutar(ent) {
        const newEnv = new entorno_1.Entorno(ent);
        if (this.inicio instanceof declaracion_1.Declaracion) {
            this.inicio.ejecutar(newEnv);
        }
        else {
            this.inicio.ejecutar(ent);
        }
        let condi = this.condicion.ejecutar(newEnv);
        if (condi.tipo != retorno_1.Tipo.BOOLEAN) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `La condicion ${condi.valor} no es booleana`);
        }
        while (condi.valor == true) {
            const cont = this.contenido.ejecutar(newEnv);
            this.actualizacion.ejecutar(newEnv);
            if (cont !== null && cont !== undefined) {
                if (cont.tipoInstruccion == 'break') {
                    break;
                }
                else if (cont.tipoInstruccion == 'continue') {
                    continue;
                }
                else if (cont.tipoInstruccion == 'return') {
                    break;
                }
            }
            condi = this.condicion.ejecutar(newEnv);
            if (condi.tipo != retorno_1.Tipo.BOOLEAN) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `La condicion ${condi.valor} no es booleana`);
            }
        }
    }
}
exports.ForInstruccion = ForInstruccion;
