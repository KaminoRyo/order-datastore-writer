# order-datastore-writer

[!CAUTION]
製作中でまだ動作しません。

Yahoo!はユーザーの行動履歴を「パーソナルデータ」と称し、[自らのパーソナルデータをファイルにまとめてDLするサービスを提供しています。](https://support.yahoo-net.jp/PccLogin/s/article/H000013800)
このサービスではYahoo!オークション,PayPayフリマの取引データ（TSVファイル）も提供されています。
このツールは取引データのTSVファイルを読み込み、データストア（最優先は現状利用しているGoogleスプレッドシート、ゆくゆくはDBにも書き込みたい）に書き込むCLIツールとなります。

# 環境構築

1. このリポジトリをローカルにクローンする
2. `npm install`

# 使い方

`npx vite-node index.mts 【TSVファイルのパス（相対パスの場合はコマンドを呼び出した時点のパスが基準）】`

# Todo

- ✅ TSVデータの読み込み
- ✅ マッピング
- ▶ Googleスプレッドシートへの出力
- DBへの出力（MySQL向けを検討）
