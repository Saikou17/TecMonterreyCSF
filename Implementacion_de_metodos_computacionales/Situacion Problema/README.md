## Situacion Problema: Resaltador de Syntax Pt1

Esta carpeta contiene los archivos y codigo necesario para crear un archivo HTML a partir de un archivo del lenguaje de programacion Python. 

El programa principal en esta carpeta **Syntax_Highlighter2.exs** fue realizado a partir del lenguaje de programacion funcional Elixir. 

## Instrucciones para ejecutar el programa

### **Instalacion Elixir:**

Debemos de intalar Elixir para poder correr el archivo .exs.
A continución adjunto un link de como instalar elixir en tu equipo : [Instrucciones Instalacion](https://elixir-lang.org/install.html)

### **Instalacion Repositorio:**

Instala o clona este repositorio en tu maquina de manera local:

    1. Utiliza el siguiente SSH: git@github.com:Saikou17/TecMonterreyCSF.git

    2. Utiliza el siguiente HTTP: https://github.com/Saikou17/TecMonterreyCSF.git

### **Ejecucion:**

A continuacion observaras una serie de archivos. La mayoria fueron utilizados para la implementacion del codigo.

Los archivos que son de importancia son:

    1. Syntax_Highlighter2.exs
    2. Documentacion_Reto.md
    3. Lexico_Python.py
    4. prueba.html
   
**Pasos:**

    1.Abre el archivo Syntax_Highlighter2.exs

    2.Abre una nueva terminal.

    3.Verifica que te encuentres dentro de la carpeta que contiene los archivos desde la terminal

    4.En la termianl entra en el modulo o archivo exs con el siguiente comando: iex Syntax_Highlighter2

    5.Una vez adentro del archivo y de elixir, utiliza el siguiente comando para correr el programa: Syntax_Highlighter2.read_file("ArchivoPython.py","ArchivoHtml.html)

    6. ArchivoPython.py es cualquier archivo de python que quieras convertir a cualquier archivo html.

    7.Verifica que el archivo de python se que quieras analizar se encuentre en la carpeta de Situacion Problema.

    8.Si todo salio correcto, debera de aparecer un archivo html dentro de la carpeta con el syntax de python identificado y resaltado.