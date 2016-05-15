var MusicListGroup=require("../component/music_list_group");
var TabsControl=require("../component/tab_component");

var MusicListTab=React.createClass({  
	render:function(){
		return (
			<div className="uio-music-list">
				<div className="uio-splice-bg"></div>
				<TabComponent data={this.props.data} handlerCpClick={this.props.handlerCpClick} MusicItemClick={this.props.MusicItemClick}/>
			</div>
		);
	}
});


var TabComponent=React.createClass({
	getInitialState:function() {
	    return {
	        data:this.props.data  
	    };
	},
	componentDidMount:function() {},
	nav_Click:function(index){
		//console.log(this.props.data);
	},
	handlerCpClick:function(musicList){ 
		this.setState({
			data:musicList
		}); 
	},
    render:function(){
    	var countStr=this.state.data.length == 0 ? "播放列表" : "播放列表（"+this.state.data.length+"）"; 
        return ( 
            <TabsControl nav_Click={this.nav_Click}> 
                <div name={countStr}> 
                    <MusicListGroup data={this.state.data} handlerCpClick={this.handlerCpClick} MusicItemClick={this.props.MusicItemClick} /> 
                </div>
                <div name="推荐">
                   <div className="con">
                        <img src="../image/lib/1380442442.jpg" alt="" />
                    </div>
                </div>
            </TabsControl> 
        );
    }
});

module.exports=MusicListTab;