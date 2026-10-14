# 二次性高血圧ナビ（PWA 版）

二次性高血圧の診断フローチャートと原因予測ナビ（index.html＝ナビ、chart.html＝フローチャート）。iPhone / Android / PC のブラウザで動き、ホーム画面に追加するとアプリとして起動し、オフラインでも使えます。

## GitHub Pages で公開する手順（ブラウザだけで完結）

1. GitHub にログインし、右上の「+」→「New repository」
   - Repository name：`htn-navi`（任意）
   - Public を選択（Private でも Pages は使えますが有料プランが必要）
   - 「Create repository」
2. 作成したリポジトリの画面で「uploading an existing file」をクリック
   - この ZIP を展開した中身（`index.html`、`chart.html`、`manifest.webmanifest`、`sw.js`、`favicon.png`、`icons` フォルダ、`README.md`）をまとめてドラッグ＆ドロップ
   - 「Commit changes」
3. リポジトリの「Settings」→ 左メニュー「Pages」
   - Source：「Deploy from a branch」
   - Branch：`main`、フォルダ：`/ (root)` → 「Save」
4. 1〜2 分後、同じ画面に公開 URL が表示されます
   - 例：`https://<ユーザー名>.github.io/htn-navi/`

## iPhone にインストール

1. Safari で公開 URL を開く
2. 共有ボタン（□↑）→「ホーム画面に追加」→「追加」
3. ホーム画面のアイコンから起動（全画面・オフライン対応）

Android は Chrome で開くと「インストール」バナーが出ます。

## 更新するとき

1. `index.html` を差し替えて GitHub にアップロード（同名ファイルを上書き）
2. `sw.js` の 2 行目 `VERSION = 'htn-navi-v1'` の数字を上げる（v2, v3 …）
   - これを上げないと、インストール済みの端末が古いキャッシュを使い続けます
3. 端末側はアプリを一度閉じて開き直すと新版に切り替わります

## ファイル構成

| ファイル | 役割 |
|---|---|
| `index.html` | 原因予測ナビ |
| `chart.html` | フローチャート |
| `manifest.webmanifest` | アプリ名・アイコン・全画面表示の設定 |
| `sw.js` | オフライン用キャッシュ（service worker） |
| `icons/` | ホーム画面アイコン |
| `favicon.png` | ブラウザタブのアイコン |

## 注意

- 本アプリは計算補助ツールです。臨床判断は必ず原データと添付文書・ガイドラインで確認してください。
- 入力データは端末内でのみ処理され、どこにも送信されません。
