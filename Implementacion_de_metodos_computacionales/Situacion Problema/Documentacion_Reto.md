# Situacion Problema: Resaltador de Sitaxis

## Integrantes:
- Juan Pablo Cruz Rodriguez A01783208   
- Juan Pablo Moreno 

## Situacion Problema:

1. Selecciona un lenguaje de programación que te resulte familiar (por ejemplo, C, C++, C#, Java, JavaScript, Python, Racket, etc.), y determina las categorías léxicas que tiene (por ejemplo, palabras reservadas, operadores, literales, comentarios, etc.)

Para nuestra solucion o creacion de un resaltador de sitaxis, decidimos elegir el lenguaje de programacion Python.

2. Define una descripción para cada una de las categorías léxicas (tipos de tokens) del lenguaje seleccionado. Puedes usar una máquina de estados o expresiones regulares.

El siguiente paso es analizar e identificar el sintaxis, al igual que el lexico del lenguaje. Clasificando cada uno de los tipo de tokens por categorias, para un mejor entendimiento de la semantica del lenguaje, lo cual nos permitira desarrollar un diagrama o maquina de estados para representar los diferentes resultados.

###### Sintaxis:

1. Palabras Reservadas: 

~~~
      1. and
      2. assert
      3. break 
      4. class
      5. continue
      6. def
      7. del 
      8. elif 
      9. else 
      10. except
      11. exec
      12. finally
      13. for
      14. from
      15. global
      16. if
      17. imoort
      18. in
      19. is
      20. lambda
      21. not
      22. or
      23. pass
      24. print
      25. raise
      26. return
      27. try
      28. while
      29. with
      30. yield
~~~

2. Operadores:
   
   1. Operadores Aritmeticos
   ~~~
   1. +
   2. -
   3. *
   4. /
   5. %
   6. **
   7. //
   ~~~
   2. Operadores Relacionales
   ~~~
   1.>
   2.<
   3.==
   4.>=
   5.<=
   6.!=
   ~~~
   3.Operadores Bit a Bit
   ~~~
   1.&
   2.|
   3.^
   4.~
   5.>>
   6.<<
   ~~~
   4.Operadores de Asignacion
   ~~~
   1.=
   2.+=
   3.-=
   4.*=
   5./=
   6.%=
   7.**=
   8.//=
   9.&=
   10.|=
   11.^=
   12.<<=
   13.>>=
   ~~~
   5.Operadores Logicos
   ~~~
   1.and
   2.or
   3.not
   ~~~

3.Tipos de Datos:
   1. Numeros
   ~~~
   1.int
   2.float
   ~~~
   2. Booleano
   ~~~
   1.true
   2.false
   3.none
   ~~~
   3. Cadena
   ~~~
   1.str
   ~~~
   4. Estructuras
   ~~~
   1.listas
   2.tuplas
   3.conjuntos
   4.diccionarios
   ~~~
   5. Otros tipos
   ~~~
   1.espacios
   2.parentesis
   3.comentarios
   ~~~

###### Maquina de estados y expresiones regulares (Python)

Una máquina de estados, también conocida como máquina de estados finitos o autómata finito, es un modelo matemático y conceptual utilizado para representar y controlar el comportamiento de un sistema que puede estar en diferentes estados en diferentes momentos.

Las expresiones de lenguajes regulares, también conocidas como expresiones regulares, son patrones de búsqueda y manipulación de texto que se utilizan en informática y procesamiento de texto. Las expresiones regulares son una secuencia de caracteres que define un conjunto de cadenas de texto posibles, lo que permite realizar operaciones de búsqueda, coincidencia, reemplazo y extracción de información en textos.

Ambas formaas nos ayudan a identificar el sintaxis, lexico y semantica de un lenguaje en especifico a traves de definicion de reglas,expresiones,conjuntossimbolos, etc. Utilizando estas herramientas, crearemos un diagrama y una serie de pasos para identificar las diferentes posibilidades que se prensetan en lenguaje de programacion Python:

1. Maquina de estados


2. Expresion de lenguaje regular

