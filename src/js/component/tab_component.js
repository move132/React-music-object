 
var TabsControl =React.createClass({
	propTypes:{
		name:React.PropTypes.string,//标题
		nav_Click:React.PropTypes.func,  //选项卡切换回调
		//children:React.PropTypes.element //组件内部子元素
	},
    getInitialState:function(){
        return { 
            currentIndex : 0 
        }
    },
    componentDidUpdate:function(){
        //console.log(this.state.currentIndex);
    },
    f_Click:function(e){
        e.stopPropagation();
        e.preventDefault();
        var index= e.target.getAttribute("data-index");
        this.setState({
            currentIndex : parseInt(index) 
        });
        this.props.nav_Click(parseInt(index));
    },
    check_tittle_index:function(index){

        return index===this.state.currentIndex ? "active" : "";
    },

    check_item_index:function(index){
        //console.log(index,this.state.currentIndex);
        return index===this.state.currentIndex ? "tab-panle show" : "tab-panle";
    },
    render:function(){
        var _this=this;
        return(
            <div>
                <div className="uio-menu">
                	<ul> 
						{
	                        this.props.children.map(function(ele,index){ 
	                            return <li  key={index} onClick={_this.f_Click} className={_this.check_tittle_index(index)} data-index={index}>{ele.props.name}</li>
	                        })
	                    }
					</ul> 
                    <span className="m-icon close"></span>
                </div>
                <div className="tab-content">
                    {
                        this.props.children.map(function(ele,index){
                            return <div key={index}  className={_this.check_item_index(index)} > {ele.props.children} </div>
                        })
                    }
                </div>
            </div>
        );
    }
});


module.exports=TabsControl;