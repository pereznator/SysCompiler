"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const retorno_1 = require("../abstractas/retorno");
const error_1 = require("../Error/error");
const statement_1 = require("./statement");
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
        if (this.contenido instanceof statement_1.Statement) {
            this.contenido.nombreEntorno = 'instruccion for';
        }
        this.inicio.ejecutar(ent);
        let condi = this.condicion.ejecutar(ent);
        if (condi.tipo != retorno_1.Tipo.BOOLEAN) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `La condicion ${condi.valor} no es booleana`);
        }
        while (condi.valor == true) {
            const cont = this.contenido.ejecutar(ent);
            this.actualizacion.ejecutar(ent);
            if (cont !== null && cont !== undefined) {
                if (cont.valor) {
                    console.log('[contenido]' + cont);
                    return cont;
                }
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
            condi = this.condicion.ejecutar(ent);
            if (condi.tipo != retorno_1.Tipo.BOOLEAN) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `La condicion ${condi.valor} no es booleana`);
            }
        }
    }
}
exports.ForInstruccion = ForInstruccion;
