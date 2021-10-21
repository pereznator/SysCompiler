import { Instruccion } from '../abstractas/instruccion';
import { Entorno } from '../simbolos/entorno';
import { Tipo } from '../abstractas/retorno';

export class FuncionInstruccion extends Instruccion {

    public tipoInstruccion = 'funcion';

    constructor(private id: string, public contenido: Instruccion, public parametros: Array<any>, public tipo: Tipo, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(entorno: Entorno): any {
        return entorno.guardarFuncion(this.id, this);
    }
}