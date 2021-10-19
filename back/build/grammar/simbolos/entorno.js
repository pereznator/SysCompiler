"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simbolo_1 = require("./simbolo");
class Entorno {
    constructor(anterior) {
        this.anterior = anterior;
        this.variables = new Map();
        this.funciones = new Map();
        this.vectores = new Map();
    }
    guardar(id, valor, tipo) {
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                env.variables.set(id, new simbolo_1.Simbolo(valor, id, tipo));
                return;
            }
            env = env.anterior;
        }
        this.variables.set(id, new simbolo_1.Simbolo(valor, id, tipo));
    }
    guardarFuncion(id, funcion) {
        this.funciones.set(id, funcion);
    }
    guardarVector(id, vector) {
    }
    getVar(id) {
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    }
    getFuncion(id) {
        let env = this;
        while (env != null) {
            if (env.funciones.has(id)) {
                return env.funciones.get(id);
            }
            env = env.anterior;
        }
        return undefined;
    }
    getGlobal() {
        var _a;
        let env = this;
        while (((_a = env) === null || _a === void 0 ? void 0 : _a.anterior) != null) {
            env = env.anterior;
        }
        return env;
    }
}
exports.Entorno = Entorno;
