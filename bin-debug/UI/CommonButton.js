var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var CommonButton = (function (_super) {
    __extends(CommonButton, _super);
    function CommonButton() {
        var _this = _super.call(this) || this;
        _this.skinName = "CommonButton_Skin";
        return _this;
    }
    CommonButton.prototype.setImgSource = function (source) {
        this.imgSrcName.source = source;
        // this.imgSrcName.anchorOffsetX = img.width / 2;
        // this.imgSrcName.anchorOffsetY = img.height / 2;
    };
    CommonButton.prototype.setConfig = function () {
        this.imgSrcName.anchorOffsetX = this.imgSrcName.width / 2;
        this.imgSrcName.anchorOffsetY = this.imgSrcName.height / 2;
    };
    return CommonButton;
}(eui.Component));
__reflect(CommonButton.prototype, "CommonButton");
//# sourceMappingURL=CommonButton.js.map