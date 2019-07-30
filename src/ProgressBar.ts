
class ProgressBar extends egret.Sprite implements RES.PromiseTaskReporter{

    private timer: number = 0;
    private guard: number = 0;

    private changeBar: egret.Shape;

    private renderer: egret.RenderTexture;
    private container: egret.DisplayObjectContainer;

    public realWidth = 600 - 14;
    public realHeight = 36;

    private space: number = 60;
    // 进度条外边框颜色
    private outerColor: number = 0xffffff;
    private backColor: number = 0xff0000;
    private changeColor: number = 0x008899;

    // 加载比例
    private rate: number = 0;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
        this.addEventListener(egret.Event.ENTER_FRAME,this.update,this);
    }
    // 设置真实长度和高度
    public setWidthHeight(realWidth: number,realHeight: number): void {
        this.realWidth = realWidth;
        this.realHeight = realHeight;
    }
    // 设置进度条的背景色
    public setColor(outerColor: number,backColor: number,changeColor: number) {
        this.outerColor = outerColor;
        this.backColor = backColor;
        this.changeColor = changeColor;
    }
    // 初始化进度条
    public init(): void {
        // 绘制背景
        let progressShape = new egret.Shape();
        let progressGraphics = progressShape.graphics;
        progressGraphics.beginFill(this.outerColor);
        let spance: number = 60;
        progressGraphics.drawRoundRect(0,50,this.realWidth + 14,this.realHeight + 14,50);
        progressGraphics.endFill();
        this.addChild(progressShape);
        let topProgress = new egret.Shape();
        let topProgressGra: egret.Graphics = topProgress.graphics;
        topProgressGra.beginFill(this.backColor);
        topProgressGra.drawRoundRect(7,50 + 7,this.realWidth,this.realHeight,36);
        topProgressGra.endFill();
        this.addChild(topProgress);
    }
    // 帧循环
    private update(event: egret.Event): void {
        // console.log("event is ",event);
        let beforeTime = this.timer;
        let interval = (egret.getTimer() - beforeTime) / 1000;
        // console.log("interval is ",interval);
        // 更新比例同步绘制进度条
        this.drawUpdateByRate(this.rate);
        this.timer = egret.getTimer();
    }
    public onProgress(current: number, total: number): void {
        console.log("current is ",current," and total is ",total);
        // 将加载比例赋值
        this.rate = current / total;
    }
    private drawUpdateByRate(rate: number): void {
        let w = rate * this.realWidth;
        if(!this.changeBar) {
            this.changeBar = new egret.Shape();
            
        }
        let tempGra = this.changeBar.graphics;
        let spaceNum: number = w / this.space;
        for(let i = 0; i < spaceNum; i++) {
            tempGra.clear();
            tempGra.beginFill(this.changeColor);
            tempGra.lineStyle(5,0xff0000);
            tempGra.drawRoundRect(7,50 + 7,w,this.realHeight,50);
        }
        if(this.changeBar) {
            // this.changeBar.width = this.changeBar.getBounds().width;
            if(!this.renderer) {
                this.renderer = new egret.RenderTexture();
            }
            this.renderer.drawToTexture(this.changeBar);
            let bar: egret.Bitmap = new egret.Bitmap(this.renderer);
            if(!this.container) {
                this.container = new egret.DisplayObjectContainer();
                // 先把bar移除
                this.addChild(this.container);
            }
            if(bar && this.container.contains(bar)) {
                this.container.removeChild(bar);
            }
            // 再添加
            this.container.addChild(bar);
        }
        if(rate === 1 && this.parent && this.parent.contains(this)) {
            let self = this;
            // 从父节点移除该节点(延迟500ms)
            setTimeout(() => {
                if(self.parent && self.parent.contains && self.parent.contains(self)) {
                    self.parent.removeChild(self);
                }
            },500);
        } 

    }
}