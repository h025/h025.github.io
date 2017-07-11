var adoArr = [
	"Undo.mp3",
	"镜心之歌.mp3",
	"beautiful day.mp3",
	"莫失莫忘.mp3",
	"Beautiful In White.mp3",
	"七月上.mp3",
	"I Say Yeah.mp3",
	"我的天空.mp3",
	"It's My Life.mp3",
	"知夏.mp3",
	"Nothing's Gonna Change My Love For You.mp3",
	"Up.mp3",
	"Welcome To The City.mp3"
];
//var adoArr = ["1.mp3","2.mp3","3.mp3"]
var ado = document.createElement('audio');
var control = byid("control");
var playBtn = byid("playBtn");
var musicName = byid("musicName");
var currentTime = byid("currentTime");
var duration = byid("duration");
var progressBar = byid("progressBar");
var progress = byid("progress");
var dot = byid("dot");
var bg = byid("bg");
var divRight = byid("divRight");
var playingSytle = byid("playingSytle");
var voice = byid("voice");
var pstyle = byid("pstyle");
var voiceBox = byid("voiceBox");
var voiceBar = byid("voiceBar");
var voiceProgress = byid("voiceProgress");
var voiceDot = byid("voiceDot");
var tb = byid("tb");
var musicNow = 0;
var timer = null,
	rad = 0;
ado.src = "music/" + adoArr[musicNow];
musicName.innerText = "Undo";
playBtn.play = true;

function byid(id) { //获取元素
	return document.getElementById(id);
}

function playStyle() { //音乐播放时改变播放按钮样式
	playBtn.style.backgroundPosition = "-6px -66px";
	playBtn.onmouseover = function() { //改变播放按钮鼠标悬浮效果
		playBtn.style.backgroundPosition = "-66px -66px"
	}
	playBtn.onmouseout = function() {
		playBtn.style.backgroundPosition = "-6px -66px"
	}
}

pauseStyle(); //播放按钮鼠标悬浮效果初始化

function pauseStyle() { //音乐停止时改变播放按钮样式
	playBtn.style.backgroundPosition = "-6px -6px"
	playBtn.onmouseover = function() {
		playBtn.style.backgroundPosition = "-66px -6px"
	}
	playBtn.onmouseout = function() {
		playBtn.style.backgroundPosition = "-6px -6px"
	}
}

playBtn.onclick = function() { //播放按钮
	clearInterval(timer); //清理上一首歌的时间显示定时器
	if(playBtn.play) {
		ado.play();
		time(); //播放歌曲时相关展示
		playBtn.play = false;
		playStyle();
	} else {
		ado.pause();
		playBtn.play = true;
		pauseStyle();
	}
}

function lest() { // 上一曲
	if(pstyle.sty == 2) {
		random();
	} else {
		musicNow--;
		if(musicNow < 0) {
			musicNow = adoArr.length - 1;
		}
		changeMusic(); //播放曲目
	}
}

function next() { //下一曲
	if(pstyle.sty == 2) {
		random();
	} else {
		musicNow++;
		if(musicNow >= adoArr.length) {
			musicNow = 0;
		}
		changeMusic(); //播放曲目
	}

}

function random() { //随机产生下一曲目
	var radn = Math.floor(Math.random() * adoArr.length);
	if(musicNow == radn) {
		radn = Math.floor(Math.random() * adoArr.length);
	} else {
		musicNow = radn;
	}
	changeMusic(); //播放曲目
}

function changeMusic() { //歌曲播放
	clearInterval(timer);
	ado.src = "music/" + adoArr[musicNow];
	musicName.innerText = adoArr[musicNow].substring(0, (adoArr[musicNow].indexOf(".")));
	ado.play();
	playStyle(); //音乐播放时改变播放按钮样式
	time(); //播放歌曲时相关展示
	if(playBtn.play) {
		playBtn.play = false;
	}
}

function time() { //歌曲播放时相关属性  显示时间 进度条 旋转专辑图 以及自动播放下一曲目
	timer = setInterval(function() {

		//显示已播放时间及总时间
		var t_m = Math.floor(ado.duration / 60);
		t_m < 10 ? t_m = "0" + t_m : t_m; //总播放分钟数
		var t_s = Math.floor(ado.duration % 60);
		t_s < 10 ? t_s = "0" + t_s : t_s; //总播放秒数
		duration.innerText = t_m + ":" + t_s;
		var t_m = Math.floor(ado.currentTime / 60);
		t_m < 10 ? t_m = "0" + t_m : t_m; //已播放分钟数
		var t_s = Math.floor(ado.currentTime % 60);
		t_s < 10 ? t_s = "0" + t_s : t_s; //已播放分钟数
		currentTime.innerText = t_m + ":" + t_s;

		// 进度条
		progress.style.width = ado.currentTime / ado.duration * progressBar.offsetWidth + "px";
		dot.style.left = ado.currentTime / ado.duration * progressBar.offsetWidth - 4 + "px";

		//专辑图旋转
		rad == 360 ? rad = 2 : rad += 2;
		tb.style.transform = "rotate(" + rad + "deg)";

		//结束时自动播放下一曲目
		if(ado.ended) {
			clearInterval(timer);
			pstyle.sty == 1 ? changeMusic() : pstyle.sty == 2 ? random() : next()
			/**changeMusic()  单曲循环
			 * next();列表循环播放
			 * random()随机
			 */
		}

	}, 33)
};

progressBar.onclick = function(e) { //点击选取播放进度
	if(playBtn.play) {
		return;
	}
	ado.currentTime = (e.clientX - bg.offsetLeft - divRight.offsetLeft - 5) / progressBar.offsetWidth * ado.duration;
};
dot.onmousedown = function(e) { //激活 拖动圆点选取播放进度事件
	if(playBtn.play) {
		return;
	}
	document.onmousemove = function(e) { //拖动圆点选取播放进度
		ado.currentTime = (e.clientX - bg.offsetLeft - divRight.offsetLeft - 5) / progressBar.offsetWidth * ado.duration;
	}
};
document.onmouseup = function() {
	document.onmousemove = null; //取消 拖动圆点选取播放进度事件
};

pstyle.onclick = function() { //改变播放方式
	if(pstyle.sty == 1) {
		pstyle.sty = 2; //列表循环播放
		pstyle.style.backgroundPosition = "-160px -179px";
		pstyle.onmouseover = function() {
			this.style.backgroundPosition = "-144px -179px";
		}
		pstyle.onmouseout = function() {
			this.style.backgroundPosition = "-160px -179px";
		}
	} else if(pstyle.sty == 2) {
		pstyle.sty = 3 //随机播放
		pstyle.style.backgroundPosition = "-96px -179px";
		pstyle.onmouseover = function() {
			this.style.backgroundPosition = "-80px -179px";
		}
		pstyle.onmouseout = function() {
			this.style.backgroundPosition = "-96px -179px";
		}
	} else {
		pstyle.sty = 1; //列表循环播放
		pstyle.style.backgroundPosition = "-32px -179px";
		pstyle.onmouseover = function() {
			this.style.backgroundPosition = "-16px -179px";
		}
		pstyle.onmouseout = function() {
			this.style.backgroundPosition = "-32px -179px";
		}
	}
}
pstyle.onclick();

voice.onclick = function() {
	if(voiceBox.style.display == "block") {
		voiceBox.style.display = "none";
	} else {
		voiceBox.style.display = "block";
	}
}

voiceDot.onmousedown = function(e) { //激活 拖动圆点调节音量
	document.onmousemove = function(e) { //拖动圆点调节音量
		var volume = (voiceBar.offsetHeight - e.clientY - document.documentElement.scrollTop + bg.offsetTop + voiceBox.offsetTop + 10) / voiceBar.offsetHeight;
		if(volume >= 1) {
			ado.volume = 1;
		} else if(volume <= 0) {
			ado.volume = 0;
		} else {
			ado.volume = volume;
		}
		voiceProgress.style.marginTop = voiceBar.offsetHeight - ado.volume * voiceBar.offsetHeight + "px";
		voiceDot.style.top = voiceBar.offsetHeight - ado.volume * voiceBar.offsetHeight + 6 + "px";
		voiceStyle();
	}
};

document.onmouseup = function() {
	document.onmousemove = null; //取消 拖动圆点调节音量
};

voiceStyle();
function voiceStyle() {
	switch(true) {
		case ado.volume == 0:
			voice.style.backgroundPosition = "-160px -195px";
			voice.onmouseover = function() {
				voice.style.backgroundPosition = "-144px -195px";
			}
			voice.onmouseout = function() {
				voice.style.backgroundPosition = "-160px -195px";
			}
			break;
		case ado.volume >= 0.7:
			voice.style.backgroundPosition = "-96px -195px";
			voice.onmouseover = function() {
				voice.style.backgroundPosition = "-80px -195px";
			}
			voice.onmouseout = function() {
				voice.style.backgroundPosition = "-96px -195px";
			}
			break;
		default:
			voice.style.backgroundPosition = "-32px -195px";
			voice.onmouseover = function() {
				voice.style.backgroundPosition = "-16px -195px";
			}
			voice.onmouseout = function() {
				voice.style.backgroundPosition = "-32px -195px";
			}
			break;
	}
}

// 红老师代码
// function parseLyric(lyric) {
//       if(!lyric) return lyric;
//       var result = [];
//       var cArr = lyric.split("[");
//       cArr.shift();
//       for (var i = 0; i < cArr.length; i++) {
//           var o = cArr[i].split("]");
//           if (o.length >= 2 && o[1] != "") {
//               var tArr = o[0].split(":"), t = 0;
//               if (tArr.length >= 2) {
//                   var mtArr = tArr[0].split(""), mt = 0;
//                   for (var k = 0; k < mtArr.length; k++) {
//                       if (Number(mtArr[k]) > 0) {
//                           mt += mtArr[k] * Math.pow(10, mtArr.length - k - 1);
//                       }
//                   }
//                   t += mt * 60;
//                   var stArr = tArr[1].split("."), intStArr = stArr[0].split(""), st = 0;
//                   for (var j = 0; j < intStArr.length; j++) {
//                       if (Number(intStArr[j]) > 0) {
//                           st += intStArr[j] * Math.pow(10, intStArr.length - j - 1);
//                       }
//                   }
//                   t += Number(st + "." + stArr[1]);
//               }
//               if(t && typeof t == "number"){
//                   result.push({time : parseInt(t * 1e3), content : o[1]});
//               }
//           }
//       }
//       return result;
//  },

//    function renderLyric(lyric) {
//       lyric = this.parseLyric(lyric);
//       var me = this, dom = me.musicDom["lyricWrap"], tpl = "",len, i = 0;
//       len = lyric ? lyric.length : 0;
//       if(lyric && len){
//           for( i ; i < len ; i ++){
//               var data = lyric[i];
//               var time = data["time"], text = data["content"].trim();
//               text = text ? text : '--- music ---';
//               tpl += '<li class="u-lyric f-toe" data-time="'+time+'">'+text+'</li>';
//           }
//           tpl && (tpl += '<li class="u-lyric">Hungking Hsi</li>');
//       }else{
//           tpl = '<li class="eof">暂无歌词...</li>';
//       }
//       dom.style.marginTop = 0 + "px";
//       dom.screenTop = 0;
//       dom.innerHTML = tpl;
//   }