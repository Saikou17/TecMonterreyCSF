### EBNF del lenguaje Python

<u>EBNF</u>

        PROGRAMA ::= DECLARACION
        DECLARACIÓN ::= 'import' IDENTIFICADOR 
                    | 'def' IDENTIFICADOR '(' (PARAMETRO [(',' {PARAMETRO})]) ')' ':' BLOQUE
        IDENTIFICADOR ::= {LETRA (LETRA | DIGITO | '_')}
        PARAMETRO ::= IDENTIFICADOR
        BLOQUE ::= {DECLARACION}
        SENTENCIA ::= ASIGNACIÓN
                    | LLAMADA_FUNCIÓN
                    | EXPRESIÓN
        ASIGNACIÓN ::= IDENTIFICADOR '=' EXPRESIÓN
        LLAMADA_FUNCIÓN ::= IDENTIFICADOR '(' (EXPRESIÓN [(',' {EXPRESIÓN})]) ')'
        EXPRESIÓN ::= LITERAL
                | IDENTIFICADOR 
                | OPERADOR_BINARIO
                | LLAMADA FUNCIÓN
        LITERAL ::= ENTERO
                | FLOTANTE
                | CADENA
                | BOOLEANO
                | NULO
        ENTERO ::= [0-9]+
        FLOTANTE ::= [0-9]+ '.' [0-9]+
        CADENA :: '"' {CARACTER} '"'
        BOOLEANO ::= "True" | "False"
        NULO ::= "None"
        OPERADOR_BINARIO ::= "+" | "-" | "*" | "/" | "%" | "**"
                        | "==" | "!=" | "<" | ">" | "<=" | ">="
                        | "and" | "or"
                        | "in" | "not in"
                        | "is" | "is not"
        OPERADOR_UNARIO ::= "-" | "NOT"
        IDENTIFICADOR ::= LETRA {(LETRA | DIGITO | "_")}
        LETRA ::= {(A-Z | a-z)}
        DIGITO ::= {0-9}