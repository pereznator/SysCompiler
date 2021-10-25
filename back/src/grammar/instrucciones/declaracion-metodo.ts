import { Instruccion } from '../abstractas/instruccion';
import { Entorno } from '../simbolos/entorno';
import { Declaracion } from './declaracion';

export class MetodoInstruccion extends Instruccion {

    public tipoInstruccion = 'metodo';

    constructor(private id: string, public contenido: Instruccion, public parametros: Array<Declaracion>, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(entorno: Entorno): any {
        console.log('ejecutando metodo declaracion');
        return entorno.guardarFuncion(this.id, this);
    }
}