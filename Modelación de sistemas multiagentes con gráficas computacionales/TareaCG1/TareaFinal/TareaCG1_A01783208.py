"""
TareaCG1: Creacion de Rueda
Juan Pablo Cruz Rodriguez A01783208

"""
import math

#Creamos nuestra funcion de la rueda que recibe 4 parametros:
# file_obj : Nombre de nuestro archivo obj
# Lados: Cantidad de lados 
# Radio: Radio del círculo en el cual se va a crear la rueda
# Ancho: Ancho de la rueda
def archivo_rueda(file_obj, lados, radio, ancho):

    # Listas para almacenar los vértices y normales
    vertices = []
    normales = []

    # Apertura del archivo .obj en modo escritura
    with open(file_obj, "w") as o:
        # Sección de los vértices de la rueda
        o.write("#Vertices de la rueda:\n")
        #Generamos el vertice (centro) de la rueda de ambos lados
        o.write("v 0.000 0.000 0.000\n")
        o.write(f"v {-ancho:.3f} 0.000 0.000\n")

        # Creación de los vértices y escritura en el archivo
        for i in range(lados):
            #Usamos la formula para obtener el angulo de cada lado
            angulo = 2 * math.pi * i / lados
            #Calculamos los vertices 
            z, y = radio * math.cos(angulo), radio * math.sin(angulo)
            #Agregamos los vertices respectivos a cada cara de la llanta
            vertices.extend([(0.000, y, z), (-ancho, y, z)]) 
            #Escribimos nuestros vertices en el archivo
            o.write(f"v {0.0:.3f} {y:.3f} {z:.3f}\n")
            o.write(f"v {-ancho:.3f} {y:.3f} {z:.3f}\n")

        # Creacion de los vectores normales
        o.write("#Vectores Normales:\n")
        #Recorremos los vertices de la primera cara de la rueda
        for i in range(0, len(vertices), 2):
            #Establecemos los vertices para crear los vectores
            vertice_centro = (0.000, 0.000, 0.000)
            vertice1,vertice2 = vertices[i],vertices[(i+2) % len(vertices)] 
            #Creamos los vectores a partir de los vertices
            vector1,vector2 = tuple(b - a for a, b in zip(vertice_centro, vertice1)),tuple(b - a for a, b in zip(vertice_centro, vertice2))
            #Realizamos el producto cruz entre los vectores para calcular el vector normal
            normal = (((vector1[1]*vector2[2])-(vector1[2]*vector2[1])),((vector1[2]*vector2[0])-(vector1[0]*vector2[2])),((vector1[0]*vector2[1])-(vector1[1]*vector2[0])))
            normales.append(normal)
            print(normal)
            #Finalmente escribimos el vector normal para ambas caras
            o.write(f"vn {normal[0]:.3f} {normal[1]:.3f} {normal[2]:.3f}\n")
            o.write(f"vn {-normal[0]:.3f} {normal[1]:.3f} {normal[2]:.3f} \n")

       # Sección de las caras de la rueda de los lados
        o.write("#Caras de la rueda:\n")
        #Creamos un ciclo para recorrer los vectores normales para una de las caras. Avanzamos en numeros pares
        for i in range(0, len(normales) * 2, 2):
            # if i == ((len(normales) * 2) - 4):
            #     o.write(f"f {1}//{i+1} {(i+5)%((lados*2)+2)}//{i+1} {(i+3)%((lados*2)+2)}//{i+1}\n")
            #     o.write(f"f {(i+6)}//{i+2} {2}//{i+2} {(i+4)%((lados*2)+2)}//{i+2}\n")
            #     continue
            # if i == ((len(normales) * 2) - 2):
            #     o.write(f"f {1}//{i+1} {((i+5)%((lados*2)+2))+2}//{i+1} {(i+3)%((lados*2)+2)}//{i+1}\n")
            #     o.write(f"f {((i+6)%((lados*2)+2))+2}//{i+2} {2}//{i+2} {(i+4)%((lados*2)+2)}//{i+2}\n")
            #     break
            #Escribimos el formato vertices//normal para generar las caras de uno de los lados de la rueda
            o.write(f"f {1}//{i+1} {(i+5)%((lados*2)+2)}//{i+1} {(i+3)%((lados*2)+2)}//{i+1}\n")
            ##Escribimos el formato vertices//normal para generar las caras para el otro lado de la rueda
            o.write(f"f {2}//{i+2} {(i+4)%((lados*2)+2)}//{i+2} {(i+6)%((lados*2)+2)}//{i+2} \n")

        # Sección de las caras de la tapa de la rueda
        o.write("#Caras de la tapa de la rueda:\n")
        for i in range(1, len(normales) + 1):
            next_i = (i % len(normales)) + 1
            o.write(f"f {2*i+1}//{i}  {2*next_i+2}//{i} {2*i+2}//{i}\n")
            o.write(f"f {2*i+1}//{i}  {2*next_i+1}//{i} {2*next_i+2}//{i}\n")

def main():
    # Mensaje de bienvenida y solicitud de parámetros al usuario
    print("Genera tu rueda. Ingresa los siguientes parámetros:")
    lados = int(input("Ingresa la cantidad de lados de la rueda: "))
    radio = float(input("\nIngresa el radio de la rueda: "))
    ancho = float(input("\nIngresa el ancho de la rueda: "))

    # Llamada a la función para generar la rueda
    archivo_rueda("Wheel.obj", lados, radio, ancho)

if __name__ == "__main__":
    main()
