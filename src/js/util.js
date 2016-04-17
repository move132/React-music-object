var $=require("../../node_modules/jquery/dist/jquery.min");
var jPlayer=require("../../node_modules/jplayer/dist/jplayer/jquery.jplayer");

module.exports={
	initPlayer:function(_reactThis){
		var _this=this;
		$("#uio_jplayer").jPlayer({
			ready: function (event) { 
				/*$(this).jPlayer("setMedia", { 
					m4a: initPlayer.music_url
				});*/
			},
			play: function(event) {
				$(".start").removeClass("start").addClass("stop");
			},
			pause: function(event) {
				$(".stop").removeClass("stop").addClass("start");
			},
			ended: function(event) {
				//console.log("当前歌曲播发完成！！！ ");  
				var musiclist=_this.getPlaylist(); 
				if (typeof window.mode_index != "undefined") { 
					switch (window.mode_index){
						case 0: 
							console.log("列表循环播放");
							window.current=window.current < musiclist.length-1 ?  window.current+1 : 0 ; 
							_this.play(_reactThis,musiclist,window.current);  
						break;
						case 1:
							console.log("单曲循环播放");
							_this.play(_reactThis,musiclist,window.current); 
						break;
						case 2:
							console.log("列表顺序播放");
							window.current=window.current < musiclist.length-1 ?  window.current+1 : musiclist.length ; 
							 
							if (window.current == musiclist.length ) {
								return;
							}
							_this.play(_reactThis,musiclist,window.current); 
						break;
						case 3:
							console.log("随机播放");
							var random= Math.floor(Math.random()*musiclist.length);  
							_this.play(_reactThis,musiclist,random); 
						break;
					}
				}; 
			},
			swfPath: "../js",
			supplied: "m4a, oga",
			wmode: "window",
			useStateClassSkin: true,
			autoBlur: false,
			smoothPlayBar: true,
			keyEnabled: true,
			remainingDuration: true,
			toggleDuration: true, 
			//verticalVolume: true, //音量显示方式 垂直 or 水平
			cssSelectorAncestor:".uio-music-player",
			cssSelector:{
				play:".uio_music_play", //播放按钮
				seekBar: ".uio-player_bar",//进度条ELE
				playBar: ".play_current_bar",//已经进行到X百分比进度条
				duration: ".uio-time", //时间模式切换
				//currentTime:"jp-current-time",
				mute: ".volume", //音量
				volumeBar: ".uio-jp-volume-bar",
				volumeBarValue: ".uio-volume-bar-value", //控制音量大小
				//volumeMax: ".jp-volume-max", 最大音量
			}
		}); 
	}, 
	getPlaylist: function() {
		var musiclist=JSON.parse(localStorage.getItem("music_playlist"));
		//var musiclist=localStorage.getItem("music_playlist");
		return musiclist;
	},
	setPlaylistToLocalStroage: function(music_playlist) { 
		localStorage.setItem("music_playlist",music_playlist); 
	},
	clearMedia:function(){
		$("#uio_jplayer").jPlayer("clearMedia");
	},
	/**
	 * @param  {[_reactThis]} 
	 * @param  {[musicList]}
	 * @param  {[index]}
	 * @return {[type]}
	 */
	play:function(_reactThis,musicList,index){
		var uio_jplayer=$("#uio_jplayer"); 
		uio_jplayer.jPlayer("setMedia",{
			m4a: musicList[index].music_url
		});
		uio_jplayer.jPlayer("play");
		_reactThis.setState({
	    	mid: musicList[index].mid,
			title: musicList[index].title,
			singer: musicList[index].singer, 
			music_url: musicList[index].music_url, 
			thumb: musicList[index].thumb
	    });
	    this.setActiveEle(index);
	    window.currentObj=musicList[index];
	},
	next: function(_reactThis) { 
		var musiclist=this.getPlaylist();
		window.current=window.current < musiclist.length-1 ?  window.current+1 : 0 ; 
		this.play(_reactThis,musiclist,window.current);  
	},
	previous: function(_reactThis) {
		var musiclist=this.getPlaylist();
		window.current=(window.current == 0 ) ? musiclist.length-1 : window.current-1;
		this.play(_reactThis,musiclist,window.current);  
	},
	setActiveEle:function(index){
		$(".musicInfo").removeClass("active").eq(index).addClass("active");  
	}
}