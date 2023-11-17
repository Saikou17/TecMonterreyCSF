import numpy as np
import math

def archivo_rueda(file_obj, lados, radio, ancho):
    # Listas para almacenar los vértices y normales
    vertices = []
    normales = []

    # Apertura del archivo .obj en modo escritura
    with open(file_obj, "w") as o:
        # Sección de los vértices de la rueda
        o.write("#Vertices de la rueda:\n")
        o.write("v 0.000 0.000 0.000\n")  # Centro de la cara 1
        o.write(f"v 0.000 0.000 {-ancho:.3f}\n")  # Centro de la cara 2

        # Creación de los vértices y escritura en el archivo
        for i in range(lados):
            angulo = 2 * math.pi * i / lados
            x, y = radio * math.cos(angulo), radio * math.sin(angulo)
            vertices.extend([(x, y, 0.0), (x, y, -ancho)])
            o.write(f"v {x:.3f} {y:.3f} {0.0:.3f}\n")
            o.write(f"v {x:.3f} {y:.3f} {-ancho:.3f}\n")

        # Sección de las normales
        o.write("#Vertices Normales:\n")
        for i in range(0, len(vertices), 2):
            vector1 = np.array(vertices[i])
            vector2 = np.array(vertices[i+1])
            normal = np.cross(vector1, vector2)
            normal /= np.linalg.norm(normal)
            normales.append(normal)
            o.write(f"vn {normal[0]:.3f} {normal[1]:.3f} {normal[2]:.3f}\n")
            o.write(f"vn {normal[0]:.3f} {normal[1]:.3f} {-ancho:.3f}\n")

        # Sección de las caras de la rueda
        o.write("#Caras de la rueda:\n")
        for i in range(0, len(normales) * 2, 2):
            if i == ((len(normales) * 2) - 4):
                o.write(f"f {1}//{i+1} {(i+3)%((lados*2)+2)}//{i+1} {(i+5)%((lados*2)+2)}//{i+1}\n")
                o.write(f"f {(i+6)}//{i+2} {(i+4)%((lados*2)+2)}//{i+2} {2}//{i+2}\n")
                continue
            if i == ((len(normales) * 2) - 2):
                o.write(f"f {1}//{i+1} {(i+3)%((lados*2)+2)}//{i+1} {((i+5)%((lados*2)+2))+2}//{i+1}\n")
                o.write(f"f {((i+6)%((lados*2)+2))+2}//{i+2} {(i+4)}//{i+2} {2}//{i+2}\n")
                break
            o.write(f"f {1}//{i+1} {(i+3)%((lados*2)+2)}//{i+1} {(i+5)%((lados*2)+2)}//{i+1}\n")
            o.write(f"f {(i+6)%((lados*2)+2)}//{i+2} {(i+4)%((lados*2)+2)}//{i+2} {2}//{i+2}\n")

        # Sección de las caras de la tapa de la rueda
        o.write("#Caras de la tapa de la rueda:\n")
        for i in range(1, len(normales) + 1):
            next_i = (i % len(normales)) + 1
            o.write(f"f {2*i+1}//{i} {2*i+2}//{i} {2*next_i+2}//{i}\n")
            o.write(f"f {2*i+1}//{i} {2*next_i+2}//{i} {2*next_i+1}//{i}\n")

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
