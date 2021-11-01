import { Instruccion } from "../abstractas/instruccion";
import { Expresion } from "../abstractas/expresion";
import { Entorno } from "../simbolos/entorno";
import { Tipo } from "../abstractas/retorno";
import { Declaracion } from './declaracion';
import { Actualizacion } from './actualizacion';
import { Asignacion } from "./asignacion";
import { Error_ } from '../Error/error';
import { Statement } from './statement';

export class ForInstruccion extends Instruccion {

    public tipoInstruccion = 'for';

    constructor(
        private inicio: Declaracion | Asignacion,
        private condicion: Expresion,
        private actualizacion: Actualizacion | Asignacion,
        private contenido: Instruccion,        
        linea: number,
        columna: number) {
            super(linea, columna);
    }

    public ejecutar(ent: Entorno) {
        if (this.contenido instanceof Statement) {
            this.contenido.nombreEntorno = 'instruccion for';
        }
        this.inicio.ejecutar(ent);
        let condi = this.condicion.ejecutar(ent);
        if (condi.tipo != Tipo.BOOLEAN) {
            throw new Error_(this.linea, this.columna, 'Semantico', `La condicion ${condi.valor} no es booleana`);
        }

        while (condi.valor == true) {
            const cont = this.contenido.ejecutar(ent);
            this.actualizacion.ejecutar(ent);
            if (cont !== null && cont !== undefined) {
                if (cont.valor) {
                    console.log('[contenido]'+cont);
                    return cont;
                }
                if (cont.tipoInstruccion == 'break') {
                    break;
                } else if (cont.tipoInstruccion == 'continue') {
                    continue;
                } else if (cont.tipoInstruccion == 'return') {
                    break;
                }
            }
            condi = this.condicion.ejecutar(ent);
            if (condi.tipo != Tipo.BOOLEAN) {
                throw new Error_(this.linea, this.columna, 'Semantico', `La condicion ${condi.valor} no es booleana`);
            }
        }
    }
}