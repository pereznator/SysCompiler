"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const errores_1 = require("./grammar/Error/errores");
const parser = __importStar(require("./grammar/gramatica"));
const entorno_1 = require("./grammar/simbolos/entorno");
const startWith_1 = require("./grammar/instrucciones/startWith");
const funcion_instruccion_1 = require("./grammar/instrucciones/funcion-instruccion");
const declaracion_metodo_1 = require("./grammar/instrucciones/declaracion-metodo");
class AppController {
    index(req, res) {
        res.json({ text: 'Ahi te va' });
    }
    leerEntrada(req, res) {
        const { data } = req.body;
        let status;
        let contenido;
        let entorno;
        let salidas;
        let simbolos;
        try {
            let datos = parser.parse(data);
            contenido = datos.contenido;
            while (errores_1.errores.length > 0) {
                errores_1.errores.pop();
            }
            let erroresLexicos = datos.errores;
            if (erroresLexicos.length > 0) {
                console.log('Hay error lexico: ' + erroresLexicos);
                erroresLexicos.forEach((err) => {
                    errores_1.errores.push(err);
                });
            }
            status = 200;
            const ent = new entorno_1.Entorno(null);
            for (const instruccion of contenido) {
                try {
                    if (instruccion instanceof funcion_instruccion_1.FuncionInstruccion || instruccion instanceof declaracion_metodo_1.MetodoInstruccion) {
                        instruccion.ejecutar(ent);
                    }
                }
                catch (err) {
                    const erro = err;
                    errores_1.errores.push(erro);
                }
            }
            for (const instruccion of contenido) {
                try {
                    if (instruccion instanceof startWith_1.StartWith) {
                        let ejecucion = instruccion.ejecutar(ent);
                    }
                }
                catch (err) {
                    console.log(err);
                    const erro = err;
                    errores_1.errores.push(erro);
                }
            }
            entorno = ent;
            salidas = ent.salidas;
            simbolos = ent.simbolos;
        }
        catch (err) {
            console.log('un errorcito' + err);
            contenido = 'error';
            entorno = null;
            status = 404;
        }
        res.status(status).json({ contenido, errores: errores_1.errores, entorno, salidas, simbolos });
    }
}
exports.cont = new AppController();
