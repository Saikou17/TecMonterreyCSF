defmodule Syntax_Highlighter do
  @tokens [
    %{
      name: "reservadas",
      regex: ~r/\b^(import|def|if|len|sys|argv|with|open|as|file|read|print|elif|except|as|else|and|assert|break|class|contine|del|exec|finally|for|from|global|in|is|lambda|not|or|pass|raise|return|try|while|yield|open)\b/
    },
    %{
      name: "asignacion",
      regex: ~r/^(\+\=|\-\=|\|\=|\/{1,2}\=|\%\=|\*{1,2}\=|\<{2}\=|\>{2}\=|\&\=|\^\=|\=)/
    },
    %{
      name: "aritmeticos",
      regex: ~r/\B^(\+|\-|\*{1,2}|\/{1,2}|\%)\B/
    },
    %{
      name: "relacionales",
      regex: ~r/\B^(\>\=?|\<\=?|\={1,2}|\!\=)\B/
    },
    %{
      name: "bitabit",
      regex: ~r/^(\&|\||\^|\<{1,2}|>{1,2}|\/{1,2})/
    },
    %{
      name: "logicos",
      regex: ~r/\b^(and|or|not)\b/
    },
    %{
      name: "numeros",
      regex: ~r/\b^(\d\.(\d)*|\d)\b/
    },
    %{
      name: "booleanos",
      regex: ~r/\b^(True|False|None)\b/
    },
    %{
      name: "strings",
      regex: ~r/^(\".*\")/
    },
    %{
      name: "estructuras",
      regex: ~r/^(\[|\]|\(|\)|\{|\})/
    },
    %{
      name: "identificadores",
      regex: ~r/^([a-zA-Z]+(\_|\d)*)/
    },
    %{
      name: "comentarios",
      regex: ~r/^(\#.|\"{3}.|\'{3}.*)/
    },
    %{
      name: "espacios",
      regex: ~r/^\s+/
    }
  ]

  @inicio_html "<html>\n<head>\n<title>Python Syntax Highlighter</title>\n<link rel='stylesheet' href='./style.css'>\n</head>\n<body>\n<pre>\n"
  @final_html "</pre>\n</body>\n</html>"

  def concur_file(lst) do
    {time, result} = :timer.tc(fn ->
      tasks = Enum.map(lst, fn file -> Task.async(fn -> read_file(file) end) end)
      Enum.map(tasks, &Task.await(&1, :infinity))
    end)

    IO.puts("Execution time: #{time} microseconds")

    Enum.each(result, &IO.puts/1)
  end


  def read_file({in_python_file, out_python_file}) do
        data = in_python_file
        |> File.stream!() # Abrimos el archivo
        |> Enum.map(&tokens_regular_expresions(&1))# Obtenemos los tokens de cada linea
        |> Enum.join("") # Unimos los tokens

      File.write(out_python_file, Enum.join([@inicio_html, data, @final_html]))
  end
  def tokens_regular_expresions(line), do: do_tokens(line, "")

  defp do_tokens("", res), do: res

  defp do_tokens(line, res) do
    case Enum.find(@tokens, fn %{regex: regex} -> Regex.match?(regex, line) end) do
      nil ->
        do_tokens(String.slice(line, 1, String.length(line) - 1), res)
      %{name: name, regex: regex} ->
        [head | _tail] = Regex.run(regex, line)
        do_tokens(String.replace(line, head, ""), res <> "<span class='#{name}'>#{head}</span>")
    end
  end
end
