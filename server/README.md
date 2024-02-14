# README

## アプリセットアップ手順
- /client/airpods/ に移動
- `yarn` を実行
- `npx pod-install` を実行
- package.jsonの📱を自分のiOSデバイス名に変更
- App.tsxのAPI_URLを適宜変更
- MacとiOSデバイスを接続
- XCodeのSigingを適宜選択
- `yarn ios` を実行

## サーバセットアップ手順
- https://github.com/elephantrobotics/pymycobot の pymycobotディレクトリ を /sever 以下にコピーする
- pymycobot内で `python3 seup.py install` を実行
- `yarn` を実行
- .envを作成し、MY_COBOT_PORTにmyCobotのポート（例. /dev/cu.SLAB_USBtoUART）を記入

## 起動手順
- USB-CでMacとmyCobotを接続する
- yarn start
