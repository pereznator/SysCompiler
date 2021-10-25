import { FuncionInstruccion } from '../instrucciones/funcion-instruccion';
import { Simbolo } from './simbolo';
import { Tipo } from '../abstractas/retorno';
import { Vector } from './vector';
import { DynamicList } from './dynamicList';
import { MetodoInstruccion } from '../instrucciones/declaracion-metodo';


export class Entorno {

    public variables: Map<String, Simbolo>;
    public funciones: Map<string, FuncionInstruccion | MetodoInstruccion>;
    public vectores: Map<String, Vector>;
    public dynamicLists: Map<String, DynamicList>;

    constructor(public anterior: Entorno | null) {
        this.variables = new Map();
        this.funciones = new Map();
        this.vectores = new Map();
        this.dynamicLists = new Map();
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

    public guardarFuncion(id: string, funcion: FuncionInstruccion | MetodoInstruccion): void {
        this.funciones.set(id, funcion);
    }

    public guardarVector(id: string, vector: Vector): void {
        let env: Entorno | null = this;
        while(env != null) {
            if (env.vectores.has(id)) {
                env.vectores.set(id, vector);
                return;
            }
            env = env.anterior;
        }
        this.vectores.set(id, vector);
    }

    public guardarDynamicList(id: string, dynamicList: DynamicList): void {
        let env: Entorno | null = this;
        while(env != null) {
            if (env.dynamicLists.has(id)) {
                env.dynamicLists.set(id, dynamicList);
                return;
            }
            env = env.anterior;
        }
        this.dynamicLists.set(id, dynamicList);
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

    public getFuncion(id: string) : FuncionInstruccion | MetodoInstruccion | undefined{
        let env : Entorno | null = this;
        while(env != null){
            if(env.funciones.has(id)){
                return env.funciones.get(id);
            }
            env = env.anterior;
        }
        return undefined;
    }

    public getVector(id: string) : Vector | undefined {
        let env : Entorno | null = this;
        while(env != null){
            if(env.vectores.has(id)){
                return env.vectores.get(id);
            }
            env = env.anterior;
        }
        return undefined;
    }
    
    public getDynamicList(id: string) : DynamicList | undefined {
        let env : Entorno | null = this;
        while(env != null){
            if(env.dynamicLists.has(id)){
                return env.dynamicLists.get(id);
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