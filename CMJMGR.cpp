#ifndef _CMJMANAGE_H  
#define _CMJMANAGE_H  
#include "CMJ.h"  
//剩余牌墙信息  
//扩展  
struct stPAIEx  
{  
    stPAI   m_NewPai;                       //起的新牌  
    int     m_PaiNum;                       //剩余牌数  
    bool    m_IsHZ;                         //是否黄庄  
}  
;  
  
//麻将管理器  
class CMJManage  
{  
    vector<stPAI> m_MJVec;                //麻将数据VEC  
    int             m_HZPaiNum;             //黄庄的牌数  
public:  
  
    //构造函数  
    CMJManage();  
    //析构函数  
    ~CMJManage();  
    //初始化牌  
    void    InitPai(int p_HZPaiNum = 0);  
    //起牌  
    stPAIEx GetAPai();  
private:  
    //洗牌  
    void    XiPai();  
}  
;  
  
#endif  











#include "CMJManage.h"  
      
//构造函数  
CMJManage::CMJManage()  
{  
    m_HZPaiNum = 0;  
}  
//析构函数  
CMJManage::~CMJManage()  
{  
      
}  
  
//初始化牌  
void    CMJManage::InitPai(int p_HZPaiNum)  
{  
    m_HZPaiNum = p_HZPaiNum;  
    m_MJVec.clear();  
    //中发白  
    for(UINT i = 1 ; i <= 3 ; i++)  
    {  
        stPAI t_Pai;  
        t_Pai.m_Type = 0;  
        t_Pai.m_Value = i;  
        m_MJVec.push_back(t_Pai);  
        m_MJVec.push_back(t_Pai);  
        m_MJVec.push_back(t_Pai);  
        m_MJVec.push_back(t_Pai);  
    }  
    //东南西北  
    for(UINT i = 1 ; i <= 4 ; i++)  
    {  
        stPAI t_Pai;  
        t_Pai.m_Type = 1;  
        t_Pai.m_Value = i;  
        m_MJVec.push_back(t_Pai);  
        m_MJVec.push_back(t_Pai);  
        m_MJVec.push_back(t_Pai);  
        m_MJVec.push_back(t_Pai);  
    }  
    //万  
    for(UINT i = 1 ; i <= 9 ; i++)  
    {  
        stPAI t_Pai;  
        t_Pai.m_Type = 2;  
        t_Pai.m_Value = i;  
        m_MJVec.push_back(t_Pai);  
        m_MJVec.push_back(t_Pai);  
        m_MJVec.push_back(t_Pai);  
        m_MJVec.push_back(t_Pai);  
    }  
    //条  
    for(UINT i = 1 ; i <= 9 ; i++)  
    {  
        stPAI t_Pai;  
        t_Pai.m_Type = 3;  
        t_Pai.m_Value = i;  
        m_MJVec.push_back(t_Pai);  
        m_MJVec.push_back(t_Pai);  
        m_MJVec.push_back(t_Pai);  
        m_MJVec.push_back(t_Pai);  
    }  
    //饼  
    for(UINT i = 1 ; i <= 9 ; i++)  
    {  
        stPAI t_Pai;  
        t_Pai.m_Type = 4;  
        t_Pai.m_Value = i;  
        m_MJVec.push_back(t_Pai);  
        m_MJVec.push_back(t_Pai);  
        m_MJVec.push_back(t_Pai);  
        m_MJVec.push_back(t_Pai);  
    }  
    XiPai();  
}  
  
//洗牌  
void    CMJManage::XiPai()  
{  
    srand( GetTickCount() );  
    random_shuffle(m_MJVec.begin(),m_MJVec.end());  
}  
      
//起牌  
stPAIEx CMJManage::GetAPai()  
{  
    //如果所有牌都起完了  
      
    stPAIEx t_Pai;  
    t_Pai.m_NewPai.m_Type  = m_MJVec.back().m_Type;  
    t_Pai.m_NewPai.m_Value = m_MJVec.back().m_Value;  
    t_Pai.m_PaiNum = m_MJVec.size()-1;  
    if(t_Pai.m_PaiNum ==m_HZPaiNum)  
    {  
        t_Pai.m_IsHZ = true;  
    }  
    else  
    {  
        t_Pai.m_IsHZ = false;  
    }  
    //扔去一个  
    m_MJVec.pop_back();  
    return t_Pai;  
}  