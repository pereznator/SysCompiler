import { Instruccion } from '../abstractas/instruccion';
import { Entorno } from '../simbolos/entorno';

export class MetodoInstruccion extends Instruccion {

    public tipoInstruccion = 'metodo';

    constructor(private id: string, public contenido: Instruccion, public parametros: Array<any>, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(entorno: Entorno): any {
        //return entorno.guardarFuncion(this.id, this);
    }
}