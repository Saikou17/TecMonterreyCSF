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

import random
alfabeto = "abcdefghijklmnopqrstuvwxyz "

""" El alfabeto que utilizamos en este ejercicio se encuentra en el idioma ingles, con la pequeña 
excepcion de que agregamos un espacio al final. Tomamos en cuenta que la letra a esta en el indice 0 y el espacio en el 26 """

"""Codigos de Algoritmos de Cifrado (Ceasar, Vigenere, One Time Pad)"""

""" Notas:

1. Los argumentos son : el archivo o mensaje a cifrar/descifrar, el alfabeto y la llave, la cual es un string o caracter
2. Revisar con ejemplos todos los algoritmos 
3. Se debe de utilizar un entrono de python (Gitbash, Powershell). Normalmente no funciona con la extension de runcode
4. Instalar y verificar que se tenga matplotlib para visualizar graficas 
5. El cifrado de cesar funciona en teroia bien
6. El descifrado de cesar aun no esta al 100% seguro, ya que la mitad del mensaje lo descifra y la otra no
7. Revisar ambos vigenere, ambos funcionan pero el resultado sufre la misma condicion que el punto pasado
8. revisar OTP 

"""

# Cifrado César
def Cifrado_Ceasar(alfabeto, llave):
    resultado = ""  # Variable donde guardamos el mensaje cifrado
    with open('./cipher0.txt') as prueba1:
        contenido = prueba1.readlines()
    for letra in contenido:  # Recorrer letra por letra del contenido
        if letra in alfabeto:  # Verifica si la letra está en nuestro alfabeto
            indice = alfabeto.index(letra)  # Variable que guarda la posición de la letra
            indice = (indice + alfabeto.index(llave)) % len(alfabeto)  # Aplicar cifrado César
            resultado += alfabeto[indice]  # Agregar la letra cifrada al resultado
        else:
            resultado += letra  # Si no está en el alfabeto, mantenerla igual
    print(resultado)
    return resultado

# Descifrado César
def Descifrado_Ceasar(alfabeto, llave):
    resultado = ""
    with open('./cipher1.txt') as prueba1:
        contenido = prueba1.readlines()
    # contenido = archivo.read()  # Lee el contenido completo del archivo
    # archivo.close()
    for letra in contenido[0]:
        if letra in alfabeto:
            indice = alfabeto.index(letra)
            indice = (indice - alfabeto.index(llave)) % len(alfabeto)  # Aplicar descifrado César
            resultado += alfabeto[indice]  # Agregar la letra descifrada al resultado
        else:
            resultado += letra  # Si no está en el alfabeto, mantenerla igual
    print(resultado)
    return resultado

# Cifrado Vigenère
def Cifrado_Vigenere(alfabeto,llave):
    resultado = ""  # Variable donde guardamos el mensaje cifrado
    with open('./cipher0.txt') as test1:
        mensaje= test1.readlines()
    # mensaje = archivo.read()
    # archivo.close()
    longitudLlave = 0  # Inicializamos un contador para la posición de la llave
    for letra in mensaje[0]:
        if longitudLlave == (len(llave) - 1) and letra in alfabeto:
            pos = alfabeto.index(letra)  # Obtener la posición de la letra en el alfabeto
            pos = (pos + alfabeto.index(llave[longitudLlave])) % (len(alfabeto))  # Aplicar cifrado Vigenère
            resultado += alfabeto[pos]  # Agregar la letra cifrada al resultado
            longitudLlave = -1  # Reiniciar la posición de la llave al llegar al final
        elif letra in alfabeto:
            pos = alfabeto.index(letra)
            pos = (pos + alfabeto.index(llave[longitudLlave])) % (len(alfabeto))  # Aplicar cifrado Vigenère
            resultado += alfabeto[pos]# Agregar la letra cifrada al resultado
        else:
            resultado += letra  # Si no está en el alfabeto, mantenerla igual
        longitudLlave += 1  # Avanzar a la siguiente letra de la llave

    print(resultado)
    return resultado

# Descifrado Vigenère
def Descifrado_Vigenere(alfabeto,llave):
    resultado = ""  # Variable donde guardamos el mensaje descifrado
    with open('./cipher2.txt') as test1:
        mensaje= test1.readlines()
    #mensaje = archivo.read()
    #archivo.close()
    longitudLlave = 0  # Inicializamos un contador para la posición de la llave
    for letra in mensaje[0]:
        if longitudLlave == (len(llave) - 1) and letra in alfabeto:
            pos = alfabeto.index(letra)  # Obtener la posición de la letra en el alfabeto
            pos = (pos - alfabeto.index(llave[longitudLlave])) % (len(alfabeto))  # Aplicar descifrado Vigenère
            resultado += alfabeto[pos]  # Agregar la letra descifrada al resultado
            longitudLlave = -1  # Reiniciar la posición de la llave al llegar al final
        elif letra in alfabeto:
            pos = alfabeto.index(letra)
            pos = (pos - alfabeto.index(llave[longitudLlave])) % (len(alfabeto))  # Aplicar descifrado Vigenère
            resultado += alfabeto[pos]  # Agregar la letra descifrada al resultado
        else:
            resultado += letra  # Si no está en el alfabeto, mantenerla igual
        longitudLlave += 1  # Avanzar a la siguiente letra de la llave

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
    
    return mensaje_cifrado
    
""" Codigos de analisis estadistico y fuerza bruta """

""" Notas:

1. El analisis de cesar indica a traves de una grafica que la letra mas repetida es la J indice 9, pero debe de ser la K indice 10
2. El analisi de virgenere indica a traves 

"""

def analisis_frecuencia_Ceasar():
    with open('./cipher1.txt') as prueba1:
        mensaje = prueba1.readlines()
    frecuencia_letra = {}
    for letra in mensaje[0]:
        if letra in frecuencia_letra:
            frecuencia_letra[letra] += 1
        else:
            frecuencia_letra[letra] = 1
    letras = list(frecuencia_letra.keys())
    frecuencia = list(frecuencia_letra.values())
    plt.bar(letras,frecuencia)
    plt.xlabel("Letras en el texto")
    plt.ylabel("Frecuencia de la letras")
    plt.title("Ataque estadistico")
    plt.show()
    #return llave

def analisis_frecuencia_Virgenere(longitudLlave):
    with open('./cipher2.txt') as prueba1:
        mensaje = prueba1.readlines()
    llaves = [{} for _ in range(longitudLlave)]
    grupo = 0
    for letra in mensaje[0]:
        print(grupo)
        if grupo == longitudLlave-1:
            if letra in llaves[grupo]:
                llaves[grupo][letra] += 1
            else:
                llaves[grupo][letra] = 1
            grupo = -1
        if letra in llaves[grupo]:
            llaves[grupo][letra] += 1
        else:
            llaves[grupo][letra] = 1
        grupo += 1
        
    for i, diccionario in enumerate(llaves):
        letras = list(diccionario.keys())
        frecuencia = list(diccionario.values())

        plt.bar(letras, frecuencia)
        plt.xlabel(f'Letras en el grupo {i}')
        plt.ylabel('Frecuencia de letras')
        plt.title(f'Análisis de frecuencia - Grupo {i}')
        plt.show()

""" Funcion Principal (Resultados) """

""" Notas:

1.Crear una funcion main, para que el usuario elija que algoritmo correr
2.Se deben de correr en la terminal
3.No se puede correr dos funciones al tiempo si utilizan el mismo archivo

"""

# archivo = open('cipher0.txt','r') #Archivo para cifrar
# archivo2 = open('cipher1.txt','r') #Archivo para descifrar con cesar (tarea)
# archivo3 = open('vigenere0.txt','r') #Archivo para cifrar 
# archivo4 = open('cipher2.txt','r') #Archivo para descrifrar con virgenere (tarea)
# archivo5 = open('vigenere2.txt','r') #Archivo para descifrar
# Cifrado_Ceasar(alfabeto,"h")
# Descifrado_Ceasar(alfabeto,"k")
#Cifrado_Vigenere(alfabeto,"./cipher0.txt","jp es gay")
#Descifrado_Vigenere(alfabeto,"hack")

#Mensaje a cifrar
# mensaje = "este es un mensaje secreto"
# # Generar una clave aleatoria del mismo tamaño que el mensaje
# clave = generar_clave_OTP(len(mensaje))
# # Cifrar el mensaje
# mensaje_cifrado = cifrar_OTP(mensaje, clave)

# print("Mensaje original:", mensaje)
# print("Clave generada:", clave)
# print("Mensaje cifrado:", mensaje_cifrado)

#analisis_frecuencia_Ceasar()
analisis_frecuencia_Virgenere(4)

