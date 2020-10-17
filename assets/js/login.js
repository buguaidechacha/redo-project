$(function(){
    //登录和注册页面切换
$('#link_reg').on('click',function(){
    $('.reg-box').show()
    $('.login-box').hide()
})
$('#link_login').on('click',function(){
    $('.reg-box').hide()
    $('.login-box').show()
})
var form =layui.form
var layer = layui.layer

//验证身份信息
form.verify({
    pwd: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
    repwd:function(value)  {
        if(value!==$('.reg-box [name=password]').val()){
            return '两次密码输入不一致'
        }
    }
})

//监听注册事件
$('#form_reg').on('submit',function(e){
    var data = {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
      }
      e.preventDefault()
    $.ajax({
        type:'post',
        url:'/api/reguser',
        data: data,
        success:function(res){
            if(res.status!==0){
                console.log(res.message);
                return layer.msg(res.message)
            }
             layer.msg('注册成功')
             $('#link_login').click()
        }
    })
})

//发起登录的ajax
$('#form_login').submit(function(e){
    e.preventDefault()
    var data = $(this).serialize()
    $.ajax({
        type:'post',
        url:'/api/login',
        data: data,
        success:function(res){
            if(res.status!==0){
               return layer.msg('登录失败')
            }
            layer.msg('登录成功')
            localStorage.setItem('token',res.token)
            location.href='/index.html'
        }
    })

})












})