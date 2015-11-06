//================ コールバック ==============
// 認証成功時の処理
var successAuthCallback = function(){
  hideLoadingDialog();
  initList();
};

// 認証失敗時の処理
var failAuthCallback = function(err){
  ons.notification.alert({message:err});
  hideLoadingDialog();
  ncmb.User.logout();
  showAuthDialog();
};

// ログアウト時の処理
var logoutCallback = function(){
  clearList();
  checkAuth();
};

// メモ取得成功時の処理
var successGetMemoCallback = function(results){
  refreshList(results);
};

// メモ取得失敗時の処理
var failGetMemoCallback = function(){
  ons.notification.alert({message:err});
  logout();
};

// メモ登録成功時の処理
var successAddMemoCallback = function(){
  hideLoadingDialog();
  getList();
};

// メモ登録失敗時の処理
var failAddMemoCallback = function(err){
  hideLoadingDialog();
  ons.notification.alert({message:err});
  getList();
};

// メモ削除成功時の処理
var successRemoveMemoCallback = function(){
  hideLoadingDialog();
  getList();
};

// メモ削除失敗時の処理
var failRemoveMemoCallback = function(err) {
  hideLoadingDialog();
  ons.notification.alert({message:err});
  getList();
};

//================ ボタンのタップ処理 ==============
// 認証用ダイアログの会員登録ボタンの処理
var onSignUp = function(){
  var userName = document.getElementById("tfUserName").value;
  var password = document.getElementById("tfPassword").value;
  if (userName != "" && userName.length >= 4 &&
      password != "" && password.length >= 4) {
        hideAuthDialog();
        showLoadingDialog();
        signUp(userName, password);
  } else {
        ons.notification.alert({message:"ユーザー名とパスワードを４文字以上で正しく入力してください。"});
  }
};

// 認証用ダイアログのログインボタンの処理
var onLogIn = function(){
  var userName = document.getElementById("tfUserName").value;
  var password = document.getElementById("tfPassword").value;
  if (userName != "" && userName.length >= 4 &&
      password != "" && password.length >= 4) {
        hideAuthDialog();
        showLoadingDialog();
        login(userName, password);
  } else {
    ons.notification.alert({message:"ユーザー名とパスワードを４文字以上で正しく入力してください。"});
  }
};

// 左上のログアウトボタンの処理
var onLogOut = function(){
  logout();
};

// 右上のプラスボタンの処理
var onAdd = function(){
  showAddDialog();
};

// メモ追加ダイアログの追加ボタンの処理
var onAddMemo = function(){
  var memo = document.getElementById("tfMemo").value;
  if (memo != "" && memo.length > 0) {
    hideAddDialog();
    showLoadingDialog;
    addMemo(memo);
  } else {
    ons.notification.alert({message:"メモを入力してください。"});
  }
};

// メモ追加ダイアログのキャンセルボタンの処理
var onCancel = function(){
  hideAddDialog();
};

// メモ削除ボタンの処理
var onTrash = function(objectId){
  showLoadingDialog();
  removeMemo(objectId);
};

//================ ダイアログの表示処理 ==============
// 通信中のダイアログ
var showLoadingDialog = function(){
  loadingDialog.show();
};

var hideLoadingDialog = function(){
  loadingDialog.hide();
};

// 認証用のダイアログ
var showAuthDialog = function(){
  document.getElementById("tfUserName").value = "";
  document.getElementById("tfPassword").value = "";
  authDialog.show();
};

var hideAuthDialog = function(){
  authDialog.hide();
};

// 追加用のダイアログ
var showAddDialog = function(){
  document.getElementById("tfMemo").value = "";
  addDialog.show();
};

var hideAddDialog = function(){
  addDialog.hide();
};

//================ リストの表示処理 ==============
// リストの初期化処理
var initList = function(){
  var currentUser = ncmb.User.getCurrentUser();
  document.getElementById("toolbarUserName").innerHTML = currentUser.get("userName");
  getList();
};

// リストの更新処理
var refreshList = function(items){
    var listHTML = "";
    for (var i = 0; i < items.length; i++) {
      var object = items[i];
      listHTML += "<ons-list-item><ons-row><ons-col width=\"90%\">"
                  + object.get("contents")
                  + "</ons-col>"
                  + "<ons-col>"
                  + "<ons-button onclick=\"onTrash('"
                  + object.get("objectId")
                  + "');\" modifier=\"quiet\"><ons-icon icon=\"fa-trash-o\"></ons-icon></ons-button>"
                  + "</ons-col></ons-row></ons-list-item>"
    }
    document.getElementById("MemoList").innerHTML = listHTML;
    ons.compile(document.getElementById("MemoList"));
};

// リストのクリア
var clearList = function(){
  document.getElementById("toolbarUserName").innerHTML = "";  
  document.getElementById("MemoList").innerHTML = "";
  ons.compile(document.getElementById("MemoList"));
};

//================ その他、初期化処理 ==============
// ページ初期化時の処理
document.addEventListener("pageinit", function(e) {
  hideLoadingDialog();
  checkAuth();
}, false);

// Onsen-UIの初期化
ons.bootstrap();
