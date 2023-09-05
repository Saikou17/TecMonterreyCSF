alfabeto = "abcdefghijklmnopqrstuvwxyz "

def cifrado(alfabeto, archivo, llave):
    resultado = ""
    contenido = archivo.read()  # Lee el contenido completo del archivo
    for letra in contenido:
        if letra in alfabeto:
            indice = alfabeto.index(letra)
            indice = (indice + llave) % len(alfabeto)
            resultado += alfabeto[indice]
        else:
            resultado += letra
    return resultado

def descifrado(alfabeto, archivo, llave):
    resultado = ""
    contenido = archivo.read()  # Lee el contenido completo del archivo
    for letra in contenido:
        if letra in alfabeto:
            indice = alfabeto.index(letra)
            indice = (indice - llave) % len(alfabeto)
            resultado += alfabeto[indice]
        else:
            resultado += letra
    return resultado


def main():
    
    llave = 10
    archivo = open("c:\\Tec\\TecMonterreyCSF\\Tarea Cifrado\\cipher1.txt", "r")
    texto_cifrado = cifrado(alfabeto, archivo, llave)
    archivo.close()
    
    archivo = open("c:\\Tec\\TecMonterreyCSF\\Tarea Cifrado\\cipher1.txt", "r")
    texto_descifrado = descifrado(alfabeto, archivo, llave)
    archivo.close()
    
    print("Texto cifrado:", texto_cifrado)
    print("Texto descifrado:", texto_descifrado)

if __name__ == "__main__":
    main()