var baseURL = "http://ajax.frontend.itheima.net";
$.ajaxPrefilter(function(params) {
    params.url = baseURL + params.url;

    if (params.url.indexOf("/my/") !== -1) {
        params.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }

    //拦截所有响应，判断身份认证信息
    params.complete = function(res) {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //清空本地token
            localStorage.removeItem("token");
            //页面跳转
            location.href = "/login.html"
        }
    }
})