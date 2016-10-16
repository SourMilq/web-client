import React from 'react';
import ReactDOM from 'react-dom';

var TopBar = React.createClass({        
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
                                    <li className="active"><a href="#">Shopping List</a></li>
                                    <li><a href="#about">Fridge</a></li>
                                    <li><a href="#contact">Recipe</a></li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                );
        }
});

export default TopBar;
