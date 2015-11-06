// (1) SDKの初期化


// 会員登録処理
var signUp = function(userName, password){
    // (2) 入力された情報から会員を構築する


    // (3) 構築した会員を登録する


};

// ログイン処理
var login = function(userName, password){
    // (4) 入力された情報でログインする


};

// ログアウト処理
var logout = function(){
    // (5) ログアウトする


};

// (6) データストアのmemoクラスの定義


// メモの登録
var addMemo = function(memo){
  // (7) ログイン中のユーザー情報をSDKのローカル領域から取得


  // (8) 登録するメモのアクセス権限を生成する


  // (9) メモのオブジェクトを構築して保存する


};

// メモリストの取得（リストの初期化時、メモの追加時に呼ばれる）
var getList = function(){
  // (10) createDateの降順で10件取得する


};

// メモの削除
var removeMemo = function(objectId){
  // (11) 対象のオブジェクトを構築して削除する


};

// 会員認証状態のチェック
var checkAuth = function(){
  // SDKのローカル領域にログイン情報が存在するかを確認
  var currentUser = ncmb.User.getCurrentUser();
  if (currentUser !== null) {
    // 存在する場合は、ログイン済み会員の最新情報をmBaaSから取得する
    showLoadingDialog();
    currentUser.update()
               .then(successAuthCallback)
               .catch(failAuthCallback);
  } else {
    // 存在しない場合は、会員認証ダイアログを表示
    showAuthDialog();
  }
};