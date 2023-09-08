alfabeto = "abcdefghijklmnopqrstuvwxyz "

def cifrado(alfabeto, contenido, llave):
    resultado = ""
    for letra in contenido:
        if letra in alfabeto:
            indice = alfabeto.index(letra)
            indice = (indice + llave) % len(alfabeto)
            resultado += alfabeto[indice]
        else:
            resultado += letra
    return resultado

def descifrado(alfabeto, contenido, llave):
    resultado = ""
    for letra in contenido:
        if letra in alfabeto:
            indice = alfabeto.index(letra)
            indice = (indice - llave) % len(alfabeto)
            resultado += alfabeto[indice]
        else:
            resultado += letra
    return resultado

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
