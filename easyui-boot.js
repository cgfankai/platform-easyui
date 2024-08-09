function __CreateJSPath(js) {
    var scripts = document.getElementsByTagName("script");
    var path = "";
    for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].src;
        if (src.indexOf(js) != -1) {
            var ss = src.split(js);
            path = ss[0];
            break;
        }
    }
    var href = location.href;
    href = href.split("#")[0];
    href = href.split("?")[0];
    var ss = href.split("/");
    ss.length = ss.length - 1;
    href = ss.join("/");
    if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
        path = href + "/" + path;
    }
    return path;
}

var bootPATH = bootPath = __CreateJSPath("easyui-boot.js");
bootPath = bootPath + "";

//easyui and font awesome
document.write('<link href="' + bootPATH + 'jquery-easyui-1.10.19/themes/metro/easyui.css" rel="stylesheet" type="text/css" />');
document.write('<link href="' + bootPATH + 'jquery-easyui-1.10.19/themes/icon.css" rel="stylesheet" type="text/css" />');
document.write('<link href="' + bootPATH + 'jquery-easyui-1.10.19/demo/demo.css" rel="stylesheet" type="text/css" />');
document.write('<script src="' + bootPATH + 'jquery-easyui-1.10.19/jquery.min.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'jquery-easyui-1.10.19/jquery.easyui.min.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'jquery-easyui-1.10.19/datagrid-filter-1.0.7/datagrid-filter.js" type="text/javascript"></script>');
//easyui 中文
document.write('<script src="' + bootPATH + 'jquery-easyui-1.10.19/locale/easyui-lang-zh_CN.js" type="text/javascript"></script>');

//lodash
document.write('<script src="' + bootPATH + 'lodash.min.1.8.3.js" type="text/javascript"></script>');

//fontAwesome
document.write('<link href="' + bootPATH + 'font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />');

//自定义js
document.write('<script src="' + bootPATH + 'data.js" type="text/javascript"></script>');


var easyUiUtil = {
    nullFormatterHandler: function (value, row, index) {
        if (value == null) {
            return "";
        } else {
            return value;
        }
    },
    dateTimeToDateFormatterHandler: function (value, row, index) {
        if (value == null) {
            return "";
        } else {
            return value.trim().substring(0, 10);
        }
    },
    dateBoxFormatter: function (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
    },
    dateBoxParser: function (s) {
        if (!s) return new Date();
        var ss = (s.split('-'));
        var y = parseInt(ss[0], 10);
        var m = parseInt(ss[1], 10);
        var d = parseInt(ss[2], 10);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            return new Date(y, m - 1, d);
        } else {
            return new Date();
        }
    },
}
