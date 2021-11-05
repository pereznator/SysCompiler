"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const retorno_1 = require("../abstractas/retorno");
const vector_1 = require("../simbolos/vector");
const error_1 = require("../Error/error");
const llamada_instruccion_1 = require("./llamada-instruccion");
class DeclaracionVector extends instruccion_1.Instruccion {
    constructor(tipo, id, posiciones, elementos, expresion, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.posiciones = posiciones;
        this.elementos = elementos;
        this.expresion = expresion;
        this.tipoInstruccion = 'declaracion vector';
    }
    ejecutar(env) {
        console.log('Ejecutando declaracion de vector');
        if (this.expresion) {
            if (!(this.expresion instanceof llamada_instruccion_1.Llamada)) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se puede asignar expresion a vector ${this.id}`);
            }
            const val = this.expresion.ejecutar(env);
            if (val === undefined || val === null) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se puede asignar indefinido a vector ${this.id}`);
            }
            if (val.tipo !== retorno_1.Tipo.ARRAY) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se puede asignar expresion que no sea vector a vector ${this.id}`);
            }
            if (!(val.valor instanceof vector_1.Vector)) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se puede asignar expresion que no sea vector a vector ${this.id}`);
            }
            if (this.tipo !== val.valor.tipo) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No coinciden los tipos de datos para ${this.id}`);
            }
            env.guardarVector(this.id, val.valor);
            const glob = env.getGlobal();
            glob.simbolos.push({ identificador: this.id, tipoVariable: 'vector', tipo: this.tipo, entorno: env.nombreEntorno, linea: this.linea, columna: this.columna });
            return;
        }
        let arreglo = new Array();
        if (this.posiciones) {
            let exp = this.posiciones.ejecutar(env);
            if (exp.tipo !== retorno_1.Tipo.INT) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se puede crear vector '${this.id}' porque debe tener un numero entero de posiciones.`);
            }
            for (let i = 0; i < exp.valor; i++) {
                arreglo.push(null);
            }
        }
        else if (this.elementos) {
            for (let elemento of this.elementos) {
                const el = elemento.ejecutar(env);
                if (el.tipo !== this.tipo) {
                    throw new error_1.Error_(this.linea, this.columna, 'Semantico', `El valor del elemento ${el.valor} no coincide con el tipo de vector ${this.id}.`);
                }
                arreglo.push(el);
            }
        }
        env.guardarVector(this.id, new vector_1.Vector(this.tipo, this.id, arreglo));
        const glob = env.getGlobal();
        glob.simbolos.push({ identificador: this.id, tipoVariable: 'vector', tipo: this.tipo, entorno: env.nombreEntorno, linea: this.linea, columna: this.columna });
    }
}
exports.DeclaracionVector = DeclaracionVector;
