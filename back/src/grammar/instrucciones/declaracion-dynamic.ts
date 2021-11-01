import { Instruccion } from '../abstractas/instruccion';
import { Tipo } from '../abstractas/retorno';
import { Entorno } from '../simbolos/entorno';
import { DynamicList } from '../simbolos/dynamicList';
import { Expresion } from '../abstractas/expresion';
import { Error_ } from '../Error/error';

export class DeclaracionDynamic extends Instruccion {
    
    public tipoInstruccion = 'declaracion dynamic';

    constructor(private tipo: Tipo, private tipo2: Tipo, private id: string, private chararray: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno): any {

        console.log('Ejecutando declaracion dynamic');

        if (this.tipo2) {
            if (this.tipo !== this.tipo2) throw new Error_(this.linea, this.columna, 'Semantico', `No coinciden los tipos para la lista '${this.id}'`);
        }
        if (env.getDynamicList(this.id) !== null && env.getDynamicList(this.id) !== undefined) {
            throw new Error_(this.linea, this.columna, 'Semantico', `Ya existe una variable con id '${this.id}'`);
        }

        if (this.chararray) {
            if (this.tipo !== Tipo.CHAR) {
                throw new Error_(this.linea, this.columna, 'Semantico', `No se puede asignar arreglo de caracteres a tipo ${this.tipo}`);
            }
            const arr = this.chararray.ejecutar(env);
            if (arr.tipo !== Tipo.ARRAY) {
                throw new Error_(this.linea, this.columna, 'Semantico', `No se puede asignar tipo ${arr.tipo} a lista '${this.id}'`);
            }
            env.guardarDynamicList(this.id, new DynamicList(this.tipo, this.id, arr.valor));
        }else {
            env.guardarDynamicList(this.id, new DynamicList(this.tipo, this.id, new Array()));
        }
        const glob = env.getGlobal()
        glob.simbolos.push({identificador: this.id, tipoVariable: 'lista', tipo: this.tipo, entorno: env.nombreEntorno, linea: this.linea, columna: this.columna});
    
    }

}