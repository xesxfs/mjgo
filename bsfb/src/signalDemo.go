package main

import (
	"fmt"
	"os"
	"os/signal"
)

func main() {
	closeSignal := make(chan os.Signal, 1)
	signal.Notify(closeSignal, os.Interrupt, os.Kill)
	sig := <-closeSignal
	fmt.Println("closeSignal!!", sig)

}
