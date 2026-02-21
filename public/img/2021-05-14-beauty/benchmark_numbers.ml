
let rec generateNumbers i acc = if i = 0 then acc else string_of_int i :: acc

let nums = generateNumbers 1000000 []

let time f x =
  let t = Sys.time() in
  f x |> ignore;
  Printf.printf "Benchmark took %fµs\n" ((Sys.time() -. t) *. 1000000.);
  ()


let _ = time (List.fold_left (fun acc i -> i |> int_of_string |> ( + ) acc) 0) nums
