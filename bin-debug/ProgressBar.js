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
var ProgressBar = (function (_super) {
    __extends(ProgressBar, _super);
    function ProgressBar() {
        var _this = _super.call(this) || this;
        _this.timer = 0;
        _this.guard = 0;
        _this.realWidth = 600 - 14;
        _this.realHeight = 36;
        _this.space = 60;
        // 进度条外边框颜色
        _this.outerColor = 0xffffff;
        _this.backColor = 0xff0000;
        _this.changeColor = 0x008899;
        // 加载比例
        _this.rate = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this);
        return _this;
    }
    // 设置真实长度和高度
    ProgressBar.prototype.setWidthHeight = function (realWidth, realHeight) {
        this.realWidth = realWidth;
        this.realHeight = realHeight;
    };
    // 设置进度条的背景色
    ProgressBar.prototype.setColor = function (outerColor, backColor, changeColor) {
        this.outerColor = outerColor;
        this.backColor = backColor;
        this.changeColor = changeColor;
    };
    // 初始化进度条
    ProgressBar.prototype.init = function () {
        // 绘制背景
        var progressShape = new egret.Shape();
        var progressGraphics = progressShape.graphics;
        progressGraphics.beginFill(this.outerColor);
        var spance = 60;
        progressGraphics.drawRoundRect(0, 50, this.realWidth + 14, this.realHeight + 14, 50);
        progressGraphics.endFill();
        this.addChild(progressShape);
        var topProgress = new egret.Shape();
        var topProgressGra = topProgress.graphics;
        topProgressGra.beginFill(this.backColor);
        topProgressGra.drawRoundRect(7, 50 + 7, this.realWidth, this.realHeight, 36);
        topProgressGra.endFill();
        this.addChild(topProgress);
    };
    // 帧循环
    ProgressBar.prototype.update = function (event) {
        // console.log("event is ",event);
        var beforeTime = this.timer;
        var interval = (egret.getTimer() - beforeTime) / 1000;
        // console.log("interval is ",interval);
        // 更新比例同步绘制进度条
        this.drawUpdateByRate(this.rate);
        this.timer = egret.getTimer();
    };
    ProgressBar.prototype.onProgress = function (current, total) {
        console.log("current is ", current, " and total is ", total);
        // 将加载比例赋值
        this.rate = current / total;
    };
    ProgressBar.prototype.drawUpdateByRate = function (rate) {
        var w = rate * this.realWidth;
        if (!this.changeBar) {
            this.changeBar = new egret.Shape();
        }
        var tempGra = this.changeBar.graphics;
        var spaceNum = w / this.space;
        for (var i = 0; i < spaceNum; i++) {
            tempGra.clear();
            tempGra.beginFill(this.changeColor);
            tempGra.lineStyle(5, 0xff0000);
            tempGra.drawRoundRect(7, 50 + 7, w, this.realHeight, 50);
        }
        if (this.changeBar) {
            // this.changeBar.width = this.changeBar.getBounds().width;
            if (!this.renderer) {
                this.renderer = new egret.RenderTexture();
            }
            this.renderer.drawToTexture(this.changeBar);
            var bar = new egret.Bitmap(this.renderer);
            if (!this.container) {
                this.container = new egret.DisplayObjectContainer();
                // 先把bar移除
                this.addChild(this.container);
            }
            if (bar && this.container.contains(bar)) {
                this.container.removeChild(bar);
            }
            // 再添加
            this.container.addChild(bar);
        }
        if (rate === 1 && this.parent && this.parent.contains(this)) {
            var self_1 = this;
            // 从父节点移除该节点(延迟500ms)
            setTimeout(function () {
                if (self_1.parent && self_1.parent.contains && self_1.parent.contains(self_1)) {
                    self_1.parent.removeChild(self_1);
                }
            }, 500);
        }
    };
    return ProgressBar;
}(egret.Sprite));
__reflect(ProgressBar.prototype, "ProgressBar", ["RES.PromiseTaskReporter"]);
//# sourceMappingURL=ProgressBar.js.map