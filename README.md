# Monacaとニフティクラウドmobile backendでメモ帳アプリを作ってみよう

## 概要
このプロジェクトは、Monaca上でニフティクラウドmobile backendのデータストアと会員管理の使い方を学ぶための教材です。
テキストを参考にしながら、JavaScript SDKの組み込みとmemo.jsの編集を行いましょう。

完成すると、ユーザー毎のメモ帳が出来上がります。

メモはクラウド上に保存されるので別のスマートフォンからログインしても同じものを表示可能です。

memo.jsの完成版はmemo.completion.jsとしてjsフォルダに置いてありますのでご参考にしてください。

ボタンのタップイベントの処理やリストの描画処理などはapp.jsに実装してあります。 興味のある方はご覧ください。

## 手順
1. Monacaで「開発をスタート」を選択
2. 「monaca.io（クラウド）」を選択
3. 「Import Project」を選択
4. プロジェクト名に「メモ帳アプリ」、
   インポート方法として「URLを指定してインポート」
   URLに「 https://github.com/ndyuya/ncmb-memo/archive/master.zip 」を指定してインポートを実行
5. インポートしたプロジェクトを開く
6. 「 https://raw.githubusercontent.com/NIFTYCloud-mbaas/ncmb_js/master/ncmb.min.js 」をダウンロード
7. Monacaのファイルツリーでjsフォルダに6.でダウンロードしたncmb.min.jsをアップロード
8. index.htmlを開き8行目と9行目の間に「&lt;script src="js/ncmb.min.js"&gt;&lt;/script&gt;」を追加
9. テキストを参考にしながらmemo.jsを編集

（memo.jsの完成版がmemo.completion.jsにありますので、うまく動かない場合はmemo.completion.jsを参考にしてください）
