/**
 * Socket通讯协议
 * @author chenwei
 * @date 2017/4/24
 */
class ProtocolData {

    public static commond={
        cmd:"",
        game:""
    }
    public static gameId={
        //普通双扣
        normal:0,
        //百变双扣
        variety:1,
        //13道
        thirteenth:2,
        //未选择
        hall:-1
    }

    //登录
    public static sendLogin={
        cmd:'1',
        game:'-1',
        msg:[
            {
                openId:'owUlNw9vcKUUlqxxSYg54i1ATAsc',
                nickname:'等风来'
            }
            ]
        }

    //登录返回
  public static revLogin={
            cmd:2,
            game:-1,
            msg:[]
        }  

 public static cmd6={
        cmd:'6',msg:[{roomId:""}]
    }

public static cmd3= {cmd:'3',game:'',msg:[{level:' '}]}

}
 










