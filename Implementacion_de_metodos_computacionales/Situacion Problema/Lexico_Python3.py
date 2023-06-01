# Archivo de prueba de Python
# 0. Ejemplo de importación de módulos
import datetime

# 1. Ejemplo de funciones
def saludar(nombre):
    print("¡Hola, {}!".format(nombre))

# 2. Ejemplo de variables
numero_0 = 25

def imprimir_doble(numero):
    print(numero * 2)

# 3. Ejemplos de operadores aritméticos
numero_1 = 10
numero_2 = 3

def suma(numero_1, numero_2):
    resultado = numero_1 + numero_2
    print("La suma es:", resultado)

def resta(numero_1, numero_2):
    resultado = numero_1 - numero_2
    print("La resta es:", resultado)

def multiplicacion(numero_1, numero_2):
    resultado = numero_1 * numero_2
    print("La multiplicación es:", resultado)

def division(numero_1, numero_2):
    resultado = numero_1 / numero_2
    print("La división es:", resultado)

def residuo(numero_1, numero_2):
    resultado = numero_1 % numero_2
    print("El residuo es:", resultado)

def potencia(numero_1, numero_2):
    resultado = numero_1 ** numero_2
    print("La potencia es:", resultado)

def division_entera(numero_1, numero_2):
    resultado = numero_1 // numero_2
    print("La división entera es:", resultado)

# 4. Ejemplos de operadores relacionales
valor_1 = 7
valor_2 = 12

def es_mayor(valor_1, valor_2):
    if valor_1 > valor_2:
        print("El primer valor es mayor")
    else:
        print("El primer valor no es mayor")

def es_menor(valor_1, valor_2):
    if valor_1 < valor_2:
        print("El primer valor es menor")
    else:
        print("El primer valor no es menor")

def es_igual(valor_1, valor_2):
    if valor_1 == valor_2:
        print("Los valores son iguales")
    else:
        print("Los valores no son iguales")

def es_mayor_igual(valor_1, valor_2):
    if valor_1 >= valor_2:
        print("El primer valor es mayor o igual")
    else:
        print("El primer valor no es mayor o igual")

def es_menor_igual(valor_1, valor_2):
    if valor_1 <= valor_2:
        print("El primer valor es menor o igual")
    else:
        print("El primer valor no es menor o igual")

def es_diferente(valor_1, valor_2):
    if valor_1 != valor_2:
        print("Los valores son diferentes")
    else:
        print("Los valores no son diferentes")

# 5. Operadores bit a bit
a = 13    # 1101 en binario
b = 7     # 0111 en binario

and_result = a & b
or_result = a | b
xor_result = a ^ b
left_shift_result = a << b
right_shift_result = a >> b
complement_result = ~a

print("AND:", and_result)
print("OR:", or_result)
print("XOR:", xor_result)
print("Left Shift:", left_shift_result)
print("Right Shift:", right_shift_result)
print("Complement:", complement_result)

# 6. Operadores de asignación
x = 5
y = 2

x += y
x -= y
x *= y
x /= y
x //= y
x %= y
x **= y
x <<= y
x >>= y
x &= y
x |= y
x ^= y

print("x:", x)

# 7. Operadores lógicos
p = True
q = False

and_result = p and q
or_result = p or q
not_result = not p

print("AND:", and_result)
print("OR:", or_result)
print("NOT:", not_result)

# Ejemplos de tipos de datos
entero = 15
flotante = 3.1416

# Ejemplos de datos booleanos
despierto = True
jugando = False
cuenta = None

# Ejemplos de cadenas
cadena1 = "¡Hola, mundo!"

# Ejemplos de estructuras de datos
lista = [1, 2, 3]
tupla = (4, 5, 6)
conjunto = {7, 8, 9}
diccionario = {"clave": "valor"}

# Ejemplos de comentarios
comentario = "Este es otro comentario"  # Esto es un comentario de una sola línea

'''
Este es otro comentario
multilinea
'''

"""
Este también es otro comentario
multilinea
"""

'''
'''
