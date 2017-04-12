package main

import (
	"mj"
)

func main() {
	otherPlayer := [3]*mj.CMJ{}
	otherPlayer[0] = mj.NewCMJ()
	otherPlayer[1] = mj.NewCMJ()
	otherPlayer[2] = mj.NewCMJ()

	myPlayer := mj.NewCMJ()
	cm := mj.CMJManage{}
	score := 0

	cm.InitPai(0)

}
