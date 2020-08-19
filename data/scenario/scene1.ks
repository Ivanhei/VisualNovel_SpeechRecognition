;ティラノスクリプトサンプルゲーム
;fore-settings  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 
*start

[cm]
[clearfix]
[start_keyconfig]

[bg storage="restaurant.jpg" time="100"]
;メニューボタンの表示
@showmenubutton

;メッセージウィンドウの設定  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
[position layer="message0" left=160 top=500 width=1000 height=200 page=fore visible=true]

;文字が表示される領域を調整
[position layer=message0 page=fore margint="30" marginl="50" marginr="70" marginb="60"]

;メッセージウィンドウの表示
@layopt layer=message0 visible=true

;キャラクターの名前が表示される文字領域
[ptext name="chara_name_area" layer="message0" color="white" size=28 bold=true x=180 y=510]

;上記で定義した領域がキャラクターの名前表示であることを宣言（これがないと#の部分でエラーになります）
[chara_config ptext="chara_name_area"]
;メッセージウィンドウの設定  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

;メニューボタン非表示
@hidemenubutton

;ロールボタン追加;;;;;;;;;;;;;;

;ロールボタン配置 ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

;クイックセーブボタン
[button name="role_button" role="quicksave" graphic="button/qsave.png" enterimg="button/qsave2.png" x="40" y="690"]

;クイックロードボタン
[button name="role_button" role="quickload" graphic="button/qload.png" enterimg="button/qload2.png" x="140" y="690"]

;セーブボタン
[button name="role_button" role="save" graphic="button/save.png" enterimg="button/save2.png" x="240" y="690"]

;ロードボタン
[button name="role_button" role="load" graphic="button/load.png" enterimg="button/load2.png" x="340" y="690"]

;オートボタン
[button name="role_button" role="auto" graphic="button/auto.png" enterimg="button/auto2.png" x="440" y="690"]

;スキップボタン
[button name="role_button" role="skip" graphic="button/skip.png" enterimg="button/skip2.png" x="540" y="690"]

;バックログボタン
[button name="role_button" role="backlog" graphic="button/log.png" enterimg="button/log2.png" x="640" y="690"]

;フルスクリーン切替ボタン
[button name="role_button" role="fullscreen" graphic="button/screen.png" enterimg="button/screen2.png" x="740" y="690"]

;コンフィグボタン（※sleepgame を使用して config.ks を呼び出しています）
[button name="role_button" role="sleepgame" graphic="button/sleep.png" enterimg="button/sleep2.png" storage="config.ks" x="840" y="690"]

;メニュー呼び出しボタン（※ロールボタンを使うなら不要）
[button name="role_button" role="menu" graphic="button/menu.png" enterimg="button/menu2.png" x="940" y="690"]

;メッセージウィンドウ非表示ボタン
[button name="role_button" role="window" graphic="button/close.png" enterimg="button/close2.png" x="1040" y="690"]

;タイトルに戻るボタン
[button name="role_button" role="title" graphic="button/title.png" enterimg="button/title2.png" x="1140" y="690"]

;ロールボタン追加終わり ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

;このゲームで登場するキャラクターを宣言
;John
[chara_new name="J" storage="chara/John/normal.png"]
;キャラクターの表情登録
[chara_face name="J" face="happy" storage="chara/John/happy.png"]
[chara_face name="J" face="sad" storage="chara/John/sad.png"]

;BGMを流す
[bgmopt volume = 40]
[playbgm storage="music.ogg"]
;fore-settings  ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 

;Dialogue Start ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- 
#You
I am starving now, let's see what we can order.[p]

;Show Menu
[image layer="1" visible=true x="50" y="65" storage="menu_small.png" time=1000]
[free name="chara_name_area" layer="message0"]
[position layer="message0" left=600 top=475 width=550 height=200 page=fore visible=true]
[position layer=message0 page=fore margint="30" marginl="50" marginr="70" marginb="60"]
@layopt layer=message0 visible=true
[ptext name="chara_name_area" layer="message0" color="white" size=28 bold=true x=620 y=485]
[chara_config ptext="chara_name_area"]


#?
Hey there![p]

#You
! ? [p]

;キャラクター登場
[chara_show  name="J" left=575 top=75 time=400]
#?
It's been a while, isn't it?[p]

[glink  color="blue"  storage="scene1.ks"  size="28"  x="360"  width="500"  y="150"  text="What_a_coincidence,_John!"  target=*Know]
[glink  color="blue"  storage="scene1.ks"  size="28"  x="360"  width="500"  y="250"  text="I_am_sorry,_are_you_John...?"  target=*Forget]
[s]

*Know

[chara_mod  name="J" face="happy"]
#John
Me too! I didn't thought you would be having lunch here.[p]
[jump target=*common]

*Forget

[chara_mod  name="J" face="sad"]
#John
Yes! We've meet yesterday.[l][r]
How can you forget me so quickly?[p]
[jump target=*common]


*common
[chara_mod name="J" face="default"]

#John
By the way, do you mind if I join you?[p]
#You
My pleasure![p]
#You
Do you want to look at the menu?[p]
#John
No, I am fine.[l][r]
I always order the same lunch here[p]
Do you know how to order food in English?[p]
#You
Not really, I am still learning.[p]

[chara_hide name="J"]

#Waiter
May I take your order?[p]

*Anchor
#You
Okay.[p]
[glink color="blue" size="28" x="360" width="500" y="300" text="Try_to_read_the_name_of_one_appetizer" target=*Speech_Beverage]
[s]

*Repeat

#Waiter
Let me repeat your order.[p]
You ordered one [emb exp=beverage].[l][r]
Is that correct?[p]

[glink  color="blue"  storage="scene1.ks"  size="28"  x="360"  width="500"  y="150"  text="Yes."  target=*Correct]
[glink  color="blue"  storage="scene1.ks"  size="28"  x="360"  width="500"  y="250"  text="No."  target=*Wrong]
[s]

*Correct
#You
That's correct, thank you[p]
#Waiter
You're welcome.[p]
[jump target=*End]

[s]

*Wrong
#You
That's not correct.[l][r]
Let me try again[p]
[jump target=*Anchor]

;Speech ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
;*Speech_Appetizer
;*Speech_Main


*Speech_Beverage

[iscript]
speech_Beverage();
[endscript]
[wait time=5000]
[jump target=*Beverage cond="flag_beverage"]
[jump target=*Confused]

*Beverage
#Waiter
Okay, one [emb exp=beverage].[p]
[jump target=*Repeat]

*Confused

#Waiter
May I beg your pardon please?[p]
[jump target=*Anchor]

;Speech ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

[s]