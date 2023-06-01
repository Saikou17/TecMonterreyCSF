# Archivo de prueba de Python
# 0. Ejemplo de importación de módulos
import random

# 1. Ejemplo de funciones
def saludar():
    print("¡Hola, mundo!")

# 2. Ejemplo de variables
numero_0 = 20

def imprimir_numero(numero):
    print(numero)

# 3. Ejemplos de operadores aritméticos
numero_1 = 8
numero_2 = 4

def suma(numero_1, numero_2):
    print(numero_1 + numero_2)

def resta(numero_1, numero_2):
    print(numero_1 - numero_2)

def multiplicacion(numero_1, numero_2):
    print(numero_1 * numero_2)

def division(numero_1, numero_2):
    print(numero_1 / numero_2)

def residuo(numero_1, numero_2):
    print(numero_1 % numero_2)

def potencia(numero_1, numero_2):
    print(numero_1 ** numero_2)

def division_entera(numero_1, numero_2):
    print(numero_1 // numero_2)

# 4. Ejemplos de operadores relacionales
valor_1 = 15
valor_2 = 7

def es_mayor(valor_1, valor_2):
    if valor_1 > valor_2:
        print("Es mayor")
    else:
        print("No es mayor")

def es_menor(valor_1, valor_2):
    if valor_1 < valor_2:
        print("Es menor")
    else:
        print("No es menor")

def es_igual(valor_1, valor_2):
    if valor_1 == valor_2:
        print("Son iguales")
    else:
        print("No son iguales")

def es_mayor_igual(valor_1, valor_2):
    if valor_1 >= valor_2:
        print("Es mayor o igual")
    else:
        print("No es mayor o igual")

def es_menor_igual(valor_1, valor_2):
    if valor_1 <= valor_2:
        print("Es menor o igual")
    else:
        print("No es menor o igual")

def es_diferente(valor_1, valor_2):
    if valor_1 != valor_2:
        print("Son diferentes")
    else:
        print("No son diferentes")

# 5. Operadores bit a bit
a = 7    # 0111 en binario
b = 3    # 0011 en binario

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
entero = 10
flotante = 3.14

# Ejemplos de datos booleanos
despierto = True
jugando = False
cuenta = None

# Ejemplos de cadenas
cadena1 = "Hola, mundo!"

# Ejemplos de estructuras de datos
lista = [1, 2, 3]
tupla = (4, 5, 6)
conjunto = {7, 8, 9}
diccionario = {"clave": "valor"}

# Ejemplos de comentarios
comentario = "Este es un comentario"  # Esto es un comentario de una sola línea

'''
Este es un comentario
multilinea
'''

"""
Este también es un comentario
multilinea
"""

'''
'''
