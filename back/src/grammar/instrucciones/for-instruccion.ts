import { Instruccion } from "../abstractas/instruccion";
import { Expresion } from "../abstractas/expresion";
import { Entorno } from "../simbolos/entorno";
import { Tipo } from "../abstractas/retorno";
import { Declaracion } from './declaracion';
import { Actualizacion } from './actualizacion';
import { Asignacion } from "./asignacion";
import { Error_ } from '../Error/error';

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
        this.inicio.ejecutar(ent);
        const id = this.inicio.id;
        const condi = this.condicion.ejecutar(ent);
        if (condi.tipo != Tipo.BOOLEAN) {
            throw new Error_(this.linea, this.columna, 'Semantico', `La condicion ${condi.valor} no es booleana`);
        }

        /*const condicion = this.condicion.ejecutar(ent);
        if(condicion.tipo != Tipo.BOOLEAN){
            throw {error: "La condicion no es booleana", linea: this.linea, columna : this.columna};
        }

        if(condicion.valor == true){
            return this.contenido.ejecutar(ent);
        }
        else{
            return this.insElse?.ejecutar(ent);
        }*/
    }

}