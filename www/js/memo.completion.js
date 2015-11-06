// (1) SDKの初期化
var ncmb = new NCMB("YOUR_NCMB_APPLICATION_KEY","YOUR_NCMB_CLIENT_KEY");

// 会員登録処理
var signUp = function(userName, password){
    // (2) 入力された情報から会員を構築する
    var user = new ncmb.User();
    user.set("userName", userName).set("password", password);

    // (3) 構築した会員を登録する
    user.signUpByAccount()
        .then(function(){
          // 登録に成功したらそのままログインする
          ncmb.User.login(user)
                   .then(successAuthCallback)
                   .catch(failAuthCallback);
        })
        .catch(failAuthCallback);
};

// ログイン処理
var login = function(userName, password){
    // (4) 入力された情報でログインする
    ncmb.User.login(userName, password)
             .then(successAuthCallback)
             .catch(failAuthCallback);
};

// ログアウト処理
var logout = function(){
    // (5) ログアウトする
    ncmb.User.logout()
             .then(logoutCallback)
             .catch(logoutCallback);
};

// (6) データストアのmemoクラスの定義
var Memo = ncmb.DataStore("memo");

// メモの登録
var addMemo = function(memo){
  // (7) ログイン中のユーザー情報をSDKのローカル領域から取得
  var currentUser = ncmb.User.getCurrentUser();
  
  // (8) 登録するメモのアクセス権限を生成する
  var acl = new ncmb.Acl();
  acl.setUserReadAccess(currentUser, true)
     .setUserWriteAccess(currentUser, true);

  // (9) メモのオブジェクトを構築して保存する
  var newMemo = new Memo();
  newMemo.set("contents", memo)
         .set("acl", acl)
         .save()
         .then(successAddMemoCallback)
         .catch(failAddMemoCallback);
};

// メモリストの取得（リストの初期化時、メモの追加時に呼ばれる）
var getList = function(){
  // (10) createDateの降順で10件取得する
  Memo.order("createDate", true)
      .limit(10)
      .fetchAll()
      .then(successGetMemoCallback)
      .catch(failGetMemoCallback);
};

// メモの削除
var removeMemo = function(objectId){
  // (11) 対象のオブジェクトを構築して削除する
  var memo = new Memo();
  memo.set("objectId", objectId)
      .delete()
      .then(successRemoveMemoCallback)
      .catch(failRemoveMemoCallback);
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