import { Instruccion } from "../abstractas/instruccion";
import { Entorno } from "../simbolos/entorno";
import { errores } from "../Error/errores";
import { Error_ } from '../Error/error';
import { Expresion } from '../abstractas/expresion';

export class CaseInstruccion extends Instruccion{

    public tipoInstruccion = 'case';

    constructor(private condicion: Expresion, private code : Array<Instruccion>, line : number, column : number){
        super(line, column);
    }

    public ejecutar(env : Entorno) {
        const newEnv = new Entorno(env);
        for(const instr of this.code){
            try {
                const element = instr.ejecutar(newEnv);
                if(element != undefined || element != null){
                    return element;                
                }
            } catch (error) {
                const err = error as Error_;
                errores.push(err);
            }
        }
    }
}