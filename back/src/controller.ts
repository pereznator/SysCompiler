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
        try{
            contenido = parser.parse(data);
            status = 200;
            const ent = new Entorno(null);
            while (errores.length > 0) {
                errores.pop();
            }

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
                        instruccion.ejecutar(ent);
                    }
                }catch(err) {
                    console.log(err);
                    const erro = err as Error_;
                    errores.push(erro);
                }
            }
            entorno = ent;

        }catch(err) {
            console.log(err);
            contenido = 'error';
            entorno = null;
            status = 404;
        }
        res.status(status).json({'contenido': contenido, 'errores': errores, 'entornos': entorno});
    }
}

export const cont = new AppController();
