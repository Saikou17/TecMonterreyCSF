defmodule Syntax_Highlighter do

 @doc """
  Identificamos los tokens para las expresiones regulares.
  """
  p_reservadas = ~r/\b(import|def|if|len|sys|argv|with|open|as|file|read|print|elif|except|as|else|and|assert|break|class|contine|del|exec|finally|for|from|global|in|is|lambda|not|or|pass|raise|return|try|while|yield|open)\b/
  strings = ~r/\".*\"/
  numeros = ~r/[0-9]+/
  op_aritmeticos = ~r \B(\+|\-|\*{1,2}|\/{1,2}|\%)\B
  op_relacionales = ~r \B(\>=?|\<=?|\={1,2}|\!=)\B
  op_bit_a_bit = ~r \&|\||\^|\<{1,2}|>{1,2}|\~
  identificadores = ~r/[a-zA-Z][a-zA-Z0-9_]*/
  comentarios = ~r/\/\/.*$|\/\*.*\*\//
  espacios = ~r/\s+/
  asignacion = ~r(\+|\-|\|\/+|\%|\{1,2}|\<{1,2}|\>{1,2}|\&|\||\^|\?|\=)

 # Funcions para leer un archivo y obtener los tokens
  def read_file(in_python_file, out_python_file) do # Funcion para leer un archivo y obtener los tokens
    data = in_python_file # Leemos el archivo
        |> File.stream!() # Lo convertimos en un stream
        |> Enum.map(&tokens_regular_expresions(&1)) # Obtenemos los tokens
        |> Enum.join("")# Los juntamos en una sola cadena
      File.write(out_python_file, ) # Escribimos el archivo
  end


  def tokens_regular_expresions(line) do: do_tokens(line, []) # Funcion para obtener los tokens de una linea

  def do_tokens(line, ""), do
    cond do
      Regex.match?(p_reservadas, line) -> # Si es una palabra reservada
        current = Regex.replace(p_reservadas, line, "<span style=\"color:blue\">\\1</span>") # La reemplazamos por un span azul
        do_tokens(current, []) # Volvemos a llamar a la funcion



  # defp do_tokens("", tokens), do:

  #   cond do
  #     Regex.match?(p_reservadas, tokens) ->
  #       current = Regex.replace(p_reservadas, tokens, "<span style=\"color:blue\">\\1</span>")
  #       do_tokens(current, [])
  #     Regex.match?(strings, tokens) ->
  #       current = Regex.replace(strings, tokens, "<span style=\"color:green\">\\1</span>")
  #       do_tokens(current, [])
  end
end
