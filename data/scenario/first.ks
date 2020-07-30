*start
*title
;メッセージレイヤを非表示にしておく
@layopt layer=message0 visible=false




;背景画像を設定
[image layer="base" page="fore" storage=back.jpg]
[image layer=1 storage=title.png visible=true top=100 left=150]

[locate x=200 y=300 ]
[button graphic="button_start.png" target=*first]

[locate x=200 y=450 ]
[button graphic="button_load.png" target=*loadmenu]
[s]




;つづきからボタンが押された場合。ロード画面を表示
*loadmenu
[cm]
[showload]

[jump target=*title]
[s]




;ストーリー最初から
*first
[cm]
[freeimage layer=1]
メッセージレイヤを再度表示する[r]
@layopt layer=message0 visible=true
ゲームが始まります[l][r]



;youtubeのプレイヤーを指定した位置に挿入します
;yoububeから埋め込み用タグを取得してきています
[html top=100 left=300]

<object width="200" height="113">
<param name="movie" value="http://www.youtube.com/v/60TMm2sQTBU?version=3&amp;hl=ja_JP&amp;rel=0">
</param>
<param name="allowFullScreen" value="true"></param>
<param name="allowscriptaccess" value="always"></param>
<embed src="http://www.youtube.com/v/60TMm2sQTBU?version=3&amp;hl=ja_JP&amp;rel=0" type="application/x-shockwave-flash" width="200" height="113" allowscriptaccess="always" allowfullscreen="true">
</embed></object>

[endhtml]