package mj

import (
// "fmt"
)

type stPAIEx struct {
	// mNewPai stPAI
	mPaiNum int
	mIsHz   bool
}

type CMJManage struct {
	mMJVec    []stPAI
	mHZPaiNum int
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
		
	}


	func (cm *CMJManage) GetAPai() stPAIEx {

		sPaiEx:= stPAIEx{}

		return sPaiEx
		
	}

}
