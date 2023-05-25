### EBNF del lenguaje Python

<u>EBNF</u>

        PROGRAMA ::= DECLARACION
        DECLARACIÓN ::= 'import' IDENTIFICADOR 
                    | 'def' IDENTIFICADOR '(' (PARAMETRO (',' PARAMETRO)*)? ')' ':' BLOQUE
        IDENTIFICADOR ::= {LETRA (LETRA | DIGITO | '_')}
        PARAMETRO ::= IDENTIFICADOR
        BLOQUE ::= {DECLARACION}*
        SENTENCIA ::= ASIGNACIÓN
                    | LLAMADA_FUNCIÓN
                    | EXPRESIÓN
        ASIGNACIÓN ::= IDENTIFICADOR '=' EXPRESIÓN

