import { Instruccion } from '../abstractas/instruccion';
import { Expresion } from '../abstractas/expresion';
import { Entorno } from '../simbolos/entorno';
import { Error_ } from '../Error/error';

export class AppendInstruccion extends Instruccion {
    public tipoInstruccion = 'append';

    constructor(private id: string, private expresion: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(env: Entorno): any {
        console.log('Ejecutando append');
        const val = this.expresion.ejecutar(env);
        let dymList = env.getDynamicList(this.id);
        if (!dymList) {
            throw new Error_(this.linea, this.columna, 'Semantico', `No se encontro DynamicList con id '${this.id}'`);
        }
        if (val.tipo !== dymList.tipo) {
            throw new Error_(this.linea, this.columna, 'Semantico', `Tipos incompatibles para append en DynamicList con id '${this.id}'`);
        }
        dymList.elementos.push(val);
    }

}