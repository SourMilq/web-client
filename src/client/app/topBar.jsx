import React from 'react';
import ReactDOM from 'react-dom';

var TopBar = React.createClass({  
    changeList0: function (e) {
            e.preventDefault();                            
            console.log("0");
            this.props.changeList(0);
            return;
    },    
    changeList1: function (e) {
            e.preventDefault();                            
            console.log("1");
            this.props.changeList(1);
            return;
    },      
    changeList2: function (e) {
            e.preventDefault();                            
            console.log("2");
            this.props.changeList(2);
            return;
    },
    changeList3: function (e) {
            e.preventDefault();                            
            console.log("3");
            this.props.changeList(3);
            return;
    },
    render: function() {
      return (
        <div className="navbar navbar-inverse navbar-fixed-top">
           <div className="container">
              <div className="navbar-header">
                 <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                 <span className="icon-bar"></span>
                 <span className="icon-bar"></span>
                 <span className="icon-bar"></span>
                 </button>
                 <a className="navbar-brand hidden-xs" href="#"> SourMilq</a>                                                                  
              </div>
              <div className="navbar-collapse collapse">
                 <ul className="nav navbar-nav navbar-right">
                    <li className={(this.props.curList == 0 ? 'active' : '')} onClick={this.changeList0}><a href="#">Shopping List</a></li>
                    <li className={(this.props.curList == 1 ? 'active' : '')} onClick={this.changeList1}><a href="#">Fridge</a></li>
                    <li className={(this.props.curList == 2 ? 'active' : '')} onClick={this.changeList2}><a href="#">Recipes</a></li>  
                    <li className={(this.props.curList == 3 ? 'active' : '')} onClick={this.changeList3}><a href="#">Suggest</a></li>  
                 </ul>
              </div>
           </div>
        </div>
      );
    }
});

export default TopBar;
