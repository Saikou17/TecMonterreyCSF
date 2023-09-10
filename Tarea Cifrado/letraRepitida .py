# Abrir el archivo y leer su contenido
alfabeto = "abcdefghijklmnopqrstuvwxyz "

with open("c:\\Tec\\TecMonterreyCSF\\Tarea Cifrado\\cipher1.txt", "r") as archivo:
    texto = archivo.read()


frecuencia_letras = {}

for letra in texto:
    letra = letra.lower()
    if letra.isalpha():
        if letra in frecuencia_letras:
            frecuencia_letras[letra] += 1
        else:
            frecuencia_letras[letra] = 1

letra_mas_comun = max(frecuencia_letras, key=frecuencia_letras.get) 
posicion_letra_mas_comun = alfabeto.index(letra_mas_comun) + 1

print("La letra que más se repite es:", letra_mas_comun)
print("Frecuencia:", frecuencia_letras[letra_mas_comun])
print("La letra más común se encuentra en la posición:", posicion_letra_mas_comun -1)
print ("La llave es " + str(posicion_letra_mas_comun))
