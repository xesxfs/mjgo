/**
 * 游戏数据
 * @author chenwei 
 * @date 2016/6/29
 */
class GameInfo {
    public isReCon:boolean =false;   

}
//人物坐的实际位置，上下左右
enum UserPosition {
    NULL = -1,
    Down = 0,
    R = 1,
    Up = 2,
    L = 3
}