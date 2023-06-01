defmodule Syntax_Highlighter do

  @doc """
   Identificamos los tokens para las expresiones regulares.
   """
   @p_reservadas ~r/\b^(import|def|if|len|sys|argv|with|open|as|file|read|print|elif|except|as|else|and|assert|break|class|contine|del|exec|finally|for|from|global|in|is|lambda|not|or|pass|raise|return|try|while|yield|open)\b/
   @op_aritmeticos  ~r/\B^(\+|\-|\*{1,2}|\/{1,2}|\%)\B/
   @op_relacionales  ~r/\B^(\>=?|\<=?|\={1,2}|\!=)\B/
   @op_bit_a_bit  ~r/^(\&|\||\^|\<{1,2}|>{1,2}|\/{1,2})/
   @op_asignacion  ~r/^(\+|\-|\|\/+|\%|\{1,2}|\<{1,2}|\>{1,2}|\&|\||\^|\?|\=)/
   @op_logicos  ~r/\b^(and|or|not)\b/
   @numeros  ~r/\b^(\d.(\d)*|\d)\b/
   @booleanos  ~r/\b^(True|False|None)\b/
   @strings  ~r/^(\".*\")/
   @estructuras  ~r/^(\[.\]|\(.\)|\{.*\})/
   @identificadores  ~r/^([a-zA-Z]+(\_|\d)*)/
   @comentarios  ~r/^(\#.*|\"{3}.*|\'{3}.*)/
   @espacios  ~r/^\s+/
   @inicio_html "<html>\n<head>\n<title>Python Syntax Highlighter</title>\n<link = 'stylesheet' href= './style.css'>\n</head>\n<body>\n<pre>\n"
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
   def do_tokens("", res), do: res # Caso base: Aquí detenemos la recursión

   def do_tokens(line, res) do
     cond do
       # Palabras reservadas
       Regex.match?(@p_reservadas, line) ->
        [head|_tail] = Regex.run(@p_reservadas,line)
         do_tokens(String.replace(line,head,""), res<>"<span class=  'reservadas' >"<>head<>"</span>")

       # Operadores aritméticos
       Regex.match?(@op_aritmeticos, line) ->
        [head|_tail] = Regex.run(@op_aritmeticos,line)
         do_tokens(String.replace(line,head,""), res<>"<span class= 'aritmeticos'>"<>head<>"</span>")

       # Operadores relacionales
       Regex.match?(@op_relacionales, line) ->
        [head|_tail] = Regex.run(@op_relacionales,line)
         do_tokens(String.replace(line,head,""), res<>"<span class= 'relacionales'>"<>head<>"</span>")

       # Operadores bit a bit
       Regex.match?(@op_bit_a_bit, line) ->
        [head|_tail] = Regex.run(@op_bit_a_bit,line)
         do_tokens(String.replace(line,head,""), res<>"<span class= 'bitabit'>"<>head<>"</span>")

       # Operadores de asignación
       Regex.match?(@op_asignacion, line) ->
        [head|_tail] = Regex.run(@op_asignacion,line)
         do_tokens(String.replace(line,head,""), res<>"<span class= 'asignacion'>"<>head<>"</span>")

       # Operadores lógicos
       Regex.match?(@op_logicos, line) ->
        [head|_tail] = Regex.run(@op_logicos,line)
         do_tokens(String.replace(line,head,""), res<>"<span class= 'logicos>"<>head<>"</span>")

       # Números
       Regex.match?(@numeros, line) ->
        [head|_tail] = Regex.run(@numeros,line)
         do_tokens(String.replace(line,head,""), res<>"<span class= 'numeros'>"<>head<>"</span>")

       # Booleanos
       Regex.match?(@booleanos, line) ->
        [head|_tail] = Regex.run(@booleanos,line)
         do_tokens(String.replace(line,head,""), res<>"<span class= 'booleanos'>"<>head<>"</span>")

       # Strings
       Regex.match?(@strings, line) ->
        [head|_tail] = Regex.run(@strings,line)
         do_tokens(String.replace(line,head,""), res<>"<span class= 'strings'>"<>head<>"</span>")

       # Estructuras
       Regex.match?(@estructuras, line) ->
        [head|_tail] = Regex.run(@estructuras,line)
         do_tokens(String.replace(line,head,""), res<>"<span class= 'estructuras'>"<>head<>"</span>")

       # Identificadores
       Regex.match?(@identificadores, line) ->
        [head|_tail] = Regex.run(@identificadores,line)
         do_tokens(String.replace(line,head,""), res<>"<span class= 'identificadores'>"<>head<>"</span>")

       # Comentarios
       Regex.match?(@comentarios, line) ->
        [head|_tail] = Regex.run(@comentarios,line)
         do_tokens(String.replace(line,head,""), res<>"<span class= 'comentarios'>"<>head<>"</span>")

       # Espacios
       Regex.match?(@espacios, line) ->
        [head|_tail] = Regex.run(@espacios,line)
         do_tokens(String.replace(line,head,""), res<>"<span class= 'espacios'>"<>head<>"</span>")

      true -> do_tokens(String.slice(line,1,String.length(line)-1),res)

     end
   end
end
