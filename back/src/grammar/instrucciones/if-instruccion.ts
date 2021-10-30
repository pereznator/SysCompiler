import { Instruccion } from "../abstractas/instruccion";
import { Expresion } from "../abstractas/expresion";
import { Entorno } from "../simbolos/entorno";
import { Tipo } from "../abstractas/retorno";

export class IfInstruccion extends Instruccion {
    public tipoInstruccion = 'if';
    constructor(
        private condicion: Expresion,
        private contenido: Instruccion,
        private insElse: Instruccion | null,
        linea: number,
        columna: number) {
            super(linea, columna);
    }

    public ejecutar(ent: Entorno) {
        console.log('ejecutando if');
        const condicion = this.condicion.ejecutar(ent);
        if(condicion.tipo != Tipo.BOOLEAN){
            throw {error: "La condicion no es booleana", linea: this.linea, columna : this.columna};
        }
        if(condicion.valor == true){
            return this.contenido.ejecutar(ent);
        }
        else{
            if (this.insElse) {
                return this.insElse.ejecutar(ent);
            }
        }
    }

}