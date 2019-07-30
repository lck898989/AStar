class BackAdapter {
    // 舞台宽高
    private stageWidth: number = 0;
    private stageHeight: number = 0;
    // 背景图的宽高
    private backWidth: number = 0;
    private backHeight: number = 0;

    private stage: egret.Stage;

    private backImage: eui.Image;
    public constructor(backItem: eui.Image) {
        this.backImage = backItem;
    }
    public setStage(stage: egret.Stage): void {
        this.stage = stage;
    }
    public setStageParam(stageWidth: number,stageHeight: number): void {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    } 
    // 设置背景图片宽高
    public setBackParam(backWidth: number,backHeight: number): void {
        this.backWidth = backWidth;
        this.backHeight = backHeight;
    } 
    public adapterBack(): void {
        if(egret.Capabilities.isMobile) {
            let div = document.getElementsByClassName("egret-player")[0]
            console.log("egret-player's element is ",div);
            console.log("div's length is ",div.clientHeight);
            if(window) {
                // 获取设备像素比
                let ratio: number = window.devicePixelRatio;
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
        let minScale = Math.min(this.stageWidth / this.backWidth,this.stageHeight / this.backHeight);
        console.log("minScale is ",minScale);
        this.backImage.width = minScale * this.backWidth;
        this.backImage.height = minScale * this.backHeight;

        let maxScale: number = Math.max(this.stageWidth / this.backImage.width,this.stageHeight / this.backImage.height);
        console.log("maxScale is ",maxScale);
        this.backImage.scaleX = maxScale;
        this.backImage.scaleY = maxScale;
        // 在移动设备中
        

    }
}