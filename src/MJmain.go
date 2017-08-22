package main

import (
	"fmt"
	"mj"
)

func main() {
	otherPlayer := [3]*mj.MJ{}
	otherPlayer[0] = mj.NewMJ()
	otherPlayer[1] = mj.NewMJ()
	otherPlayer[2] = mj.NewMJ()

	myPlayer := mj.NewMJ()
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

		// fmt.Println(tPaiEx)
		myPlayer.AddPai(tPaiEx.NewPai.Type, tPaiEx.NewPai.Value)
		for j := 0; j < 3; j++ {
			tPai2 := cm.GetAPai()
			otherPlayer[j].AddPai(tPai2.NewPai.Type, tPai2.NewPai.Value)
			// fmt.Println(tPai2)
		}

	}

	myPlayer.Init()
	for i := 0; i < 3; i++ {
		otherPlayer[i].Init()
	}

	bFinish := false
	bTing := false
	for !bFinish {
		myPlayer.PrintAllPai()
		fmt.Println()
		fmt.Println("起牌:========================================================")
		var pai mj.PAIEX
		pai = cm.GetAPai()
		myPlayer.PrintPai(pai.NewPai.Type, pai.NewPai.Value)
		fmt.Println()

		if !bTing {
			fmt.Print("要还是打？Y/N")
			var result string
			fmt.Scanf("%s", &result)

			if result == "Y" || result == "y" {

				myPlayer.AddPai(pai.NewPai.Type, pai.NewPai.Value)
				bFinish = myPlayer.CheckHU()
				if bFinish {
					fmt.Println("胡啦!!!")
				} else {
					if pai.NewPai.Type == -1 {
						fmt.Println()
						fmt.Println("黄庄了！！！！！！！！！！！！！")
						break
					}
					fmt.Println("Yes")
					myPlayer.PrintAllPai()
					fmt.Println()
				OUTPai:
					fmt.Println("请打牌（输入牌序号）")
					var PaiIndex int
					fmt.Scanf("%d", &PaiIndex)
					fmt.Println("PaiIndex:", PaiIndex)
					if !myPlayer.DelPaiByIndex(PaiIndex) {
						fmt.Println("没有此牌")
						goto OUTPai

					}
					fmt.Println("牌面刷新============================")
					myPlayer.PrintAllPai()
					fmt.Println()

				}
			} else {

			}

		} else {
			//包听

		}

		for j := 0; j < 3; j++ {
			pai2 := cm.GetAPai()
			if j == 0 {
				fmt.Print("南家起牌出牌：")
				myPlayer.PrintPai(pai2.NewPai.Type, pai2.NewPai.Value)
				fmt.Println()
			}

			if j == 1 {
				fmt.Print("西家起牌出牌：")
				myPlayer.PrintPai(pai2.NewPai.Type, pai2.NewPai.Value)
				fmt.Println()
			}
			if j == 2 {
				fmt.Print("北家起牌出牌：")
				myPlayer.PrintPai(pai2.NewPai.Type, pai2.NewPai.Value)
				fmt.Println()
			}

		}
		bFinish = true
	}

}
