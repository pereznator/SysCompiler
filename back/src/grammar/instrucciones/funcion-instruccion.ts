import { Instruccion } from '../abstractas/instruccion';
import { Entorno } from '../simbolos/entorno';
import { Tipo } from '../abstractas/retorno';
import { Statement } from './statement';

export class FuncionInstruccion extends Instruccion {

    public tipoInstruccion = 'funcion';

    constructor(public id: string, public contenido: Instruccion, public parametros: Array<any>, public tipo: Tipo, private arreglo: string, linea: number, columna: number) {
        super(linea, columna);
        if (contenido instanceof Statement) {
            contenido.nombreEntorno = `Funcion ${this.id}`;
        }
    }

    public ejecutar(entorno: Entorno): any {
        console.log('Ejecutando Fucion declaracio');
        if (this.arreglo) {
            this.tipo = Tipo.ARRAY;
        }
        entorno.getGlobal().simbolos.push({identificador: this.id, tipoVariable: 'funcion', tipo: this.tipo, entorno: entorno.nombreEntorno, linea: this.linea, columna: this.columna});
        return entorno.guardarFuncion(this.id, this);
    }
}