var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 表情信息
 * @author chenkai
 * @date 2016/9/29
 * 表情有个各种默认、专属、vip、动的和不动的。
 *
 * 表情命名规则: dface + 表情ID + 图片序列帧   dface_0_0表示ID=1表情第1帧
 * 商城默认表情: dface_0_0 - dface_29_0，共30个，ID 0-29
 * 专属表情：dface_30_0 - dface_37_0，共8个，ID 30-37
 * 不动的默认表情:dface_38_0- dface_49_0，共12个，ID 38-49
 *
 *
 * 聊天面板
 * 1. 首先根据已购买的表情加载对应资源组: getFaceItemGroupName
 * 2. 加载完成后，获取表情图标: getFaceItemImage
 *
 * 接收聊天：
 * 1. 首先根据接收表情ID，加载对应资源组: getFaceMovieGroupName
 * 2. 加载完成后，获取表情动画: getFaceMovie
 */
var FaceFactory = (function () {
    //	public vipFaceStartID:number = 30;     //Vip专属表情ID
    //	public vipFaceEndID:number = 37;
    function FaceFactory() {
        this.defaultFaceStartID = 0; //默认动态表情ID
        this.defaultFaceEndID = 29;
        this.pngNumList = [];
        this.faceMovieGroupList = [];
        this.faceItemGroupList = [];
        //动的表情资源组
        this.pngNumList.push(17, 12, 14, 12, 15); //数组索引为图片id，数值为id对应的表情图片数量。id=0的表情17张，id=1的表情12张...
        this.pngNumList.push(6, 11, 14, 10, 10);
        this.pngNumList.push(11, 11, 13, 14, 9);
        this.pngNumList.push(6, 5, 10, 6, 5);
        this.pngNumList.push(7, 17, 10, 13, 12);
        this.pngNumList.push(16, 15, 10, 11, 11);
        //vip表情资源
        //		this.pngNumList.push(12,8,12,10,8);
        //		this.pngNumList.push(6,8,6);
        //创建表情动画资源组
        this.createFaceMovieGroup();
        //创建表情图标资源组
        this.createFaceItemGroup(ItemType.default, "defaceItemGroup");
    }
    /**
     * 创建表情动画对应资源组
     */
    FaceFactory.prototype.createFaceMovieGroup = function () {
        var pngNameList; //1个表情对应图片序列
        var idNum = this.pngNumList.length; //总表情数量 
        for (var i = 0; i < idNum; i++) {
            var jLen = this.pngNumList[i];
            pngNameList = [];
            for (var j = 0; j < jLen; j++) {
                pngNameList[j] = "dface_" + i + "_" + j + "_png";
            }
            //创建Group
            var groupName = "dface_movie_" + i;
            RES.createGroup(groupName, pngNameList);
            //根据id保存groupName
            this.faceMovieGroupList[i] = groupName;
        }
    };
    /**
     * 获取表情动画资源组，用于显示该表情时，预先加载对应资源
     * @id 表情id
     * @return 表情资源组名
     */
    FaceFactory.prototype.getFaceMovieGroupName = function (id) {
        if (id >= this.faceMovieGroupList.length) {
            return null;
        }
        return this.faceMovieGroupList[id];
    };
    /**
     * 创建表情选项资源组
     * @itemType 表情类型
     * @groupname 表情组名(不能和default.res.json资源组名重复)
     */
    FaceFactory.prototype.createFaceItemGroup = function (itemType, groupName) {
        switch (itemType) {
            case ItemType.default:
                var pngNameList = [];
                for (var i = this.defaultFaceStartID; i <= this.defaultFaceEndID; i++) {
                    pngNameList.push("dface_" + i + "_0_png");
                }
                RES.createGroup(groupName, pngNameList);
                this.faceItemGroupList[itemType] = groupName;
                break;
            case ItemType.vip:
                //				pngNameList = [];
                //				for(var i=this.vipFaceStartID;i<=this.vipFaceEndID;i++){
                //					pngNameList.push("dface_" + i + "_0_png");
                //				}
                //				RES.createGroup(groupName, pngNameList);
                //				this.faceItemGroupList[itemType] = groupName;
                break;
            case ItemType.youself:
                break;
        }
    };
    /**
     * 获取表情图标资源组名
     * @itemType 表情类型 (默认、vip等)
     * @return 该表情类型对应的表情图标资源组名
     */
    FaceFactory.prototype.getFaceItemGroupName = function (itemType) {
        return this.faceItemGroupList[itemType];
    };
    /**
     * 获取一个表情动画
     * @id 表情id
     * @return 表情动画
     */
    FaceFactory.prototype.getFaceMovie = function (id) {
        if (id >= this.pngNumList.length) {
            return null;
        }
        var faceMovie = new FaceMovie();
        faceMovie.delay = 60;
        faceMovie.chatID = id;
        faceMovie.setImgBuffer("dface_" + id + "_", 0, this.pngNumList[id] - 1);
        return faceMovie;
    };
    /**
     * 获取一个表情选项图标 (通常为表情序列帧的第一帧)
     * @id 表情id
     * @return 表情选项图标
     */
    FaceFactory.prototype.getFaceItem = function (id) {
        if (id >= this.pngNumList.length) {
            return null;
        }
        var faceItem = new FaceItem();
        faceItem.chatID = id;
        faceItem.bitmapData = RES.getRes("dface_" + id + "_0_png");
        faceItem.touchEnabled = true;
        return faceItem;
    };
    /**
     * 获取一组ID由 startID - endID 的表情选项图标列表
     * @startID  该组第一个表情ID
     * @endID 该组最后一个表情ID
     * @return 表情选项图标列表
     */
    FaceFactory.prototype.getFaceItemList = function (startID, endID) {
        var faceItemList = [];
        var faceItem;
        for (var i = startID; i <= endID; i++) {
            faceItem = this.getFaceItem(i);
            faceItem && faceItemList.push(faceItem);
        }
        return faceItemList;
    };
    /**
     * 获取表情选项图标列表
     * @return 表情选项图标列表
     */
    FaceFactory.prototype.getFaceItemImage = function (itemType) {
        switch (itemType) {
            case ItemType.default:
                return this.getFaceItemList(this.defaultFaceStartID, this.defaultFaceEndID);
            case ItemType.vip: //(暂定)vip
        }
    };
    FaceFactory.getInstance = function () {
        if (this.instance == null) {
            this.instance = new FaceFactory();
        }
        return this.instance;
    };
    return FaceFactory;
}());
__reflect(FaceFactory.prototype, "FaceFactory");
//# sourceMappingURL=FaceFactory.js.map