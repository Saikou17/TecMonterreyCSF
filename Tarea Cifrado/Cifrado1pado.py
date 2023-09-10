import random

alfabeto = "abcdefghijklmnopqrstuvwxyz "

def generar_clave(longitud):
    clave = [random.choice(alfabeto) for _ in range(longitud)]
    return ''.join(clave)

def cifrar(mensaje, clave):

    if len(mensaje) != len(clave):
        raise ValueError("La longitud del mensaje y la clave deben ser iguales")
    
    mensaje_cifrado = ""
    for i in range(len(mensaje)):
        mensaje_cifrado += alfabeto[(alfabeto.index(mensaje[i]) + alfabeto.index(clave[i])) % len(alfabeto)]
    
    return mensaje_cifrado

# Mensaje a cifrar
mensaje = "este es un mensaje secreto"

# Generar una clave aleatoria del mismo tamaño que el mensaje
clave = generar_clave(len(mensaje))

# Cifrar el mensaje
mensaje_cifrado = cifrar(mensaje, clave)

print("Mensaje original:", mensaje)
print("Clave generada:", clave)
print("Mensaje cifrado:", mensaje_cifrado)

