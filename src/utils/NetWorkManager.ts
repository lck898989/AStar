class NetWorkManager {
    private url: string;
    private method: string;
    constructor(url: string,method: string) {
        this.url = url;
        this.method = method
    }
    // 发送数据
    public send(data?: string) {
        let xhr = new XMLHttpRequest();
        let self = this;
        return new Promise((resolve,reject) => {
            console.log("enter promise");
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = xhr.responseText;
                    console.log("服务器相应消息是：",response);
                    resolve(response);
                }
            };
            if(self.method === "GET") {
                xhr.open("GET",self.url);
            } else if(self.method === "POST") {
                xhr.open("POST",self.url);
            }
            xhr.setRequestHeader("Content-type","application/json");
            // console.log("json string is " + JSON.stringify(sendMessage));
            //向服务器发送数据
            if(self.method === "POST") {
                if(data) {
                    xhr.send(data); 
                } else {
                    xhr.send();
                }
            } else if(self.method === "GET") {
                xhr.send();
            }
        });
    }
}