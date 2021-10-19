import { Request, Response } from 'express';
import * as parser from './grammar/gramatica';

class AppController {

    public index(req: Request, res: Response) {
        res.json({text: 'Ahi te va'});
    }

    public leerEntrada(req: Request, res: Response) {
        const { data } = req.body;
        let status;
        let contenido;
        try{
            console.log(parser.parse(data));
            contenido = parser.parse(data);
            status = 200;
        }catch(err) {
            console.log(err);
            contenido = 'error';
            status = 404;
        }
        res.status(status).json({'contenido': contenido});
    }
}

export const cont = new AppController();
