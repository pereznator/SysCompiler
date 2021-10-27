%{
    const { Statement } = require('./instrucciones/statement');
    const { IfInstruccion } = require('./instrucciones/if-instruccion');
    const { ForInstruccion } = require('./instrucciones/for-instruccion');
    const { SwitchInstruccion } = require('./instrucciones/switch-instruccion');
    const { CaseInstruccion } = require('./instrucciones/case-instruccion');
    const { Llamada } = require('./instrucciones/llamada-instruccion');
    const { WriteLine } = require('./instrucciones/writeline');
    const { WhileInstruccion } = require('./instrucciones/while-instruccion');
    const { DoWhileInstruccion } = require('./instrucciones/do-while-instruccion');
    const { FuncionInstruccion } = require('./instrucciones/funcion-instruccion');
    const { MetodoInstruccion } = require('./instrucciones/declaracion-metodo');
    const { Declaracion } = require('./instrucciones/declaracion');
    const { Asignacion } = require('./instrucciones/asignacion');
    const { AsignacionMultiple } = require('./instrucciones/asignacion-multiple');
    const { Ternario } = require('./instrucciones/ternario');
    const { Casteo } = require('./instrucciones/casteo');
    const { DeclaracionVector } = require('./instrucciones/declaracion-vector');
    const { AsignacionVector } = require('./instrucciones/asignacion-vector');
    const { Actualizacion, OpcionActualizacion } = require('./instrucciones/actualizacion');
    const { DeclaracionMultiple } = require('./instrucciones/declaracion-multiple');
    const { DeclaracionDynamic } = require("./instrucciones/declaracion-dynamic");
    const { AppendInstruccion } = require("./instrucciones/append");
    const { SetValue } = require("./instrucciones/setValue");
    const { StartWith } = require("./instrucciones/startWith");

    const { Aritmetica, OperacionAritmetica } = require('./Expresiones/aritmetica');
    const { Relacional, OpcionRelacional } = require('./Expresiones/relacional');
    const { Literal } = require('./Expresiones/literal');
    const { Acceso } = require('./Expresiones/acceso');
    const { ExpresionLogica, OperadoresLogicos } = require('./Expresiones/logica');
    const { AccesoVector } = require("./Expresiones/acceso-vector");
    const { GetValue } = require("./Expresiones/getValue");
    const { ToLower } = require("./Expresiones/toLower");
    const { ToUpper } = require("./Expresiones/toUpper");
    const { Length } = require("./Expresiones/length");
    const { Truncate } = require("./Expresiones/truncate");
    const { Round } = require("./Expresiones/round");
    const { TypeOf } = require("./Expresiones/typeof");
    const { ToString } = require("./Expresiones/toString");
    const { ToCharArray } = require("./Expresiones/toCharArray");

    const { Tipo } = require('./abstractas/retorno');

    
    const { Error_ } = require('./Error/error');
    const { errores } = require('./Error/errores');
%}

%lex
%options case-insensitive
numero [0-9]+
decimal {numero}"."{numero}
cadena (\"[^"]*\")
caracter (\'[^']\')
id ([a-zA-Z_])[a-zA-Z0-9_ñÑ]*

%%
\s+         /* Ignorar espacios en blanco */

"int"       return "int"
"double"    return "double"
"boolean"   return "boolean"
"char"      return "char"
"string"    return "string"
"if"        return "if"
"else"      return "else"
"switch"    return "switch"
"case"      return "case"
"default"   return "default"
"break"     return "break"
"while"     return "while"
"for"       return "for"
"do"        return "do"
"continue"  return "continue"
"return"    return "return"
"void"      return "void"
"writeline" return "writeline"
"tolower"   return "tolower"
"toupper"   return "toupper"
"length"    return "length"
"truncate"  return "truncate"
"round"     return "round"
"typeof"    return "typeof"
"tostring"  return "tostring"
"tochararray"   return "tochararray"
"start"     return "start"
"with"      return "with"
"true"      return "true"
"false"     return "false"
"dynamiclist" return "dynamiclist"
"new"       return "new"
"append"    return "append"
"getvalue"  return "getvalue"
"setvalue"  return "setvalue"
"null"      return "null"
"{"         return "{"
"}"         return "}"
"("         return "("
")"         return ")"
"["         return "["
"]"         return "]"
"++"        return "++"
"+"         return "+"
"--"        return "--"
"-"         return "-"
"*"         return "*"
"/"         return "/"
"^"         return "^"
"%"         return "%"
"=="        return "=="
"!="        return "!="
"<="        return "<="
">="        return ">="
"<"         return "<"
">"         return ">"
"="         return "="
"?"         return "?"
"&&"        return "&&"
"||"        return "||"
"!"         return "!"
":"         return ":"
","         return ","
";"         return ";"
{decimal}   return "decimal"
{numero}    return "numero"
{id}        return "id"
{cadena}    return "cadena"
{caracter}  return "caracter"
<<EOF>>     return "EOF"
.           {console.log('[ERROR LEXICO]: ' + yytext + ', ' + yylloc.first_line + ', ' +  yylloc.column);
                errores.push(new Error_(yylloc.first_line, yylloc.column, 'Lexico', yytext));
            }

/lex

%left "||"
%left "&&"
%left '!'
%left ">=" "<=" '>' '<' "==" "!="
%left "+" "-"
%left "*" "/"
%left '^' '%'

%start INIT 

%%

INIT:
    INSTRUCCIONES EOF
    {
        return $1;
    }
;

INSTRUCCIONES:
    INSTRUCCIONES INSTRUCCION 
    {
        $1.push($2);
        $$ = $1;
    }
    | INSTRUCCION
    {
        $$ = [$1];
    }
;

INSTRUCCION:
    STRTWITH
    {
        $$ = $1;
    }
    | DECFUNCION
    {
        $$ = $1;
    }
    | DECMETODO
    {
        $$ = $1;
    }
;

STRTWITH:
    'start' 'with' LLAMADA
    {
        $$ = new StartWith($3, @1.first_line, @1.first_column);
    }
;

LLAMADA:
    id '(' ')' ';'
    {
        $$ = new Llamada($1, new Array(), @1.first_line, @1.first_column);
    }
    | id '(' LISTAEXPRESIONES ')' ';'
    {
        $$ = new Llamada($1, $3, @1.first_line, @1.first_column);
    }
;

LISTAEXPRESIONES:
    LISTAEXPRESIONES ',' EXPRESION
    {
        $1.push($3);
        $$ = $1;
    }
    | EXPRESION
    {
        $$ = [$1];
    }
;


DECFUNCION:
    TIPOSDATOS id '(' ')' STATEMENT
    {
        $$ = new FuncionInstruccion($2, $5, new Array(), $1, @1.first_line, @1.first_column);
    }
    | TIPOSDATOS id '(' DEFPARAMETROS ')' STATEMENT
    {
        $$ = new FuncionInstruccion($2, $6, $4, $1, @1.first_line, @1.first_column);
    }
;

DECMETODO:
    'void' id '(' ')' STATEMENT
    {
        $$ = new MetodoInstruccion($2, $5, null, @1.first_line, @1.first_column);
    }
    | 'void' id '(' DEFPARAMETROS ')' STATEMENT
    {
        $$ = new MetodoInstruccion($2, $6, $4, @1.first_line, @1.first_column);
    }
;

DEFPARAMETROS:
    DEFPARAMETROS ',' TIPOSDATOS id
    {
        $1.push(new Declaracion($3, $4, null, @1.first_line, @1.first_column));
        $$ = $1;
    }
    | TIPOSDATOS id
    {
        $$ = [new Declaracion($1, $2, null, @1.first_line, @1.first_column)];
    }
;


STATEMENT:
    '{' CONTENIDO '}'
    {
        $$ = new Statement($2, @1.first_line, @1.first_column);
    }
    | '{' '}'
    {
        $$ = new Statement(new Array(), @1.first_line, @1.first_column);
    }
;

CONTENIDO:
    CONTENIDO SEGMENTO
    {
        $1.push($2);
        $$ = $1;
    }
    |
    SEGMENTO
    {
        $$ = [$1];
    }
;

SEGMENTO: 
    INSIF
    | INSWHILE
    | LLAMADA
    | INSDECLARACION ';'
    | INSFOR
    | INSDOWHILE
    | INSWRITELINE
    | INSSWITCH
    | ASIGNACION ';'
    | ACTUALIZACION ';'
    | DECVECTOR
    | ASIGNACIONVECTOR
    | DECDYNAMICLIST
    | APPEND
    | SETVALUE
;

INSIF:
    'if' '(' EXPRESION ')' STATEMENT INSELSE
    {
        $$ = new IfInstruccion($3, $5, $6, @1.first_line, @1.first_column);
    }
;

INSELSE:
    'else' STATEMENT {
        $$ = $2;
    }
    | else INSIF {
        $$ = $2;
    }
    | /* epsilon */
    {
        $$ = null;
    }
;


INSWHILE:
    'while' '(' EXPRESION ')' STATEMENT
    {
        $$ = new WhileInstruccion($3, $5, @1.first_line, @1.first_column);
    }
;

INSDECLARACION:
    TIPOSDATOS id
    {
        $$ = new Declaracion($1, $2, null, @1.first_line, @1.first_column);
    }
    | TIPOSDATOS id ',' LISTAIDS
    {
        $4.push($2);
        $$ = new DeclaracionMultiple($1, $4, null, @1.first_line, @1.first_column);
    }
    | TIPOSDATOS id '=' EXPRESION
    {
        $$ = new Declaracion($1, $2, $4, @1.first_line, @1.first_column);
    }
    | TIPOSDATOS id '=' TERNARIO
    {
        $$ = new Declaracion($1, $2, $4, @1.first_line, @1.first_column);
    }
    | TIPOSDATOS id '=' CASTEO
    {
        $$ = new Declaracion($1, $2, $4, @1.first_line, @1.first_column);
    }
    | TIPOSDATOS id ',' LISTAIDS '=' EXPRESION
    {
        $4.push($2);
        $$ = new DeclaracionMultiple($1, $4, $6, @1.first_line, @1.first_column);
    }
    | TIPOSDATOS id ',' LISTAIDS '=' TERNARIO
    {
        $4.push($2);
        $$ = new DeclaracionMultiple($1, $4, $6, @1.first_line, @1.first_column);
    }
    | TIPOSDATOS id ',' LISTAIDS '=' CASTEO
    {
        $4.push($2);
        $$ = new DeclaracionMultiple($1, $4, $6, @1.first_line, @1.first_column);
    }
    | TIPOSDATOS id '=' LLAMADA
    {
        $$ = new Declaracion($1, $2, $4, @1.first_line, @1.first_column);
    }
    | TIPOSDATOS id ',' LISTAIDS '=' LLAMADA
    {
        $4.push($2);
        $$ = new DeclaracionMultiple($1, $4, $6, @1.first_line, @1.first_column);
    }
;

LISTAIDS:
    LISTAIDS ',' id
    {
        $1.push($3);
        $$ = $1;
    }
    | id
    {
        $$ = [$1];
    }
;

ASIGNACION:
    id '=' EXPRESION
    {
        $$ = new Asignacion(null, $1, $3, @1.first_line, @1.first_column);
    }
    | id '=' TERNARIO
    {
        $$ = new Asignacion(null, $1, $3, @1.first_line, @1.first_column);
    }
    | id '=' LLAMADA
    {
        $$ = new Asignacion(null, $1, $3, @1.first_line, @1.first_column);
    }
    | id '=' CASTEO
    {
        $$ = new Asignacion(null, $1, $3, @1.first_line, @1.first_column);
    }
    | id ',' LISTAIDS '=' EXPRESION
    {
        $3.push($1);
        $$ = new AsignacionMultiple($3, $5, @1.first_line, @1.first_column);
    }
    | id ',' LISTAIDS '=' TERNARIO
    {
        $3.push($1);
        $$ = new AsignacionMultiple($3, $5, @1.first_line, @1.first_column);
    }
    | id ',' LISTAIDS '=' LLAMADA
    {
        $3.push($1);
        $$ = new AsignacionMultiple($3, $5, @1.first_line, @1.first_column);
    }
    | id ',' LISTAIDS '=' CASTEO
    {
        $3.push($1);
        $$ = new AsignacionMultiple($3, $5, @1.first_line, @1.first_column);
    }
;

TERNARIO:
    EXPRESION '?' EXPRESION ':' EXPRESION
    {
        $$ = new Ternario($1, $3, $5, @1.first_line, @1.first_column);
    }
;

CASTEO:
    '(' TIPOSDATOS ')' EXPRESION
    {
        $$ = new Casteo($2, $4, @1.first_line, @1.first_column);
    }
;

DECVECTOR:
    TIPOSDATOS id '[' ']' '=' 'new' TIPOSDATOS '[' EXPRESION ']' ';'
    {
        $$ = new DeclaracionVector($1, $2, $9, null, @1.first_line, @1.first_column);
    }
    | TIPOSDATOS id '[' ']' '=' '{' LISTAEXPRESIONES '}' ';'
    {
        $$ = new DeclaracionVector($1, $2, null, $7, @1.first_line, @1.first_column);
    }
    | TIPOSDATOS id '[' ']' ';'
    {
        $$ = new DeclaracionVector($1, $2, null, null, @1.first_line, @1.first_column);
    }
;

ASIGNACIONVECTOR:
    id '[' EXPRESION ']' '=' EXPRESION ';'
    {
        $$ = new AsignacionVector($1, $3, $6, @1.first_line, @1.first_column);
    }
;

DECDYNAMICLIST:
    'dynamiclist' '<' TIPOSDATOS '>' id '=' 'new' 'dynamiclist' '<' TIPOSDATOS '>' ';'
    {
        $$ = new DeclaracionDynamic($3, $10, $5, null, @1.first_line, @1.first_column);
    }
    | 'dynamiclist' '<' TIPOSDATOS '>' id '=' EXPRESION ';'
    {
        $$ = new DeclaracionDynamic($3, null, $5, $7, @1.first_line, @1.first_column);
    }
;

APPEND:
    'append' '(' id ',' EXPRESION ')' ';'
    {
        $$ = new AppendInstruccion($3, $5, @1.first_line, @1.first_column);
    }
;

SETVALUE:
    'setvalue' '(' id ',' EXPRESION ',' EXPRESION ')' ';'
    {
        $$ = new SetValue($3, $5, $7, @1.first_line, @1.first_column);
    }
;

FORINICIO:
    INSDECLARACION
    {
        $$ = $1
    }
    | ASIGNACION
    {
        $$ = $1
    }
;

FORFINAL:
    ASIGNACION
    {
        $$ = $1;
    }
    | ACTUALIZACION
    {
        $$ = $1;
    }
;

INSFOR:
    'for' '(' FORINICIO ';' EXPRESION ';' FORFINAL ')' STATEMENT
    {
        $$ = new ForInstruccion($3, $5, $7, $9, @1.first_line, @1.first_column);
    }  
;

ACTUALIZACION:
    id '++'
    {
        $$ = new Actualizacion($1, OpcionActualizacion.MASMAS, @1.first_line, @1.first_column);
    }
    | id '--'
    {
        $$ = new Actualizacion($1, OpcionActualizacion.MENOSMENOS, @1.first_line, @1.first_column);
    }
;

INSDOWHILE:
    'do' STATEMENT 'while' '(' EXPRESION ')' ';'
    {
        $$ = new DoWhileInstruccion($5, $2, @1.first_line, @1.first_column);
    }
;

INSSWITCH:
    'switch' '(' EXPRESION ')' '{' INSCASES INSDEFAULT '}'
    {
        $$ = new SwitchInstruccion($3, $6, $7, @1.first_line, @1.first_column);
    }
;

INSCASES:
    INSCASES 'case' EXPRESION ':' CONTENIDO
    {
        $1.push(new CaseInstruccion($3, $5, @1.first_line, @1.first_column));
        $$ = $1;
    }
    | 'case' EXPRESION ':' CONTENIDO
    {
        $$ = [new CaseInstruccion($2, $4, @1.first_line, @1.first_column)];
    }
;

INSDEFAULT:
    'default' ':' CONTENIDO
    {
        $$ = new Statement($3, @1.first_line, @1.first_column);
    }
    |/* epsilon */
    {
        $$ = null;
    }
;

INSWRITELINE:
    'writeline' '(' EXPRESION ')' ';'
    {
        $$ = new WriteLine($3, @1.first_line, @1.first_column);
    }
;

EXPRESION:
    EXPRESION '+' EXPRESION
    {
        $$ = new Aritmetica($1, $3, OperacionAritmetica.SUMA, @1.first_line, @1.first_column);
    }
    | EXPRESION '-' EXPRESION
    {
        $$ = new Aritmetica($1, $3, OperacionAritmetica.RESTA, @1.first_line, @1.first_column);
    }
    | EXPRESION '*' EXPRESION
    {
        $$ = new Aritmetica($1, $3, OperacionAritmetica.MULTI, @1.first_line, @1.first_column);
    }
    | EXPRESION '/' EXPRESION
    {
        $$ = new Aritmetica($1, $3, OperacionAritmetica.DIV, @1.first_line, @1.first_column);
    }
    | EXPRESION '^' EXPRESION
    {
        $$ = new Aritmetica($1, $3, OperacionAritmetica.POT, @1.first_line, @1.first_column);
    }
    | EXPRESION '%' EXPRESION
    {
        $$ = new Aritmetica($1, $3, OperacionAritmetica.MOD, @1.first_line, @1.first_column);
    }
    | '-' EXPRESION
    {
        $$ = new Aritmetica(null, $2, OperacionAritmetica.NEG, @1.first_line, @1.first_column);
    }
    | EXPRESION '<' EXPRESION
    {
        $$ = new Relacional($1, $3, OpcionRelacional.MENOR, @1.first_line, @1.first_column);
    }
    | EXPRESION '<=' EXPRESION
    {
        $$ = new Relacional($1, $3, OpcionRelacional.MENORIGUAL, @1.first_line, @1.first_column);
    }
    | EXPRESION '>' EXPRESION
    {
        $$ = new Relacional($1, $3, OpcionRelacional.MAYOR, @1.first_line, @1.first_column);
    }
    | EXPRESION '>=' EXPRESION
    {
        $$ = new Relacional($1, $3, OpcionRelacional.MAYORIGUAL, @1.first_line, @1.first_column);
    }
    | EXPRESION '==' EXPRESION
    {
        $$ = new Relacional($1, $3, OpcionRelacional.IGUAL, @1.first_line, @1.first_column);
    }
    | EXPRESION '!=' EXPRESION
    {
        $$ = new Relacional($1, $3, OpcionRelacional.DESIGUAL, @1.first_line, @1.first_column);
    }
    | EXPRESION '&&' EXPRESION
    {
        $$ = new ExpresionLogica($1, $3, OperadoresLogicos.AND, @1.first_line, @1.first_column);
    }
    | EXPRESION '||' EXPRESION
    {
        $$ = new ExpresionLogica($1, $3, OperadoresLogicos.OR, @1.first_line, @1.first_column);
    }
    | '!' EXPRESION
    {
        $$ = new ExpresionLogica($2, null, OperadoresLogicos.NOT, @1.first_line, @1.first_column);
    }
    | VALOR
    {
        $$ = $1;
    }
;

VALOR:
    numero
    {
        $$ = new Literal($1, @1.first_line, @1.first_column, Tipo.INT);
    }
    | decimal
    {
        $$ = new Literal($1, @1.first_line, @1.first_column, Tipo.DOUBLE);
    }
    | cadena
    {
        $$ = new Literal($1, @1.first_line, @1.first_column, Tipo.STRING);
    }
    | caracter
    {
        $$ = new Literal($1, @1.first_line, @1.first_column, Tipo.CHAR);
    }
    | true
    {
        $$ = new Literal($1, @1.first_line, @1.first_column, Tipo.BOOLEAN);
    }
    | false
    {
        $$ = new Literal($1, @1.first_line, @1.first_column, Tipo.BOOLEAN);
    }
    | null
    {
        $$ = new Literal($1, @1.first_line, @1.first_column, null);
    }
    | id
    {
        $$ = new Acceso($1, @1.first_line, @1.first_column);
    }
    | id '[' EXPRESION ']'
    {
        $$ = new AccesoVector($1, $3, @1.first_line, @1.first_column);
    }
    | 'getvalue' '(' id ',' EXPRESION ')'
    {
        $$ = new GetValue($3, $5, @1.first_line, @1.first_column);
    }
    | 'tolower' '(' EXPRESION ')'
    {
        $$ = new ToLower($3, @1.first_line, @1.first_column);
    }
    | 'toupper' '(' EXPRESION ')'
    {
        $$ = new ToUpper($3, @1.first_line, @1.first_column);
    }
    | 'length' '(' EXPRESION ')'
    {
        $$ = new Length($3, @1.first_line, @1.first_column);
    }
    | 'truncate' '(' EXPRESION ')'
    {
        $$ = new Truncate($3, @1.first_line, @1.first_column);
    }
    | 'round' '(' EXPRESION ')'
    {
        $$ = new Round($3, @1.first_line, @1.first_column);
    }
    | 'typeof' '(' EXPRESION ')'
    {
        $$ = new TypeOf($3, @1.first_line, @1.first_column);
    }
    | 'tostring' '(' EXPRESION ')'
    {
        $$ = new ToString($3, @1.first_line, @1.first_column);
    }
    | 'tochararray' '(' EXPRESION ')'
    {
        $$ = new ToCharArray($3, @1.first_line, @1.first_column);
    }
    | '(' EXPRESION ')'
    {
        $$ = $2;
    }

;

TIPOSDATOS:
    'string'
    {
        $$ = Tipo.STRING;
    }
    | 'int'
    {
        $$ = Tipo.INT;
    }
    | 'double'
    {
        $$ = Tipo.DOUBLE;
    }
    | 'boolean'
    {
        $$ = Tipo.BOOLEAN;
    }
    | 'char'
    {
        $$ = Tipo.CHAR;
    }
;


