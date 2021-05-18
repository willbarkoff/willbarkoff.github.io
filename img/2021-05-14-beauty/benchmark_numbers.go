package main

import (
	"fmt"
	"strconv"
	"time"
)

func main() {
	nums := generateNumbers(1000000)

	start := time.Now()

	sum := 0
	for _, v := range nums {
		intVal, _ := strconv.Atoi(v)
		sum += intVal
	}

	elapsed := time.Since(start)
	fmt.Printf("Benchmark took %s\n", elapsed)
}

func generateNumbers(number int) []string {
	nums := []string{}
	for i := 1; i <= number; i++ {
		nums = append(nums, strconv.Itoa(i))
	}

	return nums
}
