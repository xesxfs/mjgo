package main

import (
	"fmt"
	"mj"
)

func main() {
	otherPlayer := [3]*mj.CMJ{}
	otherPlayer[0] = mj.NewCMJ()
	otherPlayer[1] = mj.NewCMJ()
	otherPlayer[2] = mj.NewCMJ()

	myPlayer := mj.NewCMJ()
	cm := mj.CMJManage{}
	// score := 0

	// GameStart:

	cm.InitPai(0)
	myPlayer.CleanUp()
	for i := 0; i < 3; i++ {
		otherPlayer[i].CleanUp()
	}

	fmt.Println("洗牌完成")
	fmt.Println("起牌:========================================================")

	for i := 0; i < 13; i++ {

		tPaiEx := cm.GetAPai()

		fmt.Println(tPaiEx)
		myPlayer.AddPai(tPaiEx.NewPai.mType, tPaiEx.NewPai.mValue)
		for j := 0; j < 3; j++ {
			tPai2 := cm.GetAPai()
			// otherPlayer[j].AddPai(tPai2.mNewPai.mType, tPai2.mNewPai.mValue)
			fmt.Println(tPai2)
		}

	}

	// bFinish := false
	// bTing := false
	// for !bFinish {

	// }

}
