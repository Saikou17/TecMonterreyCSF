alfabeto = "abcdefghijklmnopqrstuvwxyz "

#COdigos de Algoritmos de Cifrado (Ceasar, Vigenere, One Time Pad)

def Cifrado_Ceasar(alfabeto, archivo, llave): #Funcion que recibe un alfabeto , un archivo y una llave
    resultado = "" # Variable donde guardamos el mensaje cifrado
    contenido = archivo.read()  # Lee el contenido completo del archivo
    archivo.close()
    for letra in contenido: #Recorrer letra por letra del contenido
        if letra in alfabeto: #Verifica si la letra esta en nuestro alfabeto
            indice = alfabeto.index(letra) #Variable que guarda la posicion de la letra
            indice = (indice + llave) % len(alfabeto) 
            resultado += alfabeto[indice]
        else:
            resultado += letra
    print(resultado)
    return resultado

def Descifrado_Ceasar(alfabeto, archivo, llave):
    resultado = ""
    contenido = archivo.read()  # Lee el contenido completo del archivo
    archivo.close()
    for letra in contenido:
        if letra in alfabeto:
            indice = alfabeto.index(letra)
            indice = (indice - llave) % len(alfabeto)
            resultado += alfabeto[indice]
        else:
            resultado += letra
    print(resultado)
    return resultado

def Cifrado_Vigenere(alfabeto,archivo,llave):
    resultado=""
    mensaje = archivo.read()
    archivo.close()
    #Realizamos que la llave concuerde con la longitud del mensaje a cifrar
    longitudLlave = 0
    for letra in mensaje:
        if longitudLlave == len(llave) and letra in alfabeto:
            pos = alfabeto.index(letra)
            pos = (pos + alfabeto.index(llave[longitudLlave])) % len(alfabeto)
            resultado += alfabeto[pos]
            longitudLlave = 0
        elif letra in alfabeto:
            pos = alfabeto.index(letra)
            pos = (pos + alfabeto.index(llave[longitudLlave])) % len(alfabeto)
            resultado += alfabeto[pos]
        else:
            resultado += letra
        longitudLlave += 1
    print(resultado)
    return resultado

            


# archivo = open('cipher0.txt','r')
# archivo2 = open('cipher1.txt','r')
archivo3 = open('vigenere0.txt','r')
# archivo4 = open('vigenere1.txt','r')
# Cifrado_Ceasar(alfabeto,archivo,8)
# Descifrado_Ceasar(alfabeto,archivo2,10)
Cifrado_Vigenere(alfabeto,archivo3,"pera")

# def main():
    
#     llave = 10
#     archivo = open('cipher0.txt', "r")
#     texto_cifrado = Cifrado_Ceasarifrado(alfabeto, archivo, llave)
    
#     archivo = open("cipher1.txt", "r")
#     texto_descifrado = Descifrado_Ceasar(alfabeto, archivo, llave)
    
#     print("Texto cifrado:", texto_cifrado)
#     print("Texto descifrado:", texto_descifrado)

# if __name__ == "__main__":
#     main()
def analisis_frecuencia(alfabeto, archivo):
    letra_mas_comun = " "
    frecuencia_letra = {}
    
    for letra in archivo:
        if letra in frecuencia_letra:
            frecuencia_letra[letra] += 1
        else:
            frecuencia_letra[letra] = 1
    
    posicion =  alfabeto.index(letra_mas_comun)
    llave = posicion - alfabeto.index(" ") - posicion
    
    return llave

def main():
    archivo = open("c:\\Tec\\TecMonterreyCSF\\Tarea Cifrado\\cipher1.txt", "r")
    llave = analisis_frecuencia(alfabeto, archivo)
    archivo.close()

    archivo = open("c:\\Tec\\TecMonterreyCSF\\Tarea Cifrado\\cipher1.txt", "r")
    contenido = archivo.read()
    archivo.close()
    
    texto_cifrado = cifrado(alfabeto, contenido, llave)
    texto_descifrado = descifrado(alfabeto, contenido, llave)
    
    print("Texto cifrado:", texto_cifrado)
    print("Texto descifrado:", texto_descifrado)
    print("Llave:", llave)

if __name__ == "__main__":
    main()
