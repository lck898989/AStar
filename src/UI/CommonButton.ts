class CommonButton extends eui.Component {
    public imgSrcName: eui.Image;
    public constructor() {
        super();
        this.skinName = "CommonButton_Skin";
    }

    public setImgSource(source: string): void {
        
        this.imgSrcName.source = source;
        // this.imgSrcName.anchorOffsetX = img.width / 2;
        // this.imgSrcName.anchorOffsetY = img.height / 2;
    }
    public setConfig(): void {
        this.imgSrcName.anchorOffsetX = this.imgSrcName.width / 2;
        this.imgSrcName.anchorOffsetY = this.imgSrcName.height / 2;
    }
}