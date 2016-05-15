var Util=require("util");
var Pubsub = require("pubsub-js"); 
window.mode_index=0;
var MusicPlayer=React.createClass({ 
	getInitialState:function(){   
		return {
			mid:"",
			title:"听我想听的歌",
			singer:"", 
			music_url:"", 
			thumb:"../image/static/cover_bg.jpg"
		};
	},
	componentDidMount:function(){
		var _this=this;
		Util.initPlayer(_this);  //初始化播放器

		$(".uio-playerl div").on("click",function(e){  //歌曲列表操作按钮 
			var btn_type=e.target.classList[2];
			if(btn_type==="prev"){ 
				console.log("上一曲",window.current);
				Util.previous(_this);
			}
			if(btn_type==="next"){ 
				console.log("下一曲",window.current); 
				Util.next(_this);
			}
		});

		

		Pubsub.subscribe('com.MusicItem.Click', function (context, object) {  
			mailId=object; 
			window.current=mailId.current;  

			var musicList = Util.getPlaylist();  //获取localStorage 的值
			Util.play(_this,musicList,window.current);


		    _this.setState({
		    	mid:mailId.obj.mid,
				title:mailId.obj.title,
				singer:mailId.obj.singer, 
				music_url:mailId.obj.music_url, 
				thumb:mailId.obj.thumb
		    });
		});

		
		Pubsub.subscribe('com.CpBtn.Click', function (context, object) { 
			//console.log("传送数据：", JSON.parse(object.current_music) )
			//
			if (object.current_music) { 
				var palyMiscInfo=object.current_music;
				 _this.setState({
			    	mid:palyMiscInfo.mid,
					title:palyMiscInfo.title,
					singer:palyMiscInfo.singer, 
					music_url:palyMiscInfo.music_url, 
					thumb:palyMiscInfo.thumb
			    });
			}else{
				 _this.setState({
			    	mid:"",
					title:"听我想听的歌",
					singer:"", 
					music_url:"", 
					thumb:"../image/static/cover_bg.jpg"
			    });
			}
		});
	},
	componentWillUnmount:function(){
        Pubsub.unsubscribe('com.MusicItem.Click');
        Pubsub.unsubscribe('com.CpBtn.Click');
    },
    handlePlayMode:function(e){
    	var mode=["loop","single","order","random"];
    	var mode_title=["列表循环","单曲循环","顺序播放","随机播放"];
    	window.mode_index++; 
    	window.mode_index=(window.mode_index >= mode.length) ? 0 : window.mode_index;   
    	$(e.target).removeAttr("class").addClass("m-icon icon-sizesmall "+ mode[window.mode_index]).attr("title",mode_title[window.mode_index]);
    	
    },
	render:function(){
		return (
			<div className="uio-music-player clearfix">
				<div className="uio-music-info">
					<a href="javascript:;">
						<img src={this.state.thumb} /> 
					</a>
				</div>
				<div className="uio-bar-info">
					<div className="uio-m-info uio-music-name ellipsis">
					 	<span>{this.state.title}--{this.state.singer}</span>
					</div>
					<div className="uio-progress-bar">
						<p className="uio-player_bar"> 
							<span className="player_bg_bar" id="spanplayer_bgbar"></span>
							<span className="download_bar" id="downloadbar" ></span>
							<span className="play_current_bar" id="spanplaybar"></span>
							<span className="progress_op"  id="spanprogress_op"></span> 
							<span className="uio-time">00:00</span> 
						</p>
						{/*<span className="jp-current-time"></span>*/}
					</div>
					<div className="uio-player-controls">
						<div className="uio-playerl">
							<div className="m-icon icon-sizesmall prev"></div>
							<div className="m-icon icon-sizebig start uio_music_play"></div> 
							<div className="m-icon icon-sizesmall next"></div>
						</div>
						<div className="uio-playerr"> 
							<div className="m-icon icon-sizesmall play_mode loop" onClick={this.handlePlayMode}  title="列表循环"></div> 
							<div className="uio-volume-box">
								<div className="m-icon icon-sizesmall volume"></div>
						 		<div className="uio-bar-box">
						 			<div className="uio-jp-volume-bar">
							 			<div className="uio-volume-bar-value" style={{"width":"43.4783%"}}></div>
							 		</div>
						 		</div>
						 	</div>
							<div className="m-icon musiclist"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports=MusicPlayer;