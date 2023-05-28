# Archivo de preuba de python

#0. Ejemplo librerias

import math

#1.Ejemplo Funciones

def hola_mundo () :
    print ("Hola mundo")

#2. Ejemplo Variables

numero_0 = 10
def numero_A(numero_0):
    print(numero_0)

#3. Ejemplos Operadores Aritmeticos

Numero_1 = 5
Numero_2 =2
def suma(Numero_1,Numero_2) :
    print(Numero_1 + Numero_2)

def resta(Numero_1,Numero_2) :
    print(Numero_1 - Numero_2)

def multiplicacion(Numero_1,Numero_2) :
    print(Numero_1 * Numero_2)

def division(Numero_1,Numero_2) :
    print(Numero_1 / Numero_2)

def residuo(Numero_1,Numero_2) :
    print(Numero_1,Numero_2)

def potencia(Numero_1,Numero_2) :
    print(Numero_1 ** Numero_2)

def division_entera(Numero_1,Numero_2) :
    print(Numero_1//Numero_2)

#4. Ejemplos de Operadores Relacionales

Var = 10
Var2= 5
def mayor (Var , Var2):
    if(Var > Var2):
        print("Es mayor")
    print("No es mayor")

def menor (Var , Var2):
    if(Var < Var2):
        print("Es menor")
    print("No es menor")

def iguales (Var , Var2):
    if(Var == Var2):
        print("Son iguales")
    print("No son iguales")

def mayorIgual (Var , Var2):
    if(Var >= Var2):
        print("Es mayor o igual")
    print("No es mayor o igual")

def menorIgual(Var , Var2):
    if(Var <= Var2):
        print("Es menor o igual")
    print("NO es menor igual")

def diferente(Var , Var2):
    if(Var != Var2):
        print("Son diferentes")
    print("No son diferentes")

#5. Operadores bit a bit

a = 10  # 1010 en binario
b = 3   # 0011 en binario

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

#6. Operadores Asignacion

a = 10
b = 3

c = a
c += b
d = a
d -= b
e = a
e *= b
f = a
f /= b
g = a
g //= b
h = a
h %= b
i = a
i **= b
j = a
j <<= b
k = a
k >>= b
l = a
l &= b
m = a
m |= b
n = a
n ^= b

print("c:", c)
print("d:", d)
print("e:", e)
print("f:", f)
print("g:", g)
print("h:", h)
print("i:", i)
print("j:", j)
print("k:", k)
print("l:", l)
print("m:", m)
print("n:", n)

#7. Operaodres Logicos

a = True
b = False

and_result = a and b
or_result = a or b
not_result = not a

print("AND:", and_result)
print("OR:", or_result)
print("NOT:", not_result)

# Ejemplo de datos numericos

entero = 10
flotante = 3.14

# Ejemplo de datos booleanos

despierto = True
jugando = False
cuenta = None

# Ejemplos de cadena

cadena1 = "Holi UwU"

# Ejemplo de Estructuras
lista = [1, 2, 3]
tuplas = (1, 2, 3)
conjunto = {1, 2, 3}
diccionario = {"clave": "valor"}

# Ejemplo de comentarios
comentario = "Comentario esta al lado mio" # Esto es un comentario de una sola línea
parentesis = (1, 2, 3) 

'''
Este es un comentario
multilinea
'''

"""
Este también es un comentario
multilinea
"""



