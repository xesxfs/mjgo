var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 加密类
 * @author leo
 * @date
 */
var CryptoUtils = (function () {
    function CryptoUtils() {
        this.key = 'YUS!8W@zyl@k9NrQ';
    }
    Object.defineProperty(CryptoUtils, "instance", {
        get: function () {
            if (this._instance) {
                return this._instance;
            }
            this._instance = new CryptoUtils();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 加密
     * @param aa 待加密json数据
     * @returns bb 加密后json字符串
     */
    CryptoUtils.prototype.encrypt = function (aa) {
        var bb = JSON.stringify(aa);
        var bb = rc4(bb, this.key);
        bb = base64_encode(bb);
        bb = bb.replace(/\+/g, '-');
        return bb;
    };
    /**
     * 解密
     * @str 待解密json字符串
     * @returns 解密后json数据
     */
    CryptoUtils.prototype.decrypt = function (str) {
        var aa = base64_decode(str);
        aa = rc4(aa, this.key);
        var bb = JSON.parse(aa);
        return bb;
    };
    return CryptoUtils;
}());
__reflect(CryptoUtils.prototype, "CryptoUtils");
//# sourceMappingURL=CryptoUtils.js.map