package mj

import (
	"fmt"
	"sort"
)

const (
	MJPAI_ZFB = iota
	MJPAI_FENG
	MJPAI_WAN
	MJPAI_TIAO
	MJPAI_BING
	MJPAI_HUA

	MJPAI_GETPAI = true
	MJPAI_PUTPAI = false
)

type stPAI struct {
	mType  int
	mValue int
}

type stCHI struct {
	mType   int
	mValue1 int
	mValue2 int
	mValue3 int
}

type stGoodInfo struct {
	mGoodName  string
	mGoodValue int
}

type VecPai []stPAI

type CMJ struct {
	mMyPAvec   [6][]int
	mChiPAvec  [6][]int
	mPengPAvec [6][]int
	mGangPAvec [6][]int

	mLastPAI  stPAI
	mGoodInfo stGoodInfo

	mMkNum int
	mAkNum int
	m9LBD  bool
	m13Y   bool
	m4Ak   bool

	mTempChiPAvec  []stCHI
	mTempPengPAvec []stPAI
	mTempGangPAvec []stPAI
}

func PrintSpace(icount int) {
	fmt.Println()
	for i := 0; i < icount; i++ {
		fmt.Print("     ")
	}
}

func NewCMJ() *CMJ {
	mj := CMJ{}
	return &mj
}

func (mj *CMJ) init() {
	mj.m9LBD = false
	mj.m13Y = false
	mj.m4Ak = false
	mj.mAkNum = 0
	mj.mAkNum = 0

}

func (mj *CMJ) Check() {

}

func (mj *CMJ) AddPai(pType int, pValue int) bool {
	mj.mMyPAvec[pType] = append(mj.mMyPAvec[pType], pValue)
	sort.Sort(sort.IntSlice(mj.mMyPAvec[pType]))
	mj.mLastPAI.mType = pType
	mj.mLastPAI.mValue = pValue

	return true
}

func (mj *CMJ) GetPaiIndex(pType int, pValue int) int {
	count := 0
	for i := 0; i < 6; i++ {
		pavec := mj.mMyPAvec[i]
		for j := 0; j < len(pavec); j++ {

			if i == pType && pavec[j] == pValue {
				return count
			}
			count++
		}
	}
	return -1
}

func (mj *CMJ) DelPai(pType int, pValue int) bool {
	for i, value := range mj.mMyPAvec[pType] {
		if value == pValue {
			if i == 0 {
				mj.mMyPAvec[pType] = mj.mMyPAvec[pType][i+1:]
			} else if i == (len(mj.mMyPAvec[pType]) - 1) {
				mj.mMyPAvec[pType] = mj.mMyPAvec[pType][:len(mj.mMyPAvec[pType])-1]
			} else {
				mj.mMyPAvec[pType] = append(mj.mMyPAvec[pType][:i], mj.mMyPAvec[pType][i+1:]...)
			}

			return true
		}
	}
	return false
}

func (mj *CMJ) CleanUp() {
	for i := 0; i < 6; i++ {
		mj.mMyPAvec[i] = make([]int, 14)
	}

}

func (mj *CMJ) GetInfo() *stGoodInfo {
	return &mj.mGoodInfo
}

func (mj *CMJ) PrintAllPai() {
	fmt.Print(" ")
	for i := 0; i < 13; i++ {
		fmt.Print(i, "  - ")
	}
	fmt.Println()
	icount := 0
	if len(mj.mMyPAvec[0]) > 0 {
		for _, iter := range mj.mMyPAvec[0] {
			switch iter {
			case 1:
				fmt.Print("[ 中]")
			case 2:
				fmt.Print("[ 发]")
			case 3:
				fmt.Print("[ 白]")

			}
			icount++
		}
	}
	PrintSpace(icount)

	if len(mj.mMyPAvec[1]) > 0 {
		for _, iter := range mj.mMyPAvec[1] {
			switch iter {
			case 1:
				fmt.Print("[ 东]")
			case 2:
				fmt.Print("[ 南]")
			case 3:
				fmt.Print("[ 西]")
			case 4:
				fmt.Print("[ 北]")

			}
			icount++
		}
	}
	PrintSpace(icount)

	if len(mj.mMyPAvec[2]) > 0 {
		for _, iter := range mj.mMyPAvec[2] {
			fmt.Printf("[%d万]", iter)
			icount++
		}
	}
	PrintSpace(icount)

	if len(mj.mMyPAvec[3]) > 0 {
		for _, iter := range mj.mMyPAvec[3] {
			fmt.Printf("[%d条]", iter)
			icount++
		}
	}
	PrintSpace(icount)

	if len(mj.mMyPAvec[4]) > 0 {
		for _, iter := range mj.mMyPAvec[4] {
			fmt.Printf("[%d筒]", iter)
			icount++
		}
	}
	PrintSpace(icount)

}

func (mj *CMJ) PrintPai(pType int, pValue int) {
	if pType == 0 {
		switch pValue {
		case 1:
			fmt.Print("[ 中]")
		case 2:
			fmt.Print("[ 发]")
		case 3:
			fmt.Print("[ 白]")
		}
	}

	if pType == 1 {
		switch pValue {
		case 1:
			fmt.Print("[ 东]")
		case 2:
			fmt.Print("[ 南]")
		case 3:
			fmt.Print("[ 西]")
		case 4:
			fmt.Print("[ 北]")

		}
	}

	if pType == 2 {
		fmt.Printf("[%d万]", pValue)
	}

	if pType == 3 {
		fmt.Printf("[%d条]", pValue)
	}

	if pValue == 4 {
		fmt.Printf("[%d筒]", pValue)
	}

}

func (mj *CMJ) CheckChiPai(pType int, pValue int) bool {
	mj.mTempChiPAvec = mj.mTempChiPAvec[0:0]
	if len(mj.mMyPAvec[pType]) > 0 {
		size := len(mj.mMyPAvec[pType])
		if size >= 2 {
			for i := 0; i < size-1; i++ {
				//XBC
				if mj.mMyPAvec[pType][i] == (pValue+1) && mj.mMyPAvec[pType][i+1] == (pValue+2) {
					chi := stCHI{}
					chi.mType = pType
					chi.mValue1 = pValue
					chi.mValue2 = pValue + 1
					chi.mValue3 = pValue + 2
					mj.mTempChiPAvec = append(mj.mTempChiPAvec, chi)
				}
				//AXC
				if mj.mMyPAvec[pType][i] == (pValue-1) && mj.mMyPAvec[pType][i+1] == (pValue+1) {
					chi := stCHI{}
					chi.mType = pType
					chi.mValue1 = pValue - 1
					chi.mValue2 = pValue
					chi.mValue3 = pValue + 1
					mj.mTempChiPAvec = append(mj.mTempChiPAvec, chi)

				}
				//ABX
				if mj.mMyPAvec[pType][i] == (pValue-1) && mj.mMyPAvec[pType][i+1] == (pValue-2) {
					chi := stCHI{}
					chi.mType = pType
					chi.mValue1 = pValue - 2
					chi.mValue2 = pValue - 1
					chi.mValue3 = pValue
					mj.mTempChiPAvec = append(mj.mTempChiPAvec, chi)

				}

			}
		}

		//ABC
		if size >= 3 {
			for i := 1; i < size-1; i++ {
				if mj.mMyPAvec[pType][i-1] == (pValue-1) && mj.mMyPAvec[pType][i] == (pValue) && mj.mMyPAvec[pType][i+1] == (pValue+1) {
					chi := stCHI{}
					chi.mType = pType
					chi.mValue1 = pValue - 1
					chi.mValue2 = pValue
					chi.mValue3 = pValue + 1
					mj.mTempChiPAvec = append(mj.mTempChiPAvec, chi)

				}

			}

		}
		//ABBC
		if size >= 4 {
			for i := 1; i < size-2; i++ {
				if mj.mMyPAvec[pType][i-1] == (pValue-1) && mj.mMyPAvec[pType][i] == pValue && mj.mMyPAvec[pType][i+2] == (pValue+1) {
					chi := stCHI{}
					chi.mType = pType
					chi.mValue1 = pValue - 1
					chi.mValue2 = pValue
					chi.mValue3 = pValue + 1
					mj.mTempChiPAvec = append(mj.mTempChiPAvec, chi)

				}

			}

		}
		//ABBBC
		if size >= 5 {
			for i := 1; i < size-3; i++ {
				if mj.mMyPAvec[pType][i-1] == (pValue-1) && mj.mMyPAvec[pType][i] == pValue && mj.mMyPAvec[pType][i+3] == (pValue+1) {
					chi := stCHI{}
					chi.mType = pType
					chi.mValue1 = pValue - 1
					chi.mValue2 = pValue
					chi.mValue3 = pValue + 1
					mj.mTempChiPAvec = append(mj.mTempChiPAvec, chi)

				}

			}
		}
		if len(mj.mTempChiPAvec) > 0 {
			return true
		}

	}
	return false
}

func (mj *CMJ) DoChiPai(pIndex int, pType int, pValue int) bool {
	mj.AddPai(pType, pValue)
	icount := 0
	for _, iter := range mj.mTempChiPAvec {
		if icount == pIndex {
			mj.DelPai(iter.mType, iter.mValue1)
			mj.DelPai(iter.mType, iter.mValue2)
			mj.DelPai(iter.mType, iter.mValue3)

			mj.mChiPAvec[iter.mType] = append(mj.mChiPAvec[iter.mType], iter.mValue1)
			mj.mChiPAvec[iter.mType] = append(mj.mChiPAvec[iter.mType], iter.mValue2)
			mj.mChiPAvec[iter.mType] = append(mj.mChiPAvec[iter.mType], iter.mValue3)

			return true
		}
		icount++
	}
	return false
}

func (mj *CMJ) PrintChiChosePai() {
	fmt.Println("================吃牌组合=======================")

	for _, iter := range mj.mTempChiPAvec {
		if iter.mType == MJPAI_WAN {
			fmt.Printf("[%d万 %d万 %d万]", iter.mValue1, iter.mValue2, iter.mValue3)
		}

		if iter.mType == MJPAI_TIAO {
			fmt.Printf("[%d条 %d条 %d条]", iter.mValue1, iter.mValue2, iter.mValue3)
		}

		if iter.mType == MJPAI_BING {
			fmt.Printf("[%d筒 %d筒 %d筒]", iter.mValue1, iter.mValue2, iter.mValue3)
		}

	}

	fmt.Printf("\n=============================================\n")
}

func (mj *CMJ) GetChiChoseNum() int {
	return len(mj.mTempChiPAvec)
}

func (mj *CMJ) CheckPengPai(pType int, pValue int) bool {

	if len(mj.mMyPAvec[pType]) > 0 {
		size := len(mj.mMyPAvec[pType])
		if size >= 2 {
			for i := 0; i < size-1; i++ {
				if mj.mMyPAvec[pType][i] == pValue && mj.mMyPAvec[pType][i+1] == pValue {
					tPeng := stPAI{}
					tPeng.mType = pType
					tPeng.mValue = pValue
					mj.mTempPengPAvec = append(mj.mTempPengPAvec, tPeng)
					return true
				}

			}

		}
	}
	return false
}

func (mj *CMJ) DoPengPai(pType int, pValue int) bool {
	mj.AddPai(pType, pValue)
	for i := 0; i < len(mj.mTempPengPAvec); i++ {
		pengPai := mj.mTempPengPAvec[i]
		mj.DelPai(pengPai.mType, pengPai.mValue)
		mj.DelPai(pengPai.mType, pengPai.mValue)
		mj.DelPai(pengPai.mType, pengPai.mValue)

		mj.mPengPAvec[pengPai.mType] = append(mj.mPengPAvec[pengPai.mType], pengPai.mValue)
		mj.mPengPAvec[pengPai.mType] = append(mj.mPengPAvec[pengPai.mType], pengPai.mValue)
		mj.mPengPAvec[pengPai.mType] = append(mj.mPengPAvec[pengPai.mType], pengPai.mValue)
		return true
	}
	return false
}

func (mj *CMJ) PrintPengChosePai() {
	fmt.Println("=====================碰牌==================")
	for _, iter := range mj.mTempPengPAvec {

		if iter.mType == MJPAI_WAN {
			fmt.Printf("[%d万 %d万 %d万]", iter.mValue, iter.mValue, iter.mValue)
		}

		if iter.mType == MJPAI_TIAO {
			fmt.Printf("[%d条 %d条 %d条]", iter.mValue, iter.mValue, iter.mValue)
		}

		if iter.mType == MJPAI_BING {
			fmt.Printf("[%d筒 %d筒 %d筒]", iter.mValue, iter.mValue, iter.mValue)
		}

	}
	fmt.Printf("\n=============================================\n")

}

func (mj *CMJ) CheckGangPai(pType int, pValue int) bool {
	mj.mTempGangPAvec = mj.mTempPengPAvec[0:0]
	if len(mj.mMyPAvec[pType]) > 0 {
		size := len(mj.mMyPAvec[pType])
		if size >= 3 {
			for i := 0; i < size-2; i++ {
				if mj.mMyPAvec[pType][i] == pValue && mj.mMyPAvec[pType][i+1] == pValue && mj.mMyPAvec[pType][i-2] == pValue {
					tGang := stPAI{}
					tGang.mType = pType
					tGang.mValue = pValue
					mj.mTempGangPAvec = append(mj.mTempGangPAvec, tGang)
					return true
				}

			}

		}
	}
	return false
}

func (mj *CMJ) DoGangPai(pType int, pValue int) bool {
	mj.AddPai(pType, pValue)
	for i := 0; i < len(mj.mTempGangPAvec); i++ {
		gangPai := mj.mTempGangPAvec[i]

		mj.DelPai(gangPai.mType, gangPai.mValue)
		mj.DelPai(gangPai.mType, gangPai.mValue)
		mj.DelPai(gangPai.mType, gangPai.mValue)
		mj.DelPai(gangPai.mType, gangPai.mValue)

		mj.mGangPAvec[pType] = append(mj.mGangPAvec[pType], gangPai.mValue)
		mj.mGangPAvec[pType] = append(mj.mGangPAvec[pType], gangPai.mValue)
		mj.mGangPAvec[pType] = append(mj.mGangPAvec[pType], gangPai.mValue)
		mj.mGangPAvec[pType] = append(mj.mGangPAvec[pType], gangPai.mValue)
		return true
	}
	return false
}

func (mj *CMJ) PrintGangChosePai() {

	fmt.Println("=====================杠牌==================")
	for _, iter := range mj.mTempPengPAvec {

		if iter.mType == MJPAI_WAN {
			fmt.Printf("[%d万 %d万 %d万]", iter.mValue, iter.mValue, iter.mValue)
		}

		if iter.mType == MJPAI_TIAO {
			fmt.Printf("[%d条 %d条 %d条]", iter.mValue, iter.mValue, iter.mValue)
		}

		if iter.mType == MJPAI_BING {
			fmt.Printf("[%d筒 %d筒 %d筒]", iter.mValue, iter.mValue, iter.mValue)
		}

	}
	fmt.Printf("\n=============================================\n")
}

func (mj *CMJ) CheckAAPai(value1 int, value2 int) bool {
	if value1 == value2 {
		return true
	}
	return false
}

func (mj *CMJ) CheckABCPai(value1 int, value2 int, value3 int) bool {
	if value1 == (value2-1) && value2 == (value3-1) {
		return true
	}
	return false

}

func (mj *CMJ) CheckAAAPai(value1 int, value2 int, value3 int) bool {
	if value1 == (value2) && value2 == (value3) {
		return true
	}
	return false
}

func (mj *CMJ) CheckAAAAPai(value1 int, value2 int, value3 int, value4 int) bool {
	if value1 == (value2) && value2 == (value3) && value3 == value4 {
		return true
	}
	return false

}

func (mj *CMJ) CheckAABBCCPai(value1 int, value2 int, value3 int, value4 int, value5 int, value6 int) bool {
	if value1 == value2 && value3 == value4 && value5 == value6 {
		if value1 == (value3-1) && value3 == (value5-1) {

			return true
		}

	}
	return false

}

func (mj *CMJ) CheckAAABBBCCCPai(value1 int, value2 int, value3 int, value4 int, value5 int, value6 int, value7 int, value8 int, value9 int) bool {
	if (value1 == value2 && value2 == value3) && (value4 == value5 && value5 == value6) && (value7 == value8 && value8 == value9) {
		if (value1 == value4-1) && (value4 == value7-1) {
			return true
		}
	}
	return false
}

func (mj *CMJ) CheckAAAABBBBCCCCPai(value1 int, value2 int, value3 int, value4 int, value5 int, value6 int, value7 int, value8 int, value9 int, value10 int, value11 int, value12 int) bool {
	if (value1 == value2 && value2 == value3 && value3 == value4) && (value5 == value6 && value6 == value7 && value7 == value8) && (value9 == value10 && value10 == value11 && value11 == value12) {

		if (value1 == value5-1) && (value5 == value9-1) {
			return true
		}

	}
	return false
}

func (mj *CMJ) CheckAABBCCDDEEFFPai(value1 int, value2 int, value3 int, value4 int, value5 int, value6 int, value7 int, value8 int, value9 int, value10 int, value11 int, value12 int) bool {
	if value1 == value2 && value3 == value4 && value5 == value6 && value7 == value8 && value9 == value10 && value11 == value12 {
		if (value1 == value3-1) && (value3 == value5-1) && (value5 == value7-1) && (value7 == value9-1) && (value9 == value11-1) {
			return true
		}

	}
	return false
}

func (mj *CMJ) Check3Pai(value1 int, value2 int, value3 int) bool {
	if mj.CheckAAAPai(value1, value2, value3) {
		return true
	}
	if mj.CheckABCPai(value1, value2, value3) {
		return true
	}
	return false
}
func (mj *CMJ) Check5Pai(value1 int, value2 int, value3 int, value4 int, value5 int) bool {
	if mj.CheckAAPai(value1, value2) {
		if mj.Check3Pai(value3, value4, value5) {
			return true
		}
	}

	if mj.CheckAAPai(value4, value5) {
		if mj.Check3Pai(value1, value2, value3) {
			return true
		}
	}

	if mj.CheckAAAPai(value2, value3, value4) {
		if mj.CheckABCPai(value1, value4, value5) {
			return true
		}
	}
	return false
}

func (mj *CMJ) Check6Pai(value1 int, value2 int, value3 int, value4 int, value5 int, value6 int) bool {
	if mj.Check3Pai(value1, value2, value3) && mj.Check3Pai(value4, value5, value6) {
		return true
	}
	if mj.CheckAABBCCPai(value1, value2, value3, value4, value5, value6) {
		return true
	}
	//特殊牌型 AAAABC
	if mj.CheckAAAAPai(value1, value2, value3, value4) {
		if mj.CheckABCPai(value1, value5, value6) {
			return true
		}
	}
	return false
}

func (mj *CMJ) Check8Pai(value1 int, value2 int, value3 int, value4 int, value5 int, value6 int, value7 int, value8 int) bool {
	if mj.CheckAAPai(value1, value2) {
		return mj.Check6Pai(value3, value4, value5, value6, value7, value8)
	}

	if mj.CheckAAPai(value4, value5) {
		if mj.Check3Pai(value1, value2, value3) && mj.Check3Pai(value6, value7, value8) {
			return true
		}
	}
	if mj.CheckAAPai(value7, value8) {
		return mj.Check6Pai(value1, value2, value3, value4, value5, value6)
	}
	return false
}

func (mj *CMJ) Check9Pai(value1 int, value2 int, value3 int, value4 int, value5 int, value6 int, value7 int, value8 int, value9 int) bool {
	if mj.CheckABCPai(value1, value2, value3) && mj.Check6Pai(value4, value5, value6, value7, value8, value9) {
		return true
	}
	if mj.CheckAAAPai(value1, value2, value3) && mj.Check6Pai(value4, value5, value6, value7, value8, value9) {
		return true
	}
	if mj.CheckABCPai(value7, value8, value9) && mj.Check6Pai(value1, value2, value3, value4, value5, value6) {
		return true
	}
	if mj.CheckAAAPai(value7, value8, value9) && mj.Check6Pai(value1, value2, value3, value4, value5, value6) {
		return true
	}
	return false

}

func (mj *CMJ) Check11Pai(value1 int, value2 int, value3 int, value4 int, value5 int, value6 int, value7 int, value8 int, value9 int, value10 int, value11 int) bool {
	if mj.CheckAAPai(value1, value2) {
		return mj.Check9Pai(value3, value4, value5, value6, value7, value8, value9, value10, value11)
	}

	if mj.CheckAAPai(value10, value11) {
		return mj.Check9Pai(value1, value2, value3, value4, value5, value6, value7, value8, value9)
	}

	if mj.CheckAAPai(value4, value5) {
		if mj.Check3Pai(value1, value2, value3) && mj.Check6Pai(value6, value7, value8, value9, value10, value11) {
			return true
		}
	}

	if mj.CheckAAPai(value7, value8) {
		if mj.Check3Pai(value9, value10, value11) && mj.Check6Pai(value1, value2, value3, value4, value5, value6) {
			return true
		}
	}
	return false
}

func (mj *CMJ) Check12Pai(value1 int, value2 int, value3 int, value4 int, value5 int, value6 int, value7 int, value8 int, value9 int, value10 int, value11 int, value12 int) bool {

	if mj.CheckABCPai(value1, value2, value3) && mj.Check9Pai(value4, value5, value6, value7, value8, value9, value10, value11, value12) {
		return true
	}
	if mj.CheckAAAPai(value1, value2, value3) && mj.Check9Pai(value4, value5, value6, value7, value8, value9, value10, value11, value12) {
		return true
	}
	if mj.CheckABCPai(value10, value11, value12) && mj.Check9Pai(value1, value2, value3, value4, value5, value6, value7, value8, value9) {
		return true
	}
	if mj.CheckAAAPai(value10, value11, value12) && mj.Check9Pai(value1, value2, value3, value4, value5, value6, value7, value8, value9) {
		return true
	}
	if mj.Check6Pai(value1, value2, value3, value4, value5, value6) && mj.Check6Pai(value7, value8, value9, value10, value11, value12) {
		return true
	}

	return false
}

func (mj *CMJ) Check14Pai(value1 int, value2 int, value3 int, value4 int, value5 int, value6 int, value7 int, value8 int, value9 int, value10 int, value11 int, value12 int, value13 int, value14 int) bool {
	if mj.CheckAAPai(value1, value2) {
		return mj.Check12Pai(value3, value4, value5, value6, value7, value8, value9, value10, value11, value12, value13, value14)
	}

	if mj.CheckAAPai(value4, value5) {
		if mj.Check3Pai(value1, value2, value3) && mj.Check9Pai(value6, value7, value8, value9, value10, value11, value12, value13, value14) {
			return true
		}
	}

	if mj.CheckAAPai(value7, value8) {
		if mj.Check6Pai(value1, value2, value3, value4, value5, value6) && mj.Check6Pai(value9, value10, value11, value12, value13, value14) {
			return true
		}
	}

	if mj.CheckAAPai(value10, value11) {
		if mj.Check9Pai(value1, value2, value3, value4, value5, value6, value7, value8, value9) && mj.Check3Pai(value12, value13, value14) {
			return true
		}
	}

	if mj.CheckAAPai(value13, value14) {
		return mj.Check12Pai(value1, value2, value3, value4, value5, value6, value7, value8, value9, value10, value11, value12)
	}

	if mj.CheckAAPai(value13, value14) {
		return mj.Check12Pai(value1, value2, value3, value4, value5, value6, value7, value8, value9, value10, value11, value12)
	}
	return false
}

func (mj *CMJ) CheckAllPai(GetOrPut bool) {
	if GetOrPut {

	}
}

func (mj *CMJ) CheckHU() bool {
	// tOk := false
	iJinagNum := 0
	//中发白
	iSize := len(mj.mMyPAvec[MJPAI_ZFB])
	if iSize > 0 {
		zfbPai := mj.mMyPAvec[0]
		if iSize == 2 {
			if !mj.CheckAAPai(zfbPai[0], zfbPai[1]) {
				return false
			} else {
				iJinagNum++
			}
		} else if iSize == 3 {
			if !mj.CheckAAAPai(zfbPai[0], zfbPai[1], zfbPai[2]) {
				return false
			}

		} else if iSize == 5 {
			if mj.CheckAAPai(zfbPai[0], zfbPai[1]) && mj.CheckAAAPai(zfbPai[3], zfbPai[4], zfbPai[5]) {
				iJinagNum++
			} else if mj.CheckAAAPai(zfbPai[0], zfbPai[1], zfbPai[1]) && mj.CheckAAPai(zfbPai[4], zfbPai[5]) {
				iJinagNum++
			} else {
				return false
			}

		} else if iSize == 8 {
			if mj.CheckAAPai(zfbPai[0], zfbPai[1]) && mj.CheckAAAPai(zfbPai[2], zfbPai[3], zfbPai[4]) && mj.CheckAAAPai(zfbPai[5], zfbPai[6], zfbPai[7]) {
				iJinagNum++
			} else if mj.CheckAAAPai(zfbPai[0], zfbPai[1], zfbPai[2]) && mj.CheckAAPai(zfbPai[3], zfbPai[4]) && mj.CheckAAAPai(zfbPai[5], zfbPai[6], zfbPai[7]) {
				iJinagNum++
			} else if mj.CheckAAAPai(zfbPai[0], zfbPai[1], zfbPai[2]) && mj.CheckAAAPai(zfbPai[3], zfbPai[4], zfbPai[5]) && mj.CheckAAPai(zfbPai[6], zfbPai[7]) {
				iJinagNum++
			} else {
				return false
			}

		} else if iSize == 11 {
			if mj.CheckAAPai(zfbPai[0], zfbPai[1]) && mj.CheckAAAPai(zfbPai[2], zfbPai[3], zfbPai[4]) && mj.CheckAAAPai(zfbPai[5], zfbPai[6], zfbPai[7]) && mj.CheckAAAPai(zfbPai[8], zfbPai[9], zfbPai[10]) {
				iJinagNum++
			} else if mj.CheckAAAPai(zfbPai[0], zfbPai[1], zfbPai[2]) && mj.CheckAAPai(zfbPai[3], zfbPai[4]) && mj.CheckAAAPai(zfbPai[5], zfbPai[6], zfbPai[7]) && mj.CheckAAAPai(zfbPai[8], zfbPai[9], zfbPai[10]) {
				iJinagNum++
			} else if mj.CheckAAAPai(zfbPai[0], zfbPai[1], zfbPai[2]) && mj.CheckAAAPai(zfbPai[3], zfbPai[4], zfbPai[5]) && mj.CheckAAPai(zfbPai[6], zfbPai[7]) && mj.CheckAAAPai(zfbPai[8], zfbPai[9], zfbPai[10]) {
				iJinagNum++

			} else if mj.CheckAAAPai(zfbPai[0], zfbPai[1], zfbPai[2]) && mj.CheckAAAPai(zfbPai[3], zfbPai[4], zfbPai[5]) && mj.CheckAAAPai(zfbPai[6], zfbPai[7], zfbPai[8]) && mj.CheckAAPai(zfbPai[9], zfbPai[10]) {
				iJinagNum++

			} else {
				return false
			}

		} else {
			return false
		}

	}
	//东南西北
	iSize = len(mj.mMyPAvec[1])
	if iSize > 0 {
		dnsbPai := mj.mMyPAvec[1]
		if iSize == 2 {
			if !mj.CheckAAPai(dnsbPai[0], dnsbPai[1]) {
				return false
			} else {
				iJinagNum++
			}
		} else if iSize == 3 {
			if !mj.CheckAAAPai(dnsbPai[0], dnsbPai[1], dnsbPai[2]) {
				return false
			}
		} else if iSize == 5 {
			if mj.CheckAAPai(dnsbPai[0], dnsbPai[1]) && mj.CheckAAAPai(dnsbPai[0], dnsbPai[1], dnsbPai[2]) {
				iJinagNum++
			} else if mj.CheckAAAPai(dnsbPai[0], dnsbPai[1], dnsbPai[2]) && mj.CheckAAPai(dnsbPai[0], dnsbPai[1]) {
				iJinagNum++
			} else {
				return false
			}
		} else if iSize == 8 {
			if mj.CheckAAPai(dnsbPai[0], dnsbPai[1]) && mj.CheckAAAPai(dnsbPai[2], dnsbPai[3], dnsbPai[4]) && mj.CheckAAAPai(dnsbPai[5], dnsbPai[6], dnsbPai[7]) {
				iJinagNum++
			} else if mj.CheckAAAPai(dnsbPai[0], dnsbPai[1], dnsbPai[2]) && mj.CheckAAPai(dnsbPai[3], dnsbPai[4]) && mj.CheckAAAPai(dnsbPai[5], dnsbPai[6], dnsbPai[7]) {
				iJinagNum++
			} else if mj.CheckAAAPai(dnsbPai[0], dnsbPai[1], dnsbPai[2]) && mj.CheckAAAPai(dnsbPai[3], dnsbPai[4], dnsbPai[5]) && mj.CheckAAPai(dnsbPai[6], dnsbPai[7]) {
				iJinagNum++
			} else {
				return false
			}

		} else if iSize == 11 {
			if mj.CheckAAPai(dnsbPai[0], dnsbPai[1]) && mj.CheckAAAPai(dnsbPai[2], dnsbPai[3], dnsbPai[4]) && mj.CheckAAAPai(dnsbPai[5], dnsbPai[6], dnsbPai[7]) && mj.CheckAAAPai(dnsbPai[8], dnsbPai[9], dnsbPai[10]) {
				iJinagNum++
			} else if mj.CheckAAAPai(dnsbPai[0], dnsbPai[1], dnsbPai[2]) && mj.CheckAAPai(dnsbPai[3], dnsbPai[4]) && mj.CheckAAAPai(dnsbPai[5], dnsbPai[6], dnsbPai[7]) && mj.CheckAAAPai(dnsbPai[8], dnsbPai[9], dnsbPai[10]) {
				iJinagNum++
			} else if mj.CheckAAAPai(dnsbPai[0], dnsbPai[1], dnsbPai[2]) && mj.CheckAAAPai(dnsbPai[3], dnsbPai[4], dnsbPai[5]) && mj.CheckAAPai(dnsbPai[6], dnsbPai[7]) && mj.CheckAAAPai(dnsbPai[8], dnsbPai[9], dnsbPai[10]) {
				iJinagNum++

			} else if mj.CheckAAAPai(dnsbPai[0], dnsbPai[1], dnsbPai[2]) && mj.CheckAAAPai(dnsbPai[3], dnsbPai[4], dnsbPai[5]) && mj.CheckAAAPai(dnsbPai[6], dnsbPai[7], dnsbPai[8]) && mj.CheckAAPai(dnsbPai[9], dnsbPai[10]) {
				iJinagNum++

			} else {
				return false
			}

		} else {
			return false
		}

	}
	//万
	iSize = len(mj.mMyPAvec[2])
	if iSize > 0 {
		wanPai := mj.mMyPAvec[2]
		if iSize == 2 {
			if !mj.CheckAAPai(wanPai[0], wanPai[1]) {
				return false
			} else {
				iJinagNum++
			}

		} else if iSize == 3 {
			if !mj.CheckAAAPai(wanPai[0], wanPai[1], wanPai[2]) {
				if mj.CheckABCPai(wanPai[0], wanPai[1], wanPai[2]) {
					return false
				}
			}

		} else if iSize == 5 {
			if !mj.Check5Pai(wanPai[0], wanPai[1], wanPai[2], wanPai[3], wanPai[4]) {
				return false
			} else {
				iJinagNum++
			}

		} else if iSize == 6 {
			if !mj.Check6Pai(wanPai[0], wanPai[1], wanPai[2], wanPai[3], wanPai[4], wanPai[5]) {
				return false
			}

		} else if iSize == 8 {
			if !mj.Check8Pai(wanPai[0], wanPai[1], wanPai[2], wanPai[3], wanPai[4], wanPai[5], wanPai[6], wanPai[7]) {
				return false
			} else {
				iJinagNum++
			}

		} else if iSize == 9 {
			if !mj.Check9Pai(wanPai[0], wanPai[1], wanPai[2], wanPai[3], wanPai[4], wanPai[5], wanPai[6], wanPai[7], wanPai[8]) {
				return false
			}

		} else if iSize == 11 {
			if !mj.Check11Pai(wanPai[0], wanPai[1], wanPai[2], wanPai[3], wanPai[4], wanPai[5], wanPai[6], wanPai[7], wanPai[8], wanPai[9], wanPai[10]) {
				return false
			} else {
				iJinagNum++
			}

		} else if iSize == 12 {
			if !mj.Check12Pai(wanPai[0], wanPai[1], wanPai[2], wanPai[3], wanPai[4], wanPai[5], wanPai[6], wanPai[7], wanPai[8], wanPai[9], wanPai[10], wanPai[11]) {
				return false
			}

		} else if iSize == 14 {
			if !mj.Check14Pai(wanPai[0], wanPai[1], wanPai[2], wanPai[3], wanPai[4], wanPai[5], wanPai[6], wanPai[7], wanPai[8], wanPai[9], wanPai[10], wanPai[11], wanPai[12], wanPai[13]) {
				return false
			} else {
				iJinagNum++
			}

		} else {
			return false
		}
	}
	//条
	iSize = len(mj.mMyPAvec[3])
	if iSize > 0 {

		tiaoPai := mj.mMyPAvec[2]
		if iSize == 2 {
			if !mj.CheckAAPai(tiaoPai[0], tiaoPai[1]) {
				return false
			} else {
				iJinagNum++
			}

		} else if iSize == 3 {
			if !mj.CheckAAAPai(tiaoPai[0], tiaoPai[1], tiaoPai[2]) {
				if mj.CheckABCPai(tiaoPai[0], tiaoPai[1], tiaoPai[2]) {
					return false
				}
			}

		} else if iSize == 5 {
			if !mj.Check5Pai(tiaoPai[0], tiaoPai[1], tiaoPai[2], tiaoPai[3], tiaoPai[4]) {
				return false
			} else {
				iJinagNum++
			}

		} else if iSize == 6 {
			if !mj.Check6Pai(tiaoPai[0], tiaoPai[1], tiaoPai[2], tiaoPai[3], tiaoPai[4], tiaoPai[5]) {
				return false
			}

		} else if iSize == 8 {
			if !mj.Check8Pai(tiaoPai[0], tiaoPai[1], tiaoPai[2], tiaoPai[3], tiaoPai[4], tiaoPai[5], tiaoPai[6], tiaoPai[7]) {
				return false
			} else {
				iJinagNum++
			}

		} else if iSize == 9 {
			if !mj.Check9Pai(tiaoPai[0], tiaoPai[1], tiaoPai[2], tiaoPai[3], tiaoPai[4], tiaoPai[5], tiaoPai[6], tiaoPai[7], tiaoPai[8]) {
				return false
			}

		} else if iSize == 11 {
			if !mj.Check11Pai(tiaoPai[0], tiaoPai[1], tiaoPai[2], tiaoPai[3], tiaoPai[4], tiaoPai[5], tiaoPai[6], tiaoPai[7], tiaoPai[8], tiaoPai[9], tiaoPai[10]) {
				return false
			} else {
				iJinagNum++
			}

		} else if iSize == 12 {
			if !mj.Check12Pai(tiaoPai[0], tiaoPai[1], tiaoPai[2], tiaoPai[3], tiaoPai[4], tiaoPai[5], tiaoPai[6], tiaoPai[7], tiaoPai[8], tiaoPai[9], tiaoPai[10], tiaoPai[11]) {
				return false
			}

		} else if iSize == 14 {
			if !mj.Check14Pai(tiaoPai[0], tiaoPai[1], tiaoPai[2], tiaoPai[3], tiaoPai[4], tiaoPai[5], tiaoPai[6], tiaoPai[7], tiaoPai[8], tiaoPai[9], tiaoPai[10], tiaoPai[11], tiaoPai[12], tiaoPai[13]) {
				return false
			} else {
				iJinagNum++
			}

		} else {
			return false
		}

	}

	//饼
	iSize = len(mj.mMyPAvec[4])
	if iSize > 0 {

		bingPai := mj.mMyPAvec[2]
		if iSize == 2 {
			if !mj.CheckAAPai(bingPai[0], bingPai[1]) {
				return false
			} else {
				iJinagNum++
			}

		} else if iSize == 3 {
			if !mj.CheckAAAPai(bingPai[0], bingPai[1], bingPai[2]) {
				if mj.CheckABCPai(bingPai[0], bingPai[1], bingPai[2]) {
					return false
				}
			}

		} else if iSize == 5 {
			if !mj.Check5Pai(bingPai[0], bingPai[1], bingPai[2], bingPai[3], bingPai[4]) {
				return false
			} else {
				iJinagNum++
			}

		} else if iSize == 6 {
			if !mj.Check6Pai(bingPai[0], bingPai[1], bingPai[2], bingPai[3], bingPai[4], bingPai[5]) {
				return false
			}

		} else if iSize == 8 {
			if !mj.Check8Pai(bingPai[0], bingPai[1], bingPai[2], bingPai[3], bingPai[4], bingPai[5], bingPai[6], bingPai[7]) {
				return false
			} else {
				iJinagNum++
			}

		} else if iSize == 9 {
			if !mj.Check9Pai(bingPai[0], bingPai[1], bingPai[2], bingPai[3], bingPai[4], bingPai[5], bingPai[6], bingPai[7], bingPai[8]) {
				return false
			}

		} else if iSize == 11 {
			if !mj.Check11Pai(bingPai[0], bingPai[1], bingPai[2], bingPai[3], bingPai[4], bingPai[5], bingPai[6], bingPai[7], bingPai[8], bingPai[9], bingPai[10]) {
				return false
			} else {
				iJinagNum++
			}

		} else if iSize == 12 {
			if !mj.Check12Pai(bingPai[0], bingPai[1], bingPai[2], bingPai[3], bingPai[4], bingPai[5], bingPai[6], bingPai[7], bingPai[8], bingPai[9], bingPai[10], bingPai[11]) {
				return false
			}

		} else if iSize == 14 {
			if !mj.Check14Pai(bingPai[0], bingPai[1], bingPai[2], bingPai[3], bingPai[4], bingPai[5], bingPai[6], bingPai[7], bingPai[8], bingPai[9], bingPai[10], bingPai[11], bingPai[12], bingPai[13]) {
				return false
			} else {
				iJinagNum++
			}

		} else {
			return false
		}

	}

	if iJinagNum == 1 {
		return true
	}

	return false
}
