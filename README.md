# 東京繪本旅行 2026

日系繪本風的東京 5 天 4 夜旅遊行程網站（純靜態，無後端、無追蹤、無需建置）。

## 結構
- `index.html` 頁面本體
- `css/style.css` 樣式（和紙白底、3px 墨灰框、四色配色）
- `js/app.js` 倒數、日期切換、待辦清單（勾選狀態只存在瀏覽器 localStorage）
- `assets/svg/` 所有手繪插圖，各自獨立、含動畫、支援「減少動態效果」

## 本機預覽
```
python3 -m http.server 8000
```
開啟 http://localhost:8000

## 發佈（GitHub Pages）
Settings → Pages → Source 選 `Deploy from a branch`，Branch 選 `main`、資料夾 `/ (root)`。

## 修改內容
行程資料在 `js/app.js` 的 `DAYS`，待辦在 `TODO`；住宿資訊在 `index.html` 的「住宿資訊」區塊。

## 隱私提醒
公開 repo 任何人都能看到內容。請勿把護照號碼、訂位代碼、住宿完整地址或電子票券放進來。
