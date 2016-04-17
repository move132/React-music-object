  
require('mCustomScrollbar')($); 
var Util=require("util");
var Pubsub = require("pubsub-js"); 
var MusicListGroup=React.createClass({  
  	render:function(){  
	    return (
	        <div className="uio-musicList">
				<MusicList data={this.props.data}  handlerCpClick={this.props.handlerCpClick} MusicItemClick={this.props.MusicItemClick}/>
			</div>
	    );
	}
});


var MusicList=React.createClass({ 
	getInitialState:function(){
		return {
			data:this.props.data
		}
	},
	componentDidMount:function(){
		$(".uio-musicList").mCustomScrollbar({
			autoHideScrollbar:true,
			theme:"light-3",
			callbacks:{
			    onInit: function(){
			    	 
			    }
			}
		}); 
	},  
	getCurrentMusicIndex:function(musicList, win_current_mid){
		var current_index=0;
		if (musicList) {
			for (var i = 0; i < musicList.length; i++) {
				if ( musicList[i]["mid"] == win_current_mid ){
					current_index=i;
				}
			};
		};
		return current_index;
	},
	handlerCpClick:function(e,action,current_index){
		var _this=this;
		switch(action){
			case "fav":
				$(e.target).removeClass("fav").addClass("faved");
				break;
			case "share":
				alert("分享");
				break;
			case "like":
				alert("喜欢")
				break;
			case "delete":
  
				var musicList=Util.getPlaylist();  
				var current_mid=musicList[current_index]["mid"]; 
			 	musicList.splice(current_index,1);  //删除所在数组的对应元素
				 
				this.props.handlerCpClick(musicList); //传递给列表选项卡（歌曲数目重新计算）
 	
				 
				Util.setPlaylistToLocalStroage(JSON.stringify(musicList)); //重新保存到 LocalStroage
				this.setState({     //刷新列表
					data:musicList
				}); 

				if (!window.currentObj) {  //如果还没有播放任何音乐时
					return;
				};

				var current_m_index=this.getCurrentMusicIndex(musicList, window.currentObj["mid"]); 
				Util.setActiveEle(current_m_index);
 
				
				if (current_mid==window.currentObj["mid"]) {   
					Util.clearMedia();  //销毁播放 
					//console.log(musicList[current_index]);
					//console.log("将要播放音乐的序号：",current_index);
					//console.log("数据数量：",musicList.length);
					if (musicList.length > 0) {
						var current_index=current_index==musicList.length ? 0 :current_index;
						Util.play(_this,musicList,current_index); 
						//更新歌曲播放的信息 
					}; 
					Pubsub.publish('com.CpBtn.Click',{"current_music":musicList[current_index] }); 
				}; 
			break;
		}
	},
	render:function(){
		var _this=this;
		return (
			<ul>   
				{
					this.state.data.map(function(item,key){
						return <MusicListItem ItemClick={_this.props.MusicItemClick} handlerCpClick={_this.handlerCpClick}  index={key}  key={key} item={item}/>
					})
				}
			</ul>
		)
	}
});
 


var MusicListItem=React.createClass({
	handlerMusicItemClick:function(e){  
		var obj=$(e.target).parents(".musicInfo").attr("data-obj");
		var e=$(e.target).parents(".musicInfo");  
		//console.log("选中的音乐序号：",$(e).parents("li").index());
		var current=$(e).parents("li").index();
		this.props.ItemClick(JSON.parse(obj),current,e);
		 
	}, 
	handlerCpClick:function(e){ 
		e.stopPropagation();
		var action=(e.target.classList)[1];
		var current_index=e.target.getAttribute("data-index");  
		this.props.handlerCpClick(e,action,current_index);   
	},  
	render:function(){
		var obj={
			mid:this.props.item.mid,
			title:this.props.item.title,
			singer:this.props.item.singer, 
			music_url:this.props.item.music_url,
			album:this.props.item.album,
			thumb:this.props.item.thumb
		};
		obj=JSON.stringify(obj);
		return (
			<li>
				<div className="musicInfo" onDoubleClick={this.handlerMusicItemClick} data-obj={obj} data-href={this.props.item.music_url} data-thumb={this.props.item.thumb}>
					<div className="name" title={this.props.item.title}>{this.props.item.title}</div>
					<div className="artist" title={this.props.item.singer}>{this.props.item.singer}</div>
					<div className="play_album" title={this.props.item.album} >
						{this.props.item.album} 
					</div>
					<div className="list_cp">
						<a href="javascript:;" className="p-icon fav"  data-index={this.props.index}	  onClick={this.handlerCpClick}   data-mid={this.props.item.mid}  title="收藏"></a>
						<a href="javascript:;" className="p-icon share" data-index={this.props.index}   onClick={this.handlerCpClick}   data-mid={this.props.item.mid}  title="分享"></a>
						<a href="javascript:;" className="p-icon like"  data-index={this.props.index}	  onClick={this.handlerCpClick}   data-mid={this.props.item.mid}  title="喜欢"></a>
						<a href="javascript:;" className="p-icon delete" data-index={this.props.index}  onClick={this.handlerCpClick}   data-mid={this.props.item.mid}  title="删除"></a>
					</div>
				</div>
			</li>
		);
	}
});

 
module.exports=MusicListGroup;