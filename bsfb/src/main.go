package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"
)

func sayHelloName(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	fmt.Println(r.Form)
	fmt.Println("path:", r.URL.Path)
	fmt.Println("Schem:", r.URL.Scheme)
	fmt.Println("url_long:", r.Form["url_long"])
	for k, v := range r.Form {
		fmt.Println("key:", k)
		fmt.Println("val:", strings.Join(v, ""))
	}

	fmt.Fprint(w, "Hello world")

}

func main() {
	http.HandleFunc("/", sayHelloName)
	err := http.ListenAndServe(":9091", nil)
	if err != nil {
		log.Fatal("ListenAndServe", err)
	}
}
