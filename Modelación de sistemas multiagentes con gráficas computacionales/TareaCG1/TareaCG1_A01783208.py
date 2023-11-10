import sys #Importamos la libreria sys
import math #Importamos la libreria math para realizar operaciones matematicas
import numpy as np


#Creamos la funcion de la rueda
def archivo_rueda(file_obj,lados,radio,ancho):
    #Creamos los vertices de nuestra rueda
    vertices = [] #Creamos una lista para guardar los vertices (Tuplas)
    normales = [] #Creamos una lista para guardar los vectores normales
    with open(file_obj,"w") as o: #Abrimos nuestro archivo de la rueda en modo de escribir
        o.write(f"#Vertices de la rueda:\n")
        o.write(f"v 0.000 0.000 0.000\n") #Centro de la cara 1
        o.write(f"v 0.000 0.000 {-ancho:.3f}\n") #Centro de la cara 2
        for i in range(lados): #Recorremos el numero de nuestros lados
            angulo = 2*math.pi*i/lados #Calculamos el angulo por cada lado
            x,y = radio*math.cos(angulo),radio*math.sin(angulo) #Calculamos el valor de x y y
            vertices.extend([(x, y, 0.0), (x, y, -ancho)]) #Agregamos las tuplas en pares
            o.write(f"v {x:.3f} {y:.3f} {0.0:.3f}\n") #Escribimos los vertices en el archivo
            o.write(f"v {x:.3f} {y:.3f} {-ancho:.3f}\n") #Escribimos los vertices en el archivo
        o.write(f"#Vertices Normales:\n")
        print(vertices)
        for i in range(0,len(vertices),2): #Recorremos ambas listas
            vector1 = np.array(vertices[i]) - np.array((0.0, 0.0, 0.0))
            vector2 = np.array(vertices[i+1]) - np.array((0.0, 0.0, 0.0))
            normal = np.cross(vector1, vector2)
            normal /= np.linalg.norm(normal)  # Normalización
            normales.append(normal)
            o.write(f"vn {normal[0]:.3f} {normal[1]:.3f} {normal[2]:.3f}\n")
            o.write(f"vn {normal[0]:.3f} {normal[1]:.3f} {-ancho:.3f}\n")
        o.write(f"#Caras de la rueda:\n")
        for i in range(0, len(normales)*2, 2):
                print(i)
                if i == ((len(normales)*2) - 4):
                    o.write(f"f {1}//{i+1} {(i+3)%((lados*2)+2)}//{i+1} {(i+5)%((lados*2)+2)}//{i+1}\n")
                    o.write(f"f {(i+6)}//{i+2} {(i+4)%((lados*2)+2)}//{i+2} {2}//{i+2}\n")
                    continue
                if i == ((len(normales)*2) - 2):
                    o.write(f"f {1}//{i+1} {(i+3)%((lados*2)+2)}//{i+1} {((i+5)%((lados*2)+2))+2}//{i+1}\n")
                    o.write(f"f {((i+6)%((lados*2)+2))+2}//{i+2} {(i+4)}//{i+2} {2}//{i+2}\n")
                    break
                o.write(f"f {1}//{i+1} {(i+3)%((lados*2)+2)}//{i+1} {(i+5)%((lados*2)+2)}//{i+1}\n")
                o.write(f"f {(i+6)%((lados*2)+2)}//{i+2} {(i+4)%((lados*2)+2)}//{i+2} {2}//{i+2}\n")
        o.write(f"#Caras de la tapa de la rueda:\n")
        for i in range(1, len(normales) + 1):
            next_i = (i % len(normales)) + 1  # Índice del próximo vértice

            o.write(f"f {2*i+1}//{i} {2*i+2}//{i} {2*next_i+2}//{i}\n")
            o.write(f"f {2*i+1}//{i} {2*next_i+2}//{i} {2*next_i+1}//{i}\n")


#Creamos nuestro programa principal
def main():
    #Imprimimos mensaje de bienvenida
    print("Genera tu rueda. A continuacion ingresa los siguientes parametros:\n")
    #Los valores que tiene que ingresar el usuario son: cantidad de lados de la rueda, radio de la rueda y ancho de la rueda
    lados = int(input("Ingresa la cantidad de lados de la rueda:"))
    radio = float(input("\nIngresa el radio de la rueda:"))
    ancho = float(input("\nIngresa el ancho de la rueda:"))
    #Llamamos la funcion de la rueda
    archivo_rueda("Wheel.obj",lados,radio,ancho) #Asignamos un valores por predeterminado , si en todo caso el usuario no ingresa ningun numero
    
if __name__ == "__main__":
    main()