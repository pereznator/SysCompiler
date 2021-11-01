import { Request, Response } from 'express';
import { errores } from './grammar/Error/errores';
import * as parser from './grammar/gramatica';
import { Entorno } from './grammar/simbolos/entorno';
import { Error_ } from './grammar/Error/error';
import { StartWith } from './grammar/instrucciones/startWith';
import { FuncionInstruccion } from './grammar/instrucciones/funcion-instruccion';
import { MetodoInstruccion } from './grammar/instrucciones/declaracion-metodo';

class AppController {

    public index(req: Request, res: Response) {
        res.json({text: 'Ahi te va'});
    }

    public leerEntrada(req: Request, res: Response) {
        const { data } = req.body;
        let status;
        let contenido;
        let entorno;
        let salidas;
        let simbolos;
        try{
            let datos = parser.parse(data);
            contenido = datos.contenido;
            while (errores.length > 0) {
                errores.pop();
            }
            let erroresLexicos = datos.errores;
            if (erroresLexicos.length > 0) {
                console.log('Hay error lexico: '+erroresLexicos);
                erroresLexicos.forEach((err: Error_) => {
                    errores.push(err);
                });
            }
            status = 200;
            const ent = new Entorno(null);

            for (const instruccion of contenido) {
                try {
                    if (instruccion instanceof FuncionInstruccion || instruccion instanceof MetodoInstruccion) {
                        instruccion.ejecutar(ent);
                    }
                }catch(err) {
                    const erro = err as Error_;
                    errores.push(erro);
                }
            }
            for (const instruccion of contenido) {
                try {
                    if (instruccion instanceof StartWith) {
                        let ejecucion = instruccion.ejecutar(ent);
                    }
                }catch(err) {
                    console.log(err);
                    const erro = err as Error_;
                    errores.push(erro);
                }
            }
            entorno = ent;
            salidas = ent.salidas;
            simbolos = ent.simbolos;
        }catch(err) {
            console.log('un errorcito'+err);
            contenido = 'error';
            entorno = null;
            status = 404;
        }
        res.status(status).json({contenido, errores, entorno, salidas, simbolos});
    }
}

export const cont = new AppController();
