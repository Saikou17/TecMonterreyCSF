# Actividad 5.2 Programación paralela y concurrente


Juan Pablo Moreno Robles Arenas A01374091

Juan Pablo Cruz Rodriguez A01783208

## Hw.Primes
Este módulo proporciona funciones para calcular la suma de números primos dentro de un rango dado. Incluye implementaciones tanto secuenciales como paralelas.

### Funciones
```elixir	
def range_sum({start, stop})
```
Esta función calcula la suma de números primos dentro de un rango dado. Toma una tupla que representa los valores de start y stop del rango como argumento.

start (entero): El valor de start del rango.

stop (entero): El valor de stop del rango.


Crea un rango desde start hasta stop.

Filtra los números dentro del rango utilizando la función 
```elixir
defp is_prime(n)
```	
Calcula la suma de los números primos filtrados.
Esta función verifica si un número dado es primo.

n (entero): El número para verificar si es primo.
La función utiliza un algoritmo básico de prueba de primalidad:

Si n es menor o igual a 1, devuelve false.

Si n es menor o igual a 3, devuelve true.

De lo contrario, verifica si existe algún número entre 2 y la raíz cuadrada de n que divida a n de manera exacta. Si se encuentra dicho número, devuelve false; de lo contrario, devuelve true.

```elixir
defp make_ranges(start, stop, num_threads)
```
Esta función crea subrangos para procesamiento paralelo. Divide el rango dado en subrangos más pequeños según el número de hilos especificado.

start (entero): El valor de inicio del rango.

stop (entero): El valor de fin del rango.

num_threads (entero): El número de hilos o subrangos que se
 crearán.

 La función realiza los siguientes pasos:

1. Calcula el tamaño de cada subrango en función de la diferencia entre fin e inicio, dividido por el número de hilos.
2. Crea tuplas que representan los subrangos en función del tamaño de paso y el número de hilos.

```elixir
defp sum_primes(start, stop)
```
Esta función calcula la suma de números primos dentro de un rango dado utilizando un enfoque secuencial.

start (entero): El valor de inicio del rango.
start (entero): El valor de fin del rango.
La función realiza los siguientes pasos:

Crea una tupla que representa el rango.
Llama a la función range_sum/1 para calcular la suma de números primos dentro del rango.
Al terminar mide el tiempo de ejecución utilizando :timer.tc.
Y finalmente imprime el tiempo de ejecución y el resultado.

Dando como resultado en microsegundos:

- Execution time: 23754649 microseconds
- Result: 838596693108
- :ok


```elixir
def psum_primes_parallel(start, stop, num_threads)
```
Esta función calcula la suma de números primos dentro de un rango dado utilizando un enfoque paralelo. Divide el rango en subrangos y los procesa concurrentemente utilizando múltiples hilos.

start (entero): El valor de inicio del rango.
start (entero): El valor de fin del rango.
num_threads (entero): El número de hilos o subrangos que se crearán para el procesamiento paralelo.
La función realiza los siguientes pasos:

Crea subrangos utilizando la función make_ranges.
Ejecuta la función range_sum en paralelo para cada subrango utilizando Task.async. Después spera los resultados de cada tarea utilizando Task.await/2. Al acabar calcula la suma de los resultados.Y finalmente mide el tiempo de ejecución utilizando :timer.tc. Además imprime el tiempo de ejecución y el resultado.

Los resultados obtenidos fueron:
- Execution time: 9633792 microseconds
- Result: 838591693109
- :ok

## Como correlo

Para correr las funciones del programa se deben de ejecutar los siguientes comandos en la terminal:

```elixir
Hw.Primes.sum_primes(1, 5000000)

Hw.Primes.sum_primes_parallel(1, 5000000, 4)
````