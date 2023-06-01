defmodule Syntax_Highlighter do

  @doc """
   Identificamos los tokens para las expresiones regulares.
   """
   @p_reservadas ~r/\b(import|def|if|len|sys|argv|with|open|as|file|read|print|elif|except|as|else|and|assert|break|class|contine|del|exec|finally|for|from|global|in|is|lambda|not|or|pass|raise|return|try|while|yield|open)\b/
   @op_aritmeticos  ~r/\B(\+|\-|\*{1,2}|\/{1,2}|\%)\B/
   @op_relacionales  ~r/\B(\>=?|\<=?|\={1,2}|\!=)\B/
   @op_bit_a_bit  ~r/\&|\||\^|\<{1,2}|>{1,2}|\/{1,2}/
   @op_asignacion  ~r(\+|\-|\|\/+|\%|\{1,2}|\<{1,2}|\>{1,2}|\&|\||\^|\?|\=)
   @op_logicos  ~r/\b(and|or|not)\b/
   @numeros  ~r/\b(\d.(\d)*|\d)\b/
   @booleanos  ~r/\b(True|False|None)\b/
   @strings  ~r/\".*\"/
   @estructuras  ~r/(\[.\]|\(.\)|\{.*\})/
   @identificadores  ~r/([a-zA-Z]+(\_|\d)*)/
   @comentarios  ~r/\#.*|\"{3}.*/
   @espacios  ~r/\s+/
   @tokens [@p_reservadas, @op_aritmeticos, @op_relacionales, @op_bit_a_bit, @op_asignacion, @op_logicos, @numeros, @booleanos, @strings, @estructuras, @identificadores, @comentarios, @espacios]
   @inicio_html "<html>\n<head>\n<title>Python Syntax Highlighter</title>\n<link = 'stylesheet' href= './SituacionProblema/style.css'>\n</head>\n<body>\n<pre>\n"
   @final_html "</pre>\n</body>\n</html>"
  # Funcions para leer un archivo y obtener los tokens
   def read_file(in_python_file, out_python_file) do # Funcion para leer un archivo y obtener los tokens
     data = in_python_file # Leemos el archivo
         |> File.stream!() # Lo convertimos en un stream
         |> Enum.map(&tokens_regular_expresions(&1)) # Obtenemos los tokens
         |> Enum.join("")# Los juntamos en una sola cadena
       File.write(out_python_file, Enum.join([@inicio_html, data, @final_html])) # Escribimos el archivo
   end

   def tokens_regular_expresions(line), do: do_tokens(line,"") # Funcion para obtener los tokens de una line
   def do_tokens(_line, [], res), do: res # Caso base: Aquí detenemos la recursión

   def do_tokens(line, [head | tail], res) do
     cond do
       # Palabras reservadas
       Regex.match?(@p_reservadas, head) ->
         do_tokens(line, tail, res<>"<span class=reservadas>"<>head<>"</span>")

       # Operadores aritméticos
       Regex.match?(@op_aritmeticos, head) ->
         do_tokens(line, tail, res<>"<span class=aritmeticos>"<>head<>"</span>")

       # Operadores relacionales
       Regex.match?(@op_relacionales, head) ->
         do_tokens(line, tail, res<>"<span class=relacionales>"<>head<>"</span>")

       # Operadores bit a bit
       Regex.match?(@op_bit_a_bit, head) ->
         do_tokens(line, tail, res<>"<span class=bitabit>"<>head<>"</span>")

       # Operadores de asignación
       Regex.match?(@op_asignacion, head) ->
         do_tokens(line, tail, res<>"<span class=asignacion>"<>head<>"</span>")

       # Operadores lógicos
       Regex.match?(@op_logicos, head) ->
         do_tokens(line, tail, res<>"<span class=logicos>"<>head<>"</span>")

       # Números
       Regex.match?(@numeros, head) ->
         do_tokens(line, tail, res <> "<span class=numeros>" <> head <> "</span>")

       # Booleanos
       Regex.match?(@booleanos, head) ->
         do_tokens(line, tail, res <> "<span class=booleanos>" <> head <> "</span>")

       # Strings
       Regex.match?(@strings, head) ->
         do_tokens(line, tail, res <> "<span class=strings>" <> head <> "</span>")

       # Estructuras
       Regex.match?(@estructuras, head) ->
         do_tokens(line, tail, res <> "<span class=estructuras>" <> head <> "</span>")

       # Identificadores
       Regex.match?(@identificadores, head) ->
         do_tokens(line, tail, res <> "<span class=identificadores>" <> head <> "</span>")

       # Comentarios
       Regex.match?(@comentarios, head) ->
         do_tokens(line, tail, res <> "<span class=comentarios>" <> head <> "</span>")

       # Espacios
       Regex.match?(@espacios, head) ->
         do_tokens(line, tail, res <> "<span class=espacios>" <> head <> "</span>")
     end
   end
end
