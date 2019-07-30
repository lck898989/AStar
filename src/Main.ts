//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {
    // 窗口的宽度和高度
    public width: number;
    public heiht: number;

    private pBar: ProgressBar = new ProgressBar();
    private backGroud: egret.Shape;
    private mainUI: MainBackUI;
    private test: GameTest;

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
        // this.addEventListener(egret.Event.ENTER_FRAME,this.update,this);
        this.pBar.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.loadOver,this);
        this.pBar.setColor(0xffeeee,0xff3300,0x222222);
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
    }

    private async loadResource() {
        try {
            // const loadingView = new LoadingUI();
            // this.stage.addChild(loadingView);
            // await RES.loadConfig("resource/default.res.json", "resource/");
            // await this.loadTheme();
            // await RES.loadGroup("preload", 0, loadingView);
            // this.stage.removeChild(loadingView);
            const loadingView = this.pBar;
            this.pBar.x = (this.stage.stageWidth - this.pBar.realWidth) / 2;
            this.pBar.y = this.stage.stageHeight / 2 - this.pBar.realHeight / 2;
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/"); 
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
            if(this.backGroud && this.contains(this.backGroud))
                this.removeChild(this.backGroud);
            this.loadMainUI();
        }
        catch (e) {
            console.error(e);
        }
    }
    // 加载主界面
    private loadMainUI(): void {
        // let mainBack: egret.Bitmap = this.createBitmapByName("bg2_jpg");
        // console.log("mainBack is ",mainBack);
        // this.addChild(mainBack);
        // console.log("this is ",this);
        // console.log("this's children is ",this.numChildren);
        /**
         * 
         * 进度条相关
         * 
         */
        // this.mainUI = new MainBackUI();
        // this.addChild(this.mainUI);
        this.test = new GameTest();
        this.addChild(this.test);
        
    }
    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }
    // 加载资源结束了
    private loadOver(event: egret.Event): void {
        console.log("资源加载完成");
    }
    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        /**
         * 
         * 创建背景界面
         * 
         * * */
        this.width = this.stage.stageWidth;
        this.heiht = this.stage.stageHeight;
        // this.backGroud = new egret.Shape();
        // let backGra: egret.Graphics = this.backGroud.graphics;
        // backGra.beginFill(0xe3e3e3);
        // backGra.drawRect(0,0,this.width,this.heiht);
        // backGra.endFill();
        // this.addChild(this.backGroud);
    }
    
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
}
