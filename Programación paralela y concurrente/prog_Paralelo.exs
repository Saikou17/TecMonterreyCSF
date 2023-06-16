defmodule Hw.Primes do
  # Calculate the sum of prime numbers within a given range
  def range_sum({start, stop}) do
    start..stop                    # Create a range from start to stop
    |> Enum.filter(&is_prime/1)    # Filter the numbers within the range using is_prime function
    |> Enum.sum()                  # Calculate the sum of the filtered prime numbers
  end

  # Check if a number is prime
  defp is_prime(n) when n <= 1, do: false
  defp is_prime(n) when n <= 3, do: true
  defp is_prime(n) do
    not Enum.any?(2..(trunc(:math.sqrt(n))), fn x -> rem(n, x) == 0 end)
    # Check if there exists any number between 2 and the square root of n that divides n evenly
  end

  # Create subranges for parallel processing
  defp make_ranges(start, stop, num_threads) do
    step = div(stop - start, num_threads)  # Calculate the size of each subrange
    0..(num_threads - 1)
    |> Enum.map(fn i -> {start + i * step, start + (i + 1) * step - 1} end)
    # Create tuples representing subranges based on the step size and number of threads
  end

  # Calculate the sum of prime numbers in a given range
  def sum_primes(start, stop) do
    {time, result} = :timer.tc(fn ->
      {start, stop}  # Create a tuple representing the range
      |> range_sum() # Calculate the sum of prime numbers within the range
    end)

    IO.puts("Execution time: #{time} microseconds")
  end

  # Calculate the sum of prime numbers in parallel
  def sum_primes_parallel(start, stop, num_threads) do
    {time, result} = :timer.tc(fn ->
      make_ranges(start, stop, num_threads)        # Create subranges
      |> Enum.map(&Task.async(fn -> range_sum(&1) end))  # Run range_sum in parallel using Task.async
      |> Enum.map(&Task.await(&1, :infinity))  # Await the results of each task
      |> Enum.sum()   # Calculate the sum of the results
    end)

    IO.puts("Execution time: #{time} microseconds")
    IO.puts("Result: #{result}")
  end

end
