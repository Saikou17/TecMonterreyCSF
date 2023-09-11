""" Actividad Criptografia y Criptologia 

Juan Pablo Cruz Rodriguez A01783208
Juan Pablo Moreno Robles Arenas A01374091 

Instrucciones:

1. Implementar cifrado y descifrado de cesar
2. Implementar cifrado y descifrado de vigenere
3. Implementar one time pad
4. Descifrar archivo cipher1.txt con cesar
5. Descifrar archico cipher2.txt con virgenere """

import matplotlib.pyplot as plt #Importamos librerias necesarias
from collections import Counter #Importamos librerias necesarias
import numpy as np

import random
alfabeto = "abcdefghijklmnopqrstuvwxyz " #Alfabeto para nuestras funciones 

""" El alfabeto que utilizamos en este ejercicio se encuentra en el idioma ingles, con la pequeña 
excepcion de que agregamos un espacio al final. Tomamos en cuenta que la letra a esta en el indice 0 y el espacio en el 26 """

"""Codigos de Algoritmos de Cifrado (Ceasar, Vigenere, One Time Pad)"""

# Cifrado César
def Cifrado_Ceasar(alfabeto,mensaje,llave):
    resultado = ""  # Variable donde guardamos el mensaje cifrado
    for letra in mensaje:  # Recorrer letra por letra del contenido
        if letra in alfabeto:  # Verifica si la letra está en nuestro alfabeto
            indice = (alfabeto.index(letra) + alfabeto.index(llave)) % len(alfabeto)  # Aplicar cifrado César
            resultado += alfabeto[indice]  # Agregar la letra cifrada al resultado
        else:
            resultado += letra  # Si no está en el alfabeto, mantenerla igual
    print(resultado)
    return resultado

# Descifrado César
def Descifrado_Ceasar(alfabeto, llave):
    resultado = "" #Variable donde guardamos nuestro resultado
    with open('./cipher1.txt') as prueba1: #Abrimos nuestro archivo
        contenido = prueba1.readlines() #Guardamos la lectura en una variable
    for letra in contenido[0]: #Recorremos caracter por caracter de nuestro contenido
        if letra in alfabeto:
            indice = (alfabeto.index(letra)- alfabeto.index(llave)) % len(alfabeto)  # Aplicar descifrado César
            resultado += alfabeto[indice]  # Agregar la letra descifrada al resultado
        else:
            resultado += letra  # Si no está en el alfabeto, mantenerla igual
    print(resultado)
    return resultado

# Cifrado Vigenère
def Cifrado_Vigenere(alfabeto,mensaje,llave):
    resultado = ""  # Variable donde guardamos el mensaje cifrado
    longitudLlave = 0  # Inicializamos un contador para la posición de la llave
    for letra in mensaje: #Recorremos caracter por caracter de nuestro contenido
        if letra in alfabeto: #Observamos si la letra esta en nuestro alfabeto
            pos = (alfabeto.index(letra) + alfabeto.index(llave[longitudLlave])) % len(alfabeto)  # Aplicar cifrado Vigenère
            resultado += alfabeto[pos]  # Agregar la letra cifrada al resultado
            longitudLlave = (longitudLlave + 1) % len(llave)  # Reiniciar la posición de la llave al llegar al final
        else:
            resultado += letra  # Si no está en el alfabeto, mantenerla igual
    print(resultado)
    return resultado

# Descifrado Vigenère
def Descifrado_Vigenere(alfabeto,llave):
    resultado = ""  # Variable donde guardamos el mensaje descifrado
    with open('./cipher2.txt') as prueba: #Abrimos nuestro archivo 
        contenido = prueba.readlines() #Leemos nuestro archivo
    longitudLlave = 0  # Inicializamos un contador para la posición de la llave
    for letra in contenido[0]: #Recorremos el mensaje
        if letra in alfabeto:
            pos = (alfabeto.index(letra) - alfabeto.index(llave[longitudLlave])) % len(alfabeto)  # Aplicar descifrado Vigenère
            resultado += alfabeto[pos]  # Agregar la letra descifrada al resultado
            longitudLlave = (longitudLlave + 1) % len(llave)  # Reiniciar la posición de la llave al llegar al final
        else:
            resultado += letra  # Si no está en el alfabeto, mantenerla igual
    print(resultado)
    return resultado

#Generar clave OTP
def generar_clave_OTP(longitud):
    clave = [random.choice(alfabeto) for _ in range(longitud)]
    return ''.join(clave)

#Cifrado OTP
def cifrar_OTP(mensaje, clave):
    if len(mensaje) != len(clave):
        raise ValueError("La longitud del mensaje y la clave deben ser iguales")
    mensaje_cifrado = ""
    for i in range(len(mensaje)):
        mensaje_cifrado += alfabeto[(alfabeto.index(mensaje[i]) + alfabeto.index(clave[i])) % len(alfabeto)]
    print(mensaje_cifrado)
    return mensaje_cifrado
    
""" Codigos de analisis estadistico y fuerza bruta """

def analisis_frecuencia_Ceasar():
    with open('./cipher1.txt') as prueba1:
        mensaje = prueba1.readlines()
    frecuencia_letra = Counter(mensaje[0])
    letras = list(frecuencia_letra.keys())
    frecuencia = list(frecuencia_letra.values())
    plt.bar(letras,frecuencia)
    plt.xlabel("Letras en el texto")
    plt.ylabel("Frecuencia de la letras")
    plt.title("Ataque estadistico Cesar")
    plt.show()

def analisis_frecuencia_Virgenere(longitudLlave):
    with open('./cipher2.txt') as prueba1:
        mensaje = prueba1.read()
    llaves = [Counter() for _ in range(longitudLlave)]
    for i, letra in enumerate(mensaje):
        grupo = i % longitudLlave
        llaves[grupo][letra] += 1
    for i, diccionario in enumerate(llaves):
        letras, frecuencia = zip(*diccionario.items())
        x = np.arange(len(letras))
        plt.bar(x, frecuencia)
        plt.xticks(x, letras)
        plt.xlabel(f'Letras en el grupo {i}')
        plt.ylabel('Frecuencia de letras')
        plt.title(f'Análisis de frecuencia - Grupo {i}')
        plt.show()

""" Funcion Principal (Resultados) """

def main():
    print("Bienvenido a nuestra tarea.\nElija una de las siguientes opciones: ")
    print("1. Cifrado de Cesar\n")
    print("2. Descifrado de Cesar\n")
    print("3. Cifrado de Vigenere\n")
    print("4. Descifrado de Vigenere\n")
    print("5. Cifrado One-Time-Pad")
    opcion = int(input("Ingrese el numero de la opcion: "))
    if opcion == 1:
        mensaje = input("Ingresa un mensaje que desees cifrar:")
        llave = input("Ingresa la llave con la que deseas cifrar(Debe de ser una letra):")
        Cifrado_Ceasar(alfabeto,mensaje,llave)
    elif opcion == 2:
        print("A continuacion se observa el descifrado de Cesar en un archivo de pruebas: \n")
        print("Lo primero que realizamos fue un analisis estadistico:\n")
        analisis_frecuencia_Ceasar()
        """ Al realizar el ataque estadistico, nos fijamos en la letra que mas se repite y realizamos una investigacion sobre el
        porcentaje de la letra mas utilizada en mensaje largos o parrafos en el lenguaje ingles. Con estos datos nos dimos cuenta que
        la letra o caracter que mas se repite es el espacio. Por lo tanto a partir de esta informacion; la letra que le sigue al caracter 
        de espacio es la llave con la que se cifro el mensaje."""
        print("Finalmente observamos el mensaje descifrado:\n")
        Descifrado_Ceasar(alfabeto,'k')
    elif opcion == 3:
        mensaje = input("Ingresa un mensaje que deseas cifrar:")
        llave = input("Ingresa la llave con la que deseas cifrar:")
        Cifrado_Vigenere(alfabeto,mensaje,llave)
    elif opcion == 4:
        print("A continuacion se observa el descifrado de Vigenere en un archivo de pruebas: \n")
        print("Lo primero que realizamos fue un analisis estadistico:\n")
        analisis_frecuencia_Virgenere(4)
        """Al igual comorealizamos en Cesar, aplicamos la misma regla y procedimiento en cada uno de los grupos que formaba cada caracter de 
        la llave. Utilizamos las graficas para obtener la letra que le pertenece al caracter espacio, para luego observar que una de las letras
        de la llave era aquella que le seguia al espacio. Tambien, utilizamos la pista que el profesor nos indico al comentar que la llave
        era de longitud 4"""
        print("Finalmente observamos el mensaje descifrado:\n")
        Descifrado_Vigenere(alfabeto,'hack')
    elif opcion == 5:
        mensaje = input("Ingresa un mensaje que deseas cifrar:")
        llave = generar_clave_OTP(len(mensaje))
        print("La llave es:",llave)
        cifrar_OTP(mensaje,llave)
    else:
        print("Opcion Incorrecta")
        
if __name__ == "__main__":
    main()
