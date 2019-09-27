//初始化用户信息
function accountInit(){
    $()
}





$('#bookimg').parent().children("img").click(function () {
    $('#bookimg').click();
})
/*修改头像*/
function preview(){
    //获取点击的文本框userimg
    let file =document.getElementById("bookimg");
    let imgUrl =window.URL.createObjectURL(file.files[0]);
    $('#userimg img').attr('src',imgUrl); // 修改img标签src属性值
}
$('#bookimg').change(preview);

$('.btn-change').click(function () {

})