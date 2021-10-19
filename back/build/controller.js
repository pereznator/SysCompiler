"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser = __importStar(require("./grammar/gramatica"));
class AppController {
    index(req, res) {
        res.json({ text: 'Ahi te va' });
    }
    leerEntrada(req, res) {
        const { data } = req.body;
        let status;
        let contenido;
        try {
            console.log(parser.parse(data));
            contenido = parser.parse(data);
            status = 200;
        }
        catch (err) {
            console.log(err);
            contenido = 'error';
            status = 404;
        }
        res.status(status).json({ 'contenido': contenido });
    }
}
exports.cont = new AppController();
