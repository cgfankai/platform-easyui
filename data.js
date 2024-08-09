var COMMON_DATA = {
    urlPrefix: "http://localhost:8080/",
}


var _easyuiDateboxClearButtons = $.extend([], $.fn.datebox.defaults.buttons);
_easyuiDateboxClearButtons.splice(2, 0, {
    text: '清除',
    handler: function (target) {
        $(target).datebox("clear");
        $(target).datebox("hidePanel");
    }
});
var _easyuiDatetimeboxClearButtons = $.extend([], $.fn.datetimebox.defaults.buttons);
_easyuiDatetimeboxClearButtons.splice(3, 0, {
    text: '清除',
    handler: function (target) {
        $(target).datebox("clear");
        $(target).datebox("hidePanel");
    }
});

var EASYUI_UTILS = {
    dateboxClearButtons:_easyuiDateboxClearButtons,
    datetimeboxClearButtons:_easyuiDatetimeboxClearButtons
}