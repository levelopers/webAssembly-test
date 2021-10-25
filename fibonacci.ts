export function fibonacci(n: i32): i32{
  return n<=1
      ?1
      :n<=2
          ?1
          :fibonacci(n-1)+fibonacci(n-2)
}