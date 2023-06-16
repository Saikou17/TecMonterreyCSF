# Situacion Problema: Resaltador de Sitaxis

## Integrantes:
- Juan Pablo Cruz Rodriguez A01783208   
- Juan Pablo Moreno A01374091

## Situacion Problema:

1. Selecciona un lenguaje de programación que te resulte familiar (por ejemplo, C, C++, C#, Java, JavaScript, Python, Racket, etc.), y determina las categorías léxicas que tiene (por ejemplo, palabras reservadas, operadores, literales, comentarios, etc.)

Para nuestra solucion o creacion de un resaltador de sitaxis, decidimos elegir el lenguaje de programacion Python.

2. Define una descripción para cada una de las categorías léxicas (tipos de tokens) del lenguaje seleccionado. Puedes usar una máquina de estados o expresiones regulares.

El siguiente paso es analizar e identificar el sintaxis, al igual que el lexico del lenguaje. Clasificando cada uno de los tipo de tokens por categorias, para un mejor entendimiento de la semantica del lenguaje, lo cual nos permitira desarrollar un diagrama o maquina de estados para representar los diferentes resultados.

## Sintaxis:

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
      17. import
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
      31. len
      32. sys
      33. argv
      34. open
      35. as
      36. file
      37. read
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
   4.variables
   ~~~

## Maquina de estados y expresiones regulares (Python)

Una máquina de estados, también conocida como máquina de estados finitos o autómata finito, es un modelo matemático y conceptual utilizado para representar y controlar el comportamiento de un sistema que puede estar en diferentes estados en diferentes momentos.

Las expresiones de lenguajes regulares, también conocidas como expresiones regulares, son patrones de búsqueda y manipulación de texto que se utilizan en informática y procesamiento de texto. Las expresiones regulares son una secuencia de caracteres que define un conjunto de cadenas de texto posibles, lo que permite realizar operaciones de búsqueda, coincidencia, reemplazo y extracción de información en textos.

Ambas formaas nos ayudan a identificar el sintaxis, lexico y semantica de un lenguaje en especifico a traves de definicion de reglas,expresiones,conjuntossimbolos, etc. Utilizando la herramienta de expresione regulares, crearemos una serie de pasos para identificar las diferentes posibilidades que se prensetan en lenguaje de programacion Python:

1.Reglas Expresiones Regulares:

1. char: Identifica una caracter dentro del texto
2. char+: Identifica uno o mas caracteres
3. char?: Identifica de manera opcional el caracter
4. char*: Identifica cero mas caracteres de manera opcional
5. char.: Identifica los caracteres que van delante del anterior
6. \w: Identifica caracteres de texto
7. \s: Identifica los espacio
8. {}: Identifica los caracteres con n tamaño
9. []: Identifica los caracteres que estan dentro del arreglo
10. (): Crea un grupo
11. |: Significa or
12. ^char: Identifica al inicio de una linea
13. char$: Identifica el caracter al final de una linea

2.Expresiones Regulares Python:

1. palabras reservadas: 
   
         \b(import|def|if|len|sys|argv|with|open|as|file|read|print|elif|except|as|else|and|assert|break|class|contine|del|exec|finally|for|from|global|in|is|lambda|not|or|pass|raise|return|try|while|yield|open)\b

2. operadores aritmeticos:

         \B\+|\-|\*{1,2}|\/{1,2}|\%\B

3. operadores relacionales:

         \B\>=?|\<=?|\={1,2}|\!=\B

4. operadores bit a bit:
   
         \&|\||\^|\<+|>+|\~

5. operadores asignacion:

         (\+|\-|\*|\/+|\%|\*{1,2}|\<{1,2}|\>{1,2}|\&|\||\^)?\=

6. operadores logicos:

         \b(and|or|not)\b

7. datos numericos:
   
         \b(\d.(\d)*|\d)\b

8. datos booleanos:

         \b(True|False|None)\b

9. datos de cadenas:

         \".*| \'.*  
      
10. datos de estructura
    
         (\[.*\]|\(.*\)|\{.*\})

11. variables:

         ([a-zA-Z]+(\_|\d)*)

12. datos extra

         (\#.*|\s|\:)
<hr>

## Analisis de Algoritmo

### Primera parte: 

<i>Análisis de complejidad</i>

El tiempo de ejecución de los algoritmos depende del tamaño del archivo de entrada y del número de líneas en el archivo. En el análisis de complejidad previo, se estimó una complejidad de O(n + m + k + p), donde n es el tamaño del archivo, m es el número de líneas, k es la longitud total de los tokens generados y p es el tamaño de una línea promedio. Esta estimación se basa en la suposición de que las operaciones en cada línea tienen una complejidad de tiempo similar.

Para calcular la complejidad del algoritmo basada en el número de iteraciones, debemos considerar cuántas veces se ejecuta la función `do_tokens` en función del tamaño del archivo y el número de líneas. Dado que la función `do_tokens` se llama recursivamente para cada línea y en cada llamada se realizan múltiples operaciones, la complejidad de iteraciones podría ser aproximadamente O(m * t), donde m es el número de líneas y t es el número promedio de iteraciones en cada línea.

Al contrastar la complejidad de iteraciones con el tiempo estimado en el punto anterior, podemos observar que el tiempo de ejecución real puede variar según varios factores, como la eficiencia de las operaciones de expresiones regulares y la implementación específica del lenguaje. En algunos casos, el tiempo de ejecución real puede ser mayor o menor que el tiempo estimado. Es importante realizar pruebas y análisis de rendimiento en casos reales para obtener una idea más precisa del tiempo de ejecución en situaciones específicas.

<i>Pruebas de tiempo </i>

      iex(1)> Syntax_Highlighter.read_file("Lexico_Python.py", "prueba1.html")  
      Execution time: 29491 microseconds
      :ok
      iex(2)> Syntax_Highlighter.read_file("Lexico_Python2.py", "prueba2.html")
      Execution time: 19865 microseconds
      :ok
      iex(3)> Syntax_Highlighter.read_file("Lexico_Python3.py", "prueba3.html") 
      Execution time: 19558 microseconds
      :ok


Como podemos ver en la ejecución de arriba se muestra el tiempo de ejecucion de los algoritmos en diferentes archivos de texto, donde se puede observar que el tiempo de ejecucion es muy similar en cada uno de los archivos, por lo que se puede decir que el tiempo de ejecucion es constante. 

Pero además se puede observar que el tiempo de ejecucion es muy similar al tiempo de ejecucion estimado en el analisis de complejidad, por lo que se puede decir que el tiempo de ejecucion es lineal. Cada uno de nuestros resultados no pasa más alla de 30000 micro segundos, y como le mencionamos antes esto prueba que nuestra complejidad es constante. Finalmente sumamos estos valores que nos da en total 68,914 microsegundo este número lo compararemos con el tiempo de ejecucion de la segunda parte. Que esta utilizando un alogoritmo en paralelo. 
### Segunda parte: 

<i>Análisis de complejidad</i>

Para poder realizar el análisis de complejidad de la segunda parte, debemos considerar las funciones principales del programa, que son`concur_file`, `read_file` y `do_tokens`.La función `concur_file` recibe una lista de archivos y realiza operaciones en cada uno de ellos. Su complejidad está determinada por la cantidad de archivos en la lista, por lo que podemos decir que su complejidad es lineal, es decir, O(n), donde n es la cantidad de archivos.La función `read_file` lee un archivo y realiza varias operaciones en él. Su complejidad depende principalmente del número de líneas en el archivo, por lo que podemos considerarla lineal, O(m), donde m es el número de líneas.

La función `do_tokens` procesa una línea de texto y realiza operaciones basadas en expresiones regulares. Su complejidad depende del número de expresiones regulares y del tamaño de la línea de texto, lo que nos lleva a una complejidad de O(k * p), donde k es el número de expresiones regulares y p es el tamaño de la línea. En resumen, la complejidad total del programa está determinada por la función `concur_file`, que tiene una complejidad lineal O(n) en función de la cantidad de archivos. Aunque existen funciones internas con complejidad lineal y basada en expresiones regulares, su impacto en la complejidad total es menor en comparación con la función principal.

<i>Pruebas de tiempo </i>

      iex(1)> Syntax_Highlighter.concur_file([{"Lexico_Python.py","Prueba.html"}, {"Lexico_Python2.py","Prueba2.html"}, {"Lexico_Python3.py","Prueba3.html"}]) 
      Execution time: 41062 microseconds
      ok
      ok
      ok
      :ok

Como podemos observar en la ejución de arriba se muestra el tiempo de ejecucion de los algoritmos en diferentes archivos de texto de manera paralela. Podemos observar que el tiempo de ejecucion es de 41,062 microsegundos y como mencionamos antes el tiempo de ejecucion de la primera parte es de 68,914 microsegundos. Por lo que podemos decir que el tiempo de ejecucion de la segunda parte es menor que el tiempo de ejecucion de la primera parte.  

## Reflexión

Con la infromación que hemos desarrollados se puede observar una comparación entre los tiempos de ejecución de dos partes de un programa. En el primer parte, se menciona que el tiempo de ejecución de la primera parte es constante y lineal, ya que los resultados obtenidos no superan los 30000 microsegundos. Se suma un total de 68,914 microsegundos.

En la segundo parte, se muestra el tiempo de ejecución que es de 41,062 microsegundos. La conclusión que se puede extraer de estos datos es que el tiempo de ejecución de la segunda parte es menor que el de la primera parte, lo que sugiere una mejora en la eficiencia del algoritmo o el uso de técnicas de paralelización que permiten realizar tareas simultáneamente.

Esta diferencia en los tiempos de ejecución puede ser significativa, ya que indica que la segunda parte se ejecuta más rápidamente en comparación con la primera parte. Esto puede deberse a diversos factores, como la optimización del código, el uso de recursos paralelos o la mejora en la implementación de los algoritmos.

En general, esta comparación de tiempos de ejecución resalta la importancia de evaluar y optimizar el rendimiento de los programas. Al reducir los tiempos de ejecución, se puede mejorar la eficiencia y la experiencia del usuario al interactuar con los programas, especialmente en aplicaciones que manejan grandes volúmenes de datos o requieren cálculos complejos.