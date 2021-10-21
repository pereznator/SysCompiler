import { Instruccion } from '../abstractas/instruccion';
import { Tipo } from '../abstractas/retorno';
import { Entorno } from '../simbolos/entorno';
import { DynamicList } from '../simbolos/dynamicList';
import { Expresion } from '../abstractas/expresion';

export class DeclaracionDynamic extends Instruccion {
    
    public tipoInstruccion = 'declaracion dynamic';

    constructor(private tipo: Tipo, private id: string, private chararray: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno): any {
        if (this.chararray) {
            const arr = this.chararray.ejecutar(env).valor as Array<any>;
            env.guardarVector(this.id, new DynamicList(this.tipo, this.id, arr));
        }else {
            env.guardarVector(this.id, new DynamicList(this.tipo, this.id, new Array()));
        }
    }

}