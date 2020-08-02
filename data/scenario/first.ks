@layopt layer=message0 visible=false
[loadjs storage="test.js"]

;[loadjs storage="initialize_speech.js"]
;@jump storage="title.ks"

[cm]

@clearstack
@bg storage ="title.jpg"
;@wait time = 200

*start 

[button x=135 y=300 graphic="title/button_start.png" enterimg="title/button_start2.png"  target="gamestart"]
[button x=135 y=390 graphic="title/button_load.png" enterimg="title/button_load2.png" role="load" ]
;[button x=135 y=410 graphic="title/button_cg.png" enterimg="title/button_cg2.png" storage="cg.ks" ]
;[button x=135 y=500 graphic="title/button_replay.png" enterimg="title/button_replay2.png" storage="replay.ks" ]
[button x=135 y=480 graphic="title/button_config.png" enterimg="title/button_config2.png" role="sleepgame" storage="config.ks" ]

[s]

*gamestart
;一番最初のシナリオファイルへジャンプする
@jump storage="scene1.ks"