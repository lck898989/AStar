var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NetWorkManager = (function () {
    function NetWorkManager(url, method) {
        this.url = url;
        this.method = method;
    }
    // 发送数据
    NetWorkManager.prototype.send = function (data) {
        var xhr = new XMLHttpRequest();
        var self = this;
        return new Promise(function (resolve, reject) {
            console.log("enter promise");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = xhr.responseText;
                    console.log("服务器相应消息是：", response);
                    resolve(response);
                }
            };
            if (self.method === "GET") {
                xhr.open("GET", self.url);
            }
            else if (self.method === "POST") {
                xhr.open("POST", self.url);
            }
            xhr.setRequestHeader("Content-type", "application/json");
            // console.log("json string is " + JSON.stringify(sendMessage));
            //向服务器发送数据
            if (self.method === "POST") {
                if (data) {
                    xhr.send(data);
                }
                else {
                    xhr.send();
                }
            }
            else if (self.method === "GET") {
                xhr.send();
            }
        });
    };
    return NetWorkManager;
}());
__reflect(NetWorkManager.prototype, "NetWorkManager");
//# sourceMappingURL=NetWorkManager.js.map