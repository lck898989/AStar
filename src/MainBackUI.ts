class MainBackUI extends eui.Component {
    private backAdapter: BackAdapter;
    private back: eui.Image;
    public turntableBack: eui.Image;
    public turntable: eui.Image;
    private clickBtn: CommonButton;

    private turnGroup: eui.Group;
    private group: eui.Group;

    constructor() {
        super();
        this.skinName = "skins.MainUI";
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onload,this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onDestroy,this);
    }
    public onload(): void {
        this.backAdapter = new BackAdapter(this.back);
        this.backAdapter.setStageParam(this.stage.stageWidth,this.stage.stageHeight);
        this.backAdapter.setBackParam(this.back.width,this.back.height);
        this.backAdapter.adapterBack();

        // 添加按钮
        // this.btn = new CommonButton();
        // this.clickBtn.setImgSource("current_png");
        // this.addButton(this.btn,320,314,"test","current_png");
        this.clickBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.tapBtnStart,this);
        this.clickBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.tapBtnEnd,this);
        // 播放弥红灯
        egret.Tween.get(this.turntableBack,{loop: true}).set({
            source: RES.getRes("wrapcircle_bg_png")
        }).wait(300).set({
            source: RES.getRes("wrapcircle_bg2_png")
        }).wait(300);
    }
    private async tapBtnStart() {
        console.log("开始抽奖");
        this.clickBtn.scaleX = 1.1;
        this.clickBtn.scaleY = 1.1;
        this.clickBtn.touchEnabled = false;
        let self = this;
        let randomTargetNum: number = Math.floor(Math.random() * 12);
        let networkManager: NetWorkManager = new NetWorkManager("http://172.16.2.46:3001/getAward","POST");
        let responseData = await networkManager.send();
        // responseData = JSON.parse(responseData);
        // console.log("responseData is ",JSON.parse(responseData));
        let deg = Math.floor(Math.random() * 2 + 1) * 360 - randomTargetNum * 30; // [30,720]
        // 让它越转越慢
        // alert("deg is " + deg);
        egret.Tween.get(this.turntable).to({rotation: deg},deg * 4,egret.Ease.quadOut).call(() => {
            self.clickBtn.touchEnabled = true;
        });
        
    }
    private tapBtnEnd(): void {
        console.log("开始抽奖");
        this.clickBtn.scaleX = 1;
        this.clickBtn.scaleY = 1;
    
    }
    public onDestroy(): void {

    }
}