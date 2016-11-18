import React from 'react';
import ReactDOM from 'react-dom';

var RecipeForm = React.createClass({        
        nextpage: function() {
                console.log("next page");
                this.props.onPageChange(10);
                return;
        },
        prevpage: function() {
                console.log("prev page");
                this.props.onPageChange(-10);
                return;
        },
        render: function() {
                return (                                                
                                                        
                        <div className="row">
                                <div className="col-md-4  text-right recipe-navbtn pull-left">
                                        <input type="submit" value="Previous" className={"btn btn-primary " + (this.props.pageOffset != 0 ? 'show' : 'hidden')} onClick={this.prevpage} />
                                </div>                                                        
                                <div className="col-md-4 text-right recipe-navbtn pull-right">
                                        <input type="submit" value="Next" className="btn btn-primary" onClick={this.nextpage}/>
                                </div>                                                                                                                                                                   
                        </div>                                                                                        
                                         
                );
        }
});

export default RecipeForm;
