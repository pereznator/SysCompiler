import { FuncionInstruccion } from '../instrucciones/funcion-instruccion';
import { Simbolo } from './simbolo';
import { Tipo } from '../abstractas/retorno';
import { Vector } from './vector';


export class Entorno {

    public variables: Map<String, Simbolo>;
    public funciones: Map<string, FuncionInstruccion>;
    public vectores: Map<String, Vector>;

    constructor(public anterior: Entorno | null) {
        this.variables = new Map();
        this.funciones = new Map();
        this.vectores = new Map();
    }

    public guardar(id: string, valor: any, tipo: Tipo): void {
        let env : Entorno | null = this;
        while(env != null){
            if(env.variables.has(id)){
                env.variables.set(id, new Simbolo(valor, id, tipo));
                return;
            }
            env = env.anterior;
        }
        this.variables.set(id, new Simbolo(valor, id, tipo));
    }

    public guardarFuncion(id: string, funcion: FuncionInstruccion): void {
        this.funciones.set(id, funcion);
    }

    public guardarVector(id: string, vector: Vector): void {
        
    }

    public getVar(id: string) : Simbolo | undefined | null{
        let env : Entorno | null = this;
        while(env != null){
            if(env.variables.has(id)){
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    }   

    public getFuncion(id: string) : FuncionInstruccion | undefined{
        let env : Entorno | null = this;
        while(env != null){
            if(env.funciones.has(id)){
                return env.funciones.get(id);
            }
            env = env.anterior;
        }
        return undefined;
    }

    public getGlobal() : Entorno{
        let env : Entorno | null = this;
        while(env?.anterior != null){
            env = env.anterior;
        }
        return env;
    }

}