import { Instruccion } from "../abstractas/instruccion";
import { Entorno } from "../simbolos/entorno";
import { Error_ } from '../Error/error';
import { Expresion } from '../abstractas/expresion';
import { CaseInstruccion } from './case-instruccion';
import { Statement } from './statement';

export class SwitchInstruccion extends Instruccion{

    public tipoInstruccion = 'switch';

    constructor(private expresion: Expresion, private cases: Array<CaseInstruccion>, private defa: Statement, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno) {
        console.log('ejecutando switch');
        const valor = this.expresion.ejecutar(env);
        if (this.cases === null) {
            if (this.defa === null) {
                return;
            }
            this.defa.ejecutar(env);
            return;
        }
        let final;
        this.cases.forEach( c => {
            const result = c.ejecutar(env, valor);
            if (result !== null && result !== undefined) {
                if (result.tipoInstruccion == 'break') {
                    final = 'break';
                }else if (result.tipoInstruccion == 'return') {
                    final = 'return';
                }else if (result.tipoInstruccion == 'continue') {
                    final = 'continue';
                }
            }
        });
        if (!final) {
            console.log('no hubo break');
            this.defa.ejecutar(env);
        }
    }
    
}