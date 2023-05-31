defmodule Syntax_Highlighter do

  @doc """
   Identificamos los tokens para las expresiones regulares.
   """
   p_reservadas = ~r/\b(import|def|if|len|sys|argv|with|open|as|file|read|print|elif|except|as|else|and|assert|break|class|contine|del|exec|finally|for|from|global|in|is|lambda|not|or|pass|raise|return|try|while|yield|open)\b/
   op_aritmeticos = ~r/\B(\+|\-|\*{1,2}|\/{1,2}|\%)\B/
   op_relacionales = ~r/\B(\>=?|\<=?|\={1,2}|\!=)\B/
   op_bit_a_bit = ~r/\&|\||\^|\<{1,2}|>{1,2}|\/{1,2}/
   op_asignacion = ~r(\+|\-|\|\/+|\%|\{1,2}|\<{1,2}|\>{1,2}|\&|\||\^|\?|\=)
   op_logicos = ~r/\b(and|or|not)\b/
   numeros = ~r/\b(\d.(\d)*|\d)\b/
   booleanos = ~r/\b(True|False|None)\b/
   strings = ~r/\".*\"/
   estructuras = ~r/(\[.\]|\(.\)|\{.*\})/
   identificadores = ~r/([a-zA-Z]+(\_|\d)*)/
   comentarios = ~r/\/\/.$|\/\.\\/
   espacios = ~r/\s+/
   tokens = ([p_reservadas|op_aritmeticos|op_relacionales|op_bit_a_bit|op_asignacion|op_logicos|numeros|booleanos|strings|estructuras|identificadores|comentarios|espacios])
   @inicio_html "<html>\n<head>\n<title>Python Syntax Highlighter</title>\n<link = 'stylesheet' href= './SituacionProblema/style.css'>\n</head>\n<body>\n<pre>\n"
   @final_html "</pre>\n</body>\n</html>"
  # Funcions para leer un archivo y obtener los tokens
   def read_file(in_python_file, out_python_file) do # Funcion para leer un archivo y obtener los tokens
     data = in_python_file # Leemos el archivo
         |> File.stream!() # Lo convertimos en un stream
         |> Enum.map(&tokens_regular_expresions(&1)) # Obtenemos los tokens
         |> Enum.join("")# Los juntamos en una sola cadena
       File.write(out_python_file, Enum.join([@incio_html, data, @final_html])) # Escribimos el archivo
   end


   def tokens_regular_expresions(line), do: do_tokens(_line,Regex.scan(tokens,line),"") # Funcion para obtener los tokens de una line

   def do_tokens(_line,[],res), do: res #Caso base: Aqui detenemos la recursion
   def do_tokens(line,[head|tail],res) when Regex.match?(p_reservadas,line), do: do_tokens(_line,tail,Enum.join("<span class=reservadas>",head,"</span>",res))
   def do_tokens(line,[head|tail],res) when Regex.match?(op_aritmeticos,line), do: do_tokens(_line,tail,Enum.join("<span class=aritmeticos>",head,"</span>",res))
   def do_tokens(line,[head|tail],res) when Regex.match?(op_relacionales,line), do: do_tokens(_line,tail,Enum.join("<span class=relacionales>",head,"</span>",res))
   def do_tokens(line,[head|tail],res) when Regex.match?(op_bit_a_bit,line), do: do_tokens(_line,tail,Enum.join("<span class=bitabit>",head,"</span>",res))
   def do_tokens(line,[head|tail],res) when Regex.match?(op_asignacion,line), do: do_tokens(_line,tail,Enum.join("<span class=asignacion>",head,"</span>",res))
   def do_tokens(line,[head|tail],res) when Regex.match?(op_logicos,line), do: do_tokens(_line,tail,Enum.join("<span class=logicos>",head,"</span>",res))
   def do_tokens(line,[head|tail],res) when Regex.match?(numeros,line), do: do_tokens(_line,tail,Enum.join("<span class=numeros>",head,"</span>",res))
   def do_tokens(line,[head|tail],res) when Regex.match?(booleanos,line), do: do_tokens(_line,tail,Enum.join("<span class=booleanos>",head,"</span>",res))
   def do_tokens(line,[head|tail],res) when Regex.match?(strings,line), do: do_tokens(_line,tail,Enum.join("<span class=strings>",head,"</span>",res))
   def do_tokens(line,[head|tail],res) when Regex.match?(estructuras,line), do: do_tokens(_line,tail,Enum.join("<span class=estructuras>",head,"</span>",res))
   def do_tokens(line,[head|tail],res) when Regex.match?(identificadores,line), do: do_tokens(_line,tail,Enum.join("<span class=identificadores>",head,"</span>",res))
   def do_tokens(line,[head|tail],res) when Regex.match?(comentarios,line), do: do_tokens(_line,tail,Enum.join("<span class=comentarios>",head,"</span>",res))
   def do_tokens(line,[head|tail],res) when Regex.match?(espacios,line), do: do_tokens(_line,tail,Enum.join("<span class=espacios>",head,"</span>",res))
end
