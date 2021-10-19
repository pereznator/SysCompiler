"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../abstractas/expresion");
const retorno_1 = require("../abstractas/retorno");
var OperadoresLogicos;
(function (OperadoresLogicos) {
    OperadoresLogicos[OperadoresLogicos["AND"] = 0] = "AND";
    OperadoresLogicos[OperadoresLogicos["OR"] = 1] = "OR";
    OperadoresLogicos[OperadoresLogicos["NOT"] = 2] = "NOT";
})(OperadoresLogicos = exports.OperadoresLogicos || (exports.OperadoresLogicos = {}));
class ExpresionLogica extends expresion_1.Expresion {
    constructor(left, right, type, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.type = type;
        this.tipo = type;
    }
    ejecutar(environment) {
        const leftValue = this.left.ejecutar(environment);
        const rightValue = this.right.ejecutar(environment);
        if (this.type == OperadoresLogicos.AND) {
            const result = leftValue.valor && rightValue.valor;
            return { valor: result, tipo: retorno_1.Tipo.BOOLEAN };
        }
        else if (this.type == OperadoresLogicos.OR) {
            const result = leftValue.valor || rightValue.valor;
            return { valor: result, tipo: retorno_1.Tipo.BOOLEAN };
        }
        else if (this.type == OperadoresLogicos.NOT) {
            const result = !leftValue.valor;
            return { valor: result, tipo: retorno_1.Tipo.BOOLEAN };
        }
        return { valor: 0, tipo: retorno_1.Tipo.BOOLEAN };
    }
}
exports.ExpresionLogica = ExpresionLogica;
