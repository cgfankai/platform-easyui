var GLOBAL_DATA = {
    urlPrefix: "http://localhost:8080/",
    currentModuleId: 0,
    hasOpenMenusId: new Set()
}

var PLATFORM_UTILS = {
    loadLeftMenu: function () {
        $.ajax({
            url: GLOBAL_DATA.urlPrefix + "api/v1/system/sysmenu/list",
            method: "post",
            data: {
                moduleId: GLOBAL_DATA.currentModuleId
            },
            success: function (rlt) {
                var easyuiListDatas = [];
                var menuItemMap = {}
                if (rlt != null && rlt.code == 200 && rlt.data != null) {
                    for (var i = 0; i < rlt.data.length; i++) {
                        var _item = rlt.data[i];

                        var treeItem = {
                            id: _item.id,
                            text: _item.menuName,
                            iconCls: _item.icon,
                            menuUrl: _item.menuUrl,
                            targetType: _item.targetType,
                            children: []
                        }
                        menuItemMap[treeItem.id] = treeItem;
                        if (_item.parentId == null) {
                            easyuiListDatas.push(treeItem);
                        } else {
                            menuItemMap[_item.parentId].children.push(treeItem);
                        }
                    }
                }
                for (var i = 0; i < easyuiListDatas.length; i++) {
                    var panelItem = easyuiListDatas[i];
                    if (panelItem.children != null && panelItem.children.length > 0) {
                        var _id = "ul-" + new Date().getTime();
                        $("#left-according").accordion("add", {
                            title: panelItem.text,
                            selected: i == 0,
                            content: '<ul id="' + _id + '"></ul>',
                        });
                        $('#' + _id).tree({
                            data: panelItem.children,
                            onClick: PLATFORM_UTILS.clickLeftMenuHandler
                        });
                    }
                }

            }
        });

    },
    clickLeftMenuHandler: function (node) {
        if (node.children == null || node.children.length == 0) {
            if (GLOBAL_DATA.hasOpenMenusId.has(node.id)) {
                var _panels = $("#index-tabs").tabs('tabs');
                _(_panels).forEach(function(_panel,index){
                    if(node.id == $(_panel).panel("options").id){
                        $("#index-tabs").tabs('select',index);
                        return;
                    }
                });
            } else {
                if (GLOBAL_DATA.hasOpenMenusId.size >= 10) {
                    $.messager.alert('提示', '最多打开10个标签页。');
                    return;
                }
                GLOBAL_DATA.hasOpenMenusId.add(node.id);
                var iframe_ = '<iframe src="' + node.menuUrl + '" frameborder="0" style="border:0;width:100%;height:99.4%;"></iframe>'
                $("#index-tabs").tabs('add', {
                    title: node.text,
                    selected: true,
                    content: iframe_,
                    closable: true,
                    id: node.id
                });
            }

        }
    },
    tabBeforeCloseHandler: function (title, index) {
        var _panels = $(this).tabs("tabs");
        var _curClosePanel = _panels[index]
        GLOBAL_DATA.hasOpenMenusId.delete($(_curClosePanel).panel("options").id)
    }
}