package mj

import (
	// "fmt"
	"math/rand"
	"time"
)

type STPAIEX struct {
	NewPai stPAI
	PaiNum int
	IsHz   bool
}

type CMJManage struct {
	mMJVec    []stPAI
	mHZPaiNum int
}

func RandInt(min int, max int) int {
	if min >= max || min == 0 || max == 0 {
		return max
	}
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	return r.Intn(max-min) + min
}

func NewMgr() *CMJManage {
	cm := &CMJManage{}
	// cm.InitPai(pHzPaiNum)
	return cm
}

func (cm *CMJManage) InitPai(pHzPaiNum int) {
	cm.mHZPaiNum = pHzPaiNum
	cm.mMJVec = cm.mMJVec[0:0]
	for i := 1; i <= 3; i++ {
		tPai := stPAI{}
		tPai.mType = 0
		tPai.mValue = i
		cm.mMJVec = append(cm.mMJVec, tPai)
		cm.mMJVec = append(cm.mMJVec, tPai)
		cm.mMJVec = append(cm.mMJVec, tPai)
		cm.mMJVec = append(cm.mMJVec, tPai)
	}

	for i := 1; i <= 4; i++ {
		tPai := stPAI{}
		tPai.mType = 1
		tPai.mValue = i
		cm.mMJVec = append(cm.mMJVec, tPai)
		cm.mMJVec = append(cm.mMJVec, tPai)
		cm.mMJVec = append(cm.mMJVec, tPai)
		cm.mMJVec = append(cm.mMJVec, tPai)

	}

	for i := 1; i <= 9; i++ {
		tPai := stPAI{}
		tPai.mType = 2
		tPai.mValue = i
		cm.mMJVec = append(cm.mMJVec, tPai)
		cm.mMJVec = append(cm.mMJVec, tPai)
		cm.mMJVec = append(cm.mMJVec, tPai)
		cm.mMJVec = append(cm.mMJVec, tPai)

	}

	for i := 1; i <= 9; i++ {
		tPai := stPAI{}
		tPai.mType = 3
		tPai.mValue = i
		cm.mMJVec = append(cm.mMJVec, tPai)
		cm.mMJVec = append(cm.mMJVec, tPai)
		cm.mMJVec = append(cm.mMJVec, tPai)
		cm.mMJVec = append(cm.mMJVec, tPai)

	}

	for i := 1; i <= 9; i++ {
		tPai := stPAI{}
		tPai.mType = 4
		tPai.mValue = i
		cm.mMJVec = append(cm.mMJVec, tPai)
		cm.mMJVec = append(cm.mMJVec, tPai)
		cm.mMJVec = append(cm.mMJVec, tPai)
		cm.mMJVec = append(cm.mMJVec, tPai)

	}
	cm.XiPai()
}

func (cm *CMJManage) XiPai() {

	for i := 1; i < len(cm.mMJVec)-1; i++ {
		randIdx := RandInt(i, len(cm.mMJVec)-1)
		temp := cm.mMJVec[i-1]
		cm.mMJVec[i-1] = cm.mMJVec[randIdx]
		cm.mMJVec[randIdx] = temp

	}

}

func (cm *CMJManage) GetAPai() STPAIEX {

	sPaiEx := STPAIEX{}
	sPai := cm.mMJVec[0]
	sPaiEx.NewPai.Type = sPai.Type
	sPaiEx.NewPai.Value = sPai.Value
	sPaiEx.PaiNum = len(cm.mMJVec) - 1
	if sPaiEx.PaiNum == cm.mHZPaiNum {
		sPaiEx.IsHz = true
	} else {
		sPaiEx.IsHz = false
	}

	if len(cm.mMJVec) > 1 {
		cm.mMJVec = cm.mMJVec[1:]
	} else {
		cm.mMJVec = cm.mMJVec[:0]
	}
	return sPaiEx
}
