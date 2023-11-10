import sys
import math

def generate_wheel_model(num_sides, radius, width):
    if num_sides < 3 or num_sides > 360:
        num_sides = 8
    if radius <= 0.0:
        radius = 1.0
    if width <= 0.0:
        width = 0.5

    # Calcula los vértices
    vertices = []
    for i in range(num_sides):
        angle = 2 * math.pi * i / num_sides
        cos_angle = math.cos(angle)
        sin_angle = math.sin(angle)
        x = cos_angle * radius
        y = sin_angle * radius
        vertices.append((x, y, 0.0))
        vertices.append((x, y, width))

    # Vértices de las bases
    vertices.append((0.0, 0.0, width))  # Base superior
    vertices.append((0.0, 0.0, 0.0))    # Base inferior

    with open("modelo_rueda.obj", "w") as obj_archivo:
        obj_archivo.write("# Modelo de una rueda\n")
        obj_archivo.write(f"# Vertices: {len(vertices)}\n")
        for vertice in vertices:
            obj_archivo.write(f"v {vertice[0]:.3f} {vertice[1]:.3f} {vertice[2]:.3f}\n")

        # Normales
        obj_archivo.write(f"# Normales: {num_sides + 2}\n")
        for i in range(num_sides):
            obj_archivo.write(f"vn {cos_angle:.3f} {sin_angle:.3f} 0.0000\n")
        obj_archivo.write("vn 0.0000 0.0000 1.0000\n")
        obj_archivo.write("vn 0.0000 0.0000 -1.0000\n")

        # Caras
        obj_archivo.write(f"# Caras: {num_sides * 2 + 2}\n")
        for i in range(num_sides):
            v1 = 2 * i + 1
            v2 = 2 * i + 2
            v3 = 2 * ((i + 1) % num_sides) + 2
            v4 = 2 * ((i + 1) % num_sides) + 1
            obj_archivo.write(f"f {v1}//{i+1} {v4}//{i+1} {v3}//{i+1}\n")
            obj_archivo.write(f"f {v3}//{i+1} {v2}//{i+1} {v1}//{i+1}\n")

        # Bases
        for i in range(num_sides):
            v1 = 2 * i + 1
            v2 = 2 * ((i + 1) % num_sides) + 1
            obj_archivo.write(f"f {len(vertices)}//{num_sides+1} {v2}//{num_sides+1} {v1}//{num_sides+1}\n")
            v1 = 2 * i + 2
            v2 = 2 * ((i + 1) % num_sides) + 2
            obj_archivo.write(f"f {len(vertices) - 1}//{num_sides+2} {v1}//{num_sides+2} {v2}//{num_sides+2}\n")


def main():
    if len(sys.argv) == 4:
        num_sides = int(sys.argv[1])
        radius = float(sys.argv[2])
        width = float(sys.argv[3])
    else:
        num_sides = 8
        radius = 1.0
        width = 0.5

    generate_wheel_model(num_sides, radius, width)

if __name__ == "__main__":
    main()