/**
 * 用户数据
 * @author chenkai 
 * @date 2016/6/28
 */
class UserInfo {
    /**[userID][userVO] 全部用户列表(包括自己)  对应to_game,由于to_game大量数据冗余，只选择保存需要的*/
    public userList = {};
    /**用户http登录时，保存自己数据*/
    public httpUserInfo:UserVO;
    
    /**
     * 添加用户
     * @param userVo 用户数据Vo
     */ 
    public addUser(userVo:UserVO){
        if(this.userList[userVo.openId]){
            console.log("用户重复添加:",userVo.openId);
        }else{
            this.userList[userVo.openId] = userVo;
        }
    }
    
    /**获取自己用户信息*/
    public getMyUserVo():UserVO{
        return this.getUser(this.httpUserInfo.openId);
    }

    public setMyUserVo(){
        this.httpUserInfo =new UserVO();
        if(App.DataCenter.debugInfo.isDebug)
        this.httpUserInfo.openId=App.DataCenter.debugInfo.account
        this.addUser(this.httpUserInfo);
        var playStr:string= egret.getOption("player");
        playStr= decodeURIComponent(playStr);
        console.log(playStr)
        if(playStr){
           
          var playObj= JSON.parse(playStr);
        //   this.httpUserInfo.banker =playObj["banker"];
          this.httpUserInfo.headImgUrl = playObj["headImgUrl"];
        //   this.httpUserInfo.id = playObj["id"];
          this.httpUserInfo.nickName =StringTool.formatNickName(playObj["nickName"]);
          this.httpUserInfo.playerId = playObj["vcm_player_id"];
          this.httpUserInfo.roomCard = playObj["roomCard"];
          this.httpUserInfo.openId = playObj["openId"];
          this.addUser(this.httpUserInfo);
        //   this.httpUserInfo.roomId = playObj["roomId"];
        //   this.httpUserInfo.status = playObj["status"];
        }
    }
    
    /**
     * 获取用户
     * @param userId 用户userId
     * @returns 返回用户信息
     */ 
    public getUser(userID:string){
        return this.userList[userID];
    }

    /**
     * 判断用户是否存在
     * @userID 用户ID
     * @return 是否存在
     */
    public isExist(userID:string){
        if(this.getUser(userID)){
            return true;
        }else{
            return false;
        }
    }
    
    /**
     * 根据座位号获取用户信息
     * @param seatID 座位号
     * @returns 返回用户信息
     */ 
    public getUserBySeatID(seatID:string):UserVO{
        for(var key in this.userList){
            if(this.userList[key].seatID == seatID){
                return this.userList[key];
            }
        }
    }

    /**
     * 删除用户信息
     * @param userID 用户ID
     */
    public deleteUser(userID:number){
        delete this.userList[userID];
    }

    /**删除所有用户信息，除了自己*/
    public deleteAllUserExcptMe(){
        for(var key in this.userList){
            if(key != this.httpUserInfo.openId){
                delete this.userList[key];
            }
        }
    }
    /**删除所有用户信息*/
    public deleteAllUser() {
        for(var key in this.userList) {
                delete this.userList[key];
        }
    }

    /**获取用户数量*/
    public getUserNum(){
        return ArrayTool.getObjectLength(this.userList);
    }
    

}
