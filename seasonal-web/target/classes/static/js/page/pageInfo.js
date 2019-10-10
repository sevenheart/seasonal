// 调用分页功能 [ 基础版 ]
Helper.ui.page("#page-1", {
    change: function ( i ) {
        createContent( i, 0 );
    }
});
//显示数据条数
Helper.ui.page("#page-2", {
    showTotal: true,
    change: function ( i ) {
        createContent( i, 1 );
    }
});
//快捷跳转
Helper.ui.page("#page-3", {
    Total:20,
    pageSize:3,
    showTotal: true,
    showTo: true,
    change: function ( i ) {
        console.log("开始分页")
        createContent( i, 2 );
    }
});
//默认显示
Helper.ui.page("#page-4", {
    pageSize: 10,
    showTotal: true,
    showTo: true,
    currentPage: 25,
    change: function ( i ) {
        createContent( i, 3 );
    }
});