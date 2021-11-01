import { Instruccion } from '../abstractas/instruccion';
import { Entorno } from '../simbolos/entorno';
import { Declaracion } from './declaracion';
import { Statement } from './statement';

export class MetodoInstruccion extends Instruccion {

    public tipoInstruccion = 'metodo';

    constructor(private id: string, public contenido: Instruccion, public parametros: Array<Instruccion>, linea: number, columna: number) {
        super(linea, columna);
        if (contenido instanceof Statement) {
            contenido.nombreEntorno = `Metodo ${this.id}`;
        }
    }

    public ejecutar(entorno: Entorno): any {
        console.log('ejecutando metodo declaracion');
        entorno.getGlobal().simbolos.push({identificador: this.id, tipoVariable: 'metodo', tipo: null, entorno: entorno.nombreEntorno, linea: this.linea, columna: this.columna});
        return entorno.guardarFuncion(this.id, this);
    }
}