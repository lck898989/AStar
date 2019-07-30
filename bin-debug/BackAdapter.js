var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BackAdapter = (function () {
    function BackAdapter(backItem) {
        // 舞台宽高
        this.stageWidth = 0;
        this.stageHeight = 0;
        // 背景图的宽高
        this.backWidth = 0;
        this.backHeight = 0;
        this.backImage = backItem;
    }
    BackAdapter.prototype.setStage = function (stage) {
        this.stage = stage;
    };
    BackAdapter.prototype.setStageParam = function (stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    };
    // 设置背景图片宽高
    BackAdapter.prototype.setBackParam = function (backWidth, backHeight) {
        this.backWidth = backWidth;
        this.backHeight = backHeight;
    };
    BackAdapter.prototype.adapterBack = function () {
        if (egret.Capabilities.isMobile) {
            var div = document.getElementsByClassName("egret-player")[0];
            console.log("egret-player's element is ", div);
            console.log("div's length is ", div.clientHeight);
            if (window) {
                // 获取设备像素比
                var ratio = window.devicePixelRatio;
                // let canvasAtrs = document.getElementsByClassName("egret-player")[0].attributes;
                // console.log("canvasAtrs is ",canvasAtrs);
                // canvasAtrs["6"].value = (ratio * div.clientWidth).toString();
                // canvasAtrs["6"].textContent = (ratio * div.clientWidth).toString();
                // canvasAtrs["6"].nodeValue = (ratio * div.clientWidth).toString();
                // canvasAtrs["7"].value = (ratio * div.clientHeight).toString();
                // canvasAtrs["7"].textContent = (ratio * div.clientHeight).toString();
                // canvasAtrs["7"].nodeValue = (ratio * div.clientHeight).toString();
                // let canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementsByClassName("egret-player")[0].children[0];
                // // canvasElement.style.cssText = "cursor: inherit; position: absolute; top: 0px; bottom: 0px; left: 0.199997px; right: 0px; transform-origin: 0% 0% 0px; transform: matrix(0, 0, 0, 0, 0, 0);"
                // canvasElement.width = ratio * div.clientWidth;
                // canvasElement.height = ratio * div.clientHeight;
            }
        }
        var minScale = Math.min(this.stageWidth / this.backWidth, this.stageHeight / this.backHeight);
        console.log("minScale is ", minScale);
        this.backImage.width = minScale * this.backWidth;
        this.backImage.height = minScale * this.backHeight;
        var maxScale = Math.max(this.stageWidth / this.backImage.width, this.stageHeight / this.backImage.height);
        console.log("maxScale is ", maxScale);
        this.backImage.scaleX = maxScale;
        this.backImage.scaleY = maxScale;
        // 在移动设备中
    };
    return BackAdapter;
}());
__reflect(BackAdapter.prototype, "BackAdapter");
//# sourceMappingURL=BackAdapter.js.map