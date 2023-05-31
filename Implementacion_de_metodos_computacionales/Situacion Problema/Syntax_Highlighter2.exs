defmodule Syntax_Highlighter do
  @doc """
  Identificamos los tokens para las expresiones regulares.
  """
  p_reservadas = ~r/\b(import|def|if|len|sys|argv|with|open|as|file|read|print|elif|except|as|else|and|assert|break|class|contine|del|exec|finally|for|from|global|in|is|lambda|not|or|pass|raise|return|try|while|yield|open)\b/
  strings = ~r/\".*\"/
  numeros = ~r/[0-9]+/
  op_aritmeticos = ~r/\B(\+|\-|\*{1,2}|\/{1,2}|\%)\B/
  op_relacionales = ~r/\B(\>=?|\<=?|\={1,2}|\!=)\B/
  op_bit_a_bit = ~r/\&|\||\^|\<{1,2}|>{1,2}|\~/
  op_logicos = ~r/\b(and|or|not)\b/
  identificadores = ~r/[a-zA-Z][a-zA-Z0-9_]*/
  comentarios = ~r/\/\/.*$|\/\*.*\*\//
  espacios = ~r/\s+/
  asignacion = ~r(\+|\-|\|\/+|\%|\{1,2}|\<{1,2}|\>{1,2}|\&|\||\^|\?|\=)
  booleanos = ~r/\b(True|False|None)\b/
  estructuras = ~r/(\[.*\]|\(.*\)|\{.*\})/
  @start "<html>\n<head>\n<title>Python Syntax Highlighter</title>\n<link = 'stylesheet' href= './SituacionProblema/style.css'>\n</head>\n<body>\n<pre>\n"
  @finish "</pre>\n</body>\n</html>"

  def read_file(in_python_file, out_python_file) do
    {time, _result} = :timer.tc(fn ->
      in_python_file
      |> File.stream!()
      |> Enum.map(&tokens_regular_expresions(&1))
      |> Enum.join("")
      |> write_to_html_file(out_python_file)
    end)

    IO.puts "Tiempo de ejecución: #{time} microsegundos"
  end

  defp tokens_regular_expresions(line) do
    do_tokens(line, [])
  end

  defp do_tokens(line, "") do
    cond do
      # Palabras reservadas
      Regex.match?(p_reservadas, line) ->
        current = Regex.replace(p_reservadas, line, "<span class=\"p_reservadas\">\\0</span>")
        do_tokens(current, [])
      # Strings
      Regex.match?(strings, line) ->
        current = Regex.replace(strings, line, "<span class=\"strings\">\\0</span>")
        do_tokens(current, [])
      # Numeros
      Regex.match?(numeros, line) ->
        current = Regex.replace(numeros, line, "<span class=\"numeros\">\\0</span>")
        do_tokens(current, [])
      # Operadores aritmeticos
      Regex.match?(op_aritmeticos, line) ->
        current = Regex.replace(op_aritmeticos, line, "<span class=\"op_aritmeticos\">\\0</span>")
        do_tokens(current, [])
      # Operadores relacionales
      Regex.match?(op_relacionales, line) ->
        current = Regex.replace(op_relacionales, line, "<span class=\"op_relacionales\">\\0</span>")
        do_tokens(current, [])
      # Operadores bit a bit
      Regex.match?(op_bit_a_bit, line) ->
        current = Regex.replace(op_bit_a_bit, line, "<span class=\"op_bit_a_bit\">\\0</span>")
        do_tokens(current, [])
      # Identificadores
      Regex.match?(identificadores, line) ->
        current = Regex.replace(identificadores, line, "<span class=\"identificadores\">\\0</span>")
        do_tokens(current, [])
      # Comentarios
      Regex.match?(comentarios, line) ->
        current = Regex.replace(comentarios, line, "<span class=\"comentarios\">\\0</span>")
        do_tokens(current, [])
      # Espacios
      Regex.match?(espacios, line) ->
        current = Regex.replace(espacios, line, "<span class=\"espacios\">\\0</span>")
        do_tokens(current, [])
      # Asignacion
      Regex.match?(asignacion, line) ->
        current = Regex.replace(asignacion, line, "<span class=\"asignacion\">\\0</span>")
        do_tokens(current, [])
    end
  end

  defp write_to_html_file(data, out_python_file) do
    html_content = "#{@start}#{data}#{@finish}"
    File.write(out_python_file, html_content)
  end
end
