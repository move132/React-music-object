require("../css/scss/music.scss");
require("../css/lib/jquery.mCustomScrollbar.min.css");
var jPlayer=require("../../node_modules/jplayer/dist/jplayer/jquery.jplayer");
var Pubsub = require("../../node_modules/pubsub-js/src/pubsub"); 

var MusicListTab=require("music_list_tab");
var MusicPlayer=require("music_player");
 
 
window.current=0;
var interBg;
var Apps=React.createClass({
	getInitialState:function(){
		return {
			data:''
		};
	}, 
	setBgImg:function(res){
		var random= Math.floor(Math.random()*res.length);;  
		var url=res[random];
		//console.log(random,url);
		interBg=setInterval(function(){
			$("body").css({
				"background":"url("+url+") no-repeat",
				"background-size":"cover",
				"background-attachment":"fixed"
			}); 
		},4000); 
	},
	musiclist:function(res){
		if (localStorage.getItem("music_playlist")&&(JSON.parse(localStorage.getItem("music_playlist"))).length>0 ) {
			var res=JSON.parse(localStorage.getItem("music_playlist"));
			this.setState({
				data:res
			}); 
		}else{ 
			localStorage.setItem("music_playlist",JSON.stringify(res));  
			this.setState({
				data:res
			});  		 
		} 
	},
	componentDidMount:function(){ 
		var uio_player_box=$(".uio-player-box");
		var musicInfo=$(".musicInfo");
		var uio_jplayer=$("#uio_jplayer");
		var _this=this;
 
		
		$.ajax({
			url:"http://music.movecss.com/src/api.php",
			type:'get',
			dataType:'json',
			success:function(res){ 
				if (res.code == 200) {
					_this.setBgImg(res.data.imglist);
					_this.musiclist(res.data.musiclist);
				}; 
			}
		});
 
		
		$(".uio-close-player").click(function(){
			if (parseInt(uio_player_box.css("left"))==0) {
				uio_player_box.css({"left":"-520px"});  
				$(this).find("span").removeClass("act");
			}else{
				uio_player_box.css({"left":0});
				$(this).find("span").addClass("act");
			}
		}); 
		
		//歌曲列表操作
		$("body").on("click",".close",function(){
			$(".uio-music-list").fadeOut();
		});

		$("body").on("click",".musiclist",function(){
			$(".uio-music-list").fadeIn();
		});  
	}, 
	MusicItemClick:function(obj,current,e){
		//console.log(current); 
		Pubsub.publish('com.MusicItem.Click',{"obj":obj,"current":current,"ele":e});
	}, 
	render:function(){
		if (this.state.data) {
			MusicPlayer=<MusicPlayer  list={this.state.data} />;
			MusicListTab=<MusicListTab data={this.state.data}  MusicItemClick={this.MusicItemClick}/>;
		};
		return (
			<div>
				<div id="uio_jplayer" ></div>
				<div className="page_con">
					github项目地址: <br />
					<a href="https://github.com/move132/React-music-object" target="_blank">https://github.com/move132/React-music-object</a>
				</div>
				<div className="uio-player-box">
					{MusicPlayer}
					{MusicListTab}
 
					<div className="uio-close-player">
						 <span></span>
					</div>
				</div> 
			</div>
		);
	}
});
ReactDOM.render(<Apps />,document.getElementById("app"));
