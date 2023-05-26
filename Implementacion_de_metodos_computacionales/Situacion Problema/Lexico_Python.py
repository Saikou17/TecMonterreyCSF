# Ejemplo de palabras reservadas
if True:
    print("Esta es una palabra reservada: if")

# Ejemplo de identificadores
mi_variable = 42
print("El valor de mi_variable es:", mi_variable)

# Ejemplo de literales
entero = 10
flotante = 3.14
cadena = "Hola, mundo!"
booleano = True
nulo = None

# Ejemplo de operadores
a = 5
b = 2

suma = a + b
resta = a - b
multiplicacion = a * b
division = a / b
modulo = a % b
potencia = a ** b

print("Suma:", suma)
print("Resta:", resta)
print("Multiplicación:", multiplicacion)
print("División:", division)
print("Módulo:", modulo)
print("Potencia:", potencia)

# Ejemplo de separadores
lista = [1, 2, 3]
diccionario = {"clave": "valor"}

# Ejemplo de comentarios
# Este es un comentario de una sola línea

'''
Este es un comentario
multilinea
'''

"""
Este también es un comentario
multilinea
"""

# Ejemplo de otras construcciones léxicas
import math

pi = math.pi
print("El valor de pi es:", pi)


# Ejemplo de declaraciones de funciones
def saludar(nombre):
    print("¡Hola,", nombre, "!")

def sumar(a, b):
    return a + b

saludar("Juan")
resultado = sumar(3, 4)
print("La suma de 3 y 4 es:", resultado)
