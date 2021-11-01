import { Instruccion } from "../abstractas/instruccion";
import { Entorno } from "../simbolos/entorno";
import { errores } from "../Error/errores";
import { Error_ } from '../Error/error';
import { Return } from './return';

export class Statement extends Instruccion{

    public nombreEntorno = '';

    constructor(private code : Array<Instruccion>, line : number, column : number){
        super(line, column);
    }

    public ejecutar(env : Entorno): any {
        const newEnv = new Entorno(env);
        newEnv.nombreEntorno = this.nombreEntorno;
        for(const instr of this.code){
            try {
                const element = instr.ejecutar(newEnv);
                if(element != undefined && element != null){
                    if (element instanceof Return) {
                        console.log('se encontro un retorno en el statement');
                        return element.retorno;
                    }
                    return element;
                }
            } catch (error) {
                const err = error as Error_;
                errores.push(err);
            }
        }
    }
}