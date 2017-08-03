var appKey    = "";
var clientKey = "";
var ncmb = new NCMB(appKey, clientKey);

///// Called when app launch
$(function() {
  $("#LoginBtn").click(onLoginBtn);
  $("#RegisterBtn").click(onRegisterBtn);
  $("#YesBtn_logout").click(onLogoutBtn);
});

//----------------------------------USER MANAGEMENT-------------------------------------//
var currentLoginUser; //現在ログイン中ユーザー

function onRegisterBtn()
{
    //入力フォームからusername, password変数にセット
    var username = $("#reg_username").val();
    var password = $("#reg_password").val();
    //alert(username + password);
    //ncmb.User.logout();
    //alert('ログアウト成功');
    //currentLoginUser = null;
    //user = null;
    ncmb.sessionToken = null;
    
    user = new ncmb.User();
    user.set("userName", username)
        .set("password", password);
    
    // 任意フィールドに値を追加 
    user.signUpByAccount()
        .then(function(user) {
            alert("新規登録に成功");
            currentLoginUser = ncmb.User.getCurrentUser();
            $.mobile.changePage('#DetailPage');
        })
        .catch(function(error) {
            alert("新規登録に失敗！次のエラー発生：" + error);
        });
}

function onLoginBtn()
{
    var username = $("#login_username").val();
    var password = $("#login_password").val();
    // ユーザー名とパスワードでログイン
    ncmb.User.login(username, password)
        .then(function(user) {
            alert("ログイン成功");
            currentLoginUser = ncmb.User.getCurrentUser();
            $.mobile.changePage('#DetailPage');
        })
        .catch(function(error) {
            alert("ログイン失敗！次のエラー発生: " + error);
        });
}

function onLogoutBtn()
{
    ncmb.User.logout();
    alert('ログアウト成功');
    currentLoginUser = null;
    $.mobile.changePage('#LoginPage');
}

function data(){
    alert("データ保存");
    var userName = document.getElementById('user_name').value;
    var userNo = document.getElementById('user_no').value;
    //alert(userName+userNo);

    currentLoginUser = ncmb.User.getCurrentUser();
    var luser = currentLoginUser.get('userName');
    //alert(luser);
    var lobid = currentLoginUser.get('objectId');
    

    var Dtest = ncmb.DataStore("Dtest");
    var dtest = new Dtest();
    dtest.set("data1", userName)
         .set("data2", userNo)
         .set("Username",luser)
         .set("UserObjId",lobid)
         .save()
         .then(function(dtest){
          // 保存後の処理
        alert("書き込み完了");
        document.getElementById('user_name').value = null;
        document.getElementById('user_no').value = null;
         })
         .catch(function(err){
          // エラー処理
          alert('エラー:'+err);
         });
         //alert("v");

    
    
 }

