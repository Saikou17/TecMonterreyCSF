defmodule Syntax_Highlighter do

 @doc """
  Identificamos los tokens para las expresiones regulares.
  """
  p_reservadas = ~r/\b(import|def|if|len|sys|argv|with|open|as|file|read|print|elif|except|as|else|and|assert|break|class|contine|del|exec|finally|for|from|global|in|is|lambda|not|or|pass|raise|return|try|while|yield|open)\b/
  op_aritmeticos = ~r/\B(\+|\-|\*{1,2}|\/{1,2}|\%)\B/
  op_relacionales = ~r/\B(\>=?|\<=?|\={1,2}|\!=)\B/
  op_bit_a_bit = ~r/\&|\||\^|\<{1,2}|>{1,2}|\~/
  op_asignacion = ~r(\+|\-|\|\/+|\%|\{1,2}|\<{1,2}|\>{1,2}|\&|\||\^|\?|\=)
  op_logicos = ~r/\b(and|or|not)\b/
  numeros = ~r/\b(\d.(\d)*|\d)\b/
  booleanos = ~r/\b(True|False|None)\b/
  strings = ~r/\".*\"/
  estructuras = ~r/(\[.*\]|\(.*\)|\{.*\})/
  identificadores = ~r/([a-zA-Z]+(\_|\d)*)/
  comentarios = ~r/\/\/.*$|\/\*.*\*\//
  espacios = ~r/\s+/
  asignacion = ~r(\+|\-|\|\/+|\%|\{1,2}|\<{1,2}|\>{1,2}|\&|\||\^|\?|\=)
  @start "<html>\n<head>\n<title>Python Syntax Highlighter</title>\n<link = 'stylesheet' href= './SituacionProblema/style.css'>\n</head>\n<body>\n<pre>\n"
  @end "</pre>\n</body>\n</html>"
  # Funcions para leer un archivo y obtener los tokens
  def read_file(in_python_file, out_python_file) do # Funcion para leer un archivo y obtener los tokens
    data = in_python_file # Leemos el archivo
        |> File.stream!() # Lo convertimos en un stream
        |> Enum.map(&tokens_regular_expresions(&1)) # Obtenemos los tokens
        |> Enum.join("")# Los juntamos en una sola cadena
      File.write(out_python_file, Enum.join([@start, data, @final])) # Escribimos el archivo
  end


  def tokens_regular_expresions(line), do: do_tokens(_line,Regex.scan(tokens,line),"") # Funcion para obtener los tokens de una line

  def do_tokens(line, ""), do
    cond do
      # Palabras reservadas
      Regex.match?(p_reservadas, line) -> # Si es una palabra reservada
        current = Regex.replace(p_reservadas, line, "<span class= p_reservadas>",current, "</span>") # La reemplazamos por un span azul
        do_tokens(current, []) # Llamamos a la funcion de nuevo
        # Strings
      Regex.match?(strings, line) -> # Si es un string
        current = Regex.replace(strings, line, "<span style=\"color:green\">\\1</span>") # Lo reemplazamos por un span verde
        do_tokens(current, []) # Llamamos a la funcion de nuevo
      # Numeros
      Regex.match?(numeros, line) -> # Si es un numero
        current = Regex.replace(numeros, line, "<span style=\"color:orange\">\\1</span>") # Lo reemplazamos por un span naranja
        do_tokens(current, []) # Llamamos a la funcion de nuevo
      # Operadores aritmeticos
      Regex.match?(op_aritmeticos, line) -> # Si es un operador aritmetico
        current = Regex.replace(op_aritmeticos, line, "<span style=\"color:yellow\">\\1</span>") # Lo reemplazamos por un span amarillo
        do_tokens(current, []) # Llamamos a la funcion de nuevo
      # Operadores relacionales
      Regex.match?(op_relacionales, line) -> # Si es un operador relacional
        current = Regex.replace(op_relacionales, line, "<span style=\"color:red\">\\1</span>") # Lo reemplazamos por un span morado
        do_tokens(current, []) # Llamamos a la funcion de nuevo
      # Operadores bit a bit
      Regex.match?(op_bit_a_bit, line) -> # Si es un operador bit a bit
        current = Regex.replace(op_bit_a_bit, line, "<span style=\"color:turqois\">\\1</span>") # Lo reemplazamos por un span morado
        do_tokens(current, []) # Llamamos a la funcion de nuevo
      # Identificadores
      Regex.match?(identificadores, line) -> # Si es un identificador
        current = Regex.replace(identificadores, line, "<span style=\"color:red\">\\1</span>") # Lo reemplazamos por un span rojo
        do_tokens(current, []) # Llamamos a la funcion de nuevo
      # Comentarios
      Regex.match?(comentarios, line) -> # Si es un comentario
        current = Regex.replace(comentarios, line, "<span style=\"color:navy\">\\1</span>") # Lo reemplazamos por un span gris
        do_tokens(current, []) # Llamamos a la funcion de nuevo
      # Espacios
      Regex.match?(espacios, line) ->
        current = Regex.replace(espacios, line, "<span style=\"color:aqua\">\\1</span>") # Lo reemplazamos por un span gris
        do_tokens(current, []) # Llamamos a la funcion de nuevo

  # defp do_tokens("", tokens), do:

end
