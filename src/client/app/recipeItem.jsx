import React from 'react';
import ReactDOM from 'react-dom';

var RecipeItem = React.createClass({ 
        addRecipe: function (e) {
                e.preventDefault();
                this.props.addRecipe(this.props.nodeId);
                return;
        },               
        render: function() {
                var classes = 'list-group-item clearfix';                
                return (
                        <li className={classes}>
                                <div className="row">                                        
                                        <div className="item-name col-xs-1 col-xl-1 col-md-1 pull-left"> <img src={this.props.itemImage} className="recipe-image"/> </div>
                                        <div className="item-name-2 recipe-title col-xs-2 col-xl-2 col-md-2 pull-center"> {this.props.itemTitle} </div>
                                        <div className="item-name-3 recipe-text col-xs-4 col-xl-4 col-md-4 pull-center "> {this.props.itemText} </div>                                        
                                        <div className="item-name-3 recipe-text col-xs-4 col-xl-4 col-md-4 pull-center "> <pre>{this.props.itemIngredients}</pre> </div>                                        
                                        <div className="item-name-3 col-xs-1 col-xl-1 col-md-1 pull-right">
                                                <button type="button" className="btn btn-xs btn-success img-circle pull-right btnCheck" onClick={this.addRecipe}>&#43;</button>                                                                                    
                                        </div>
                                </div>
                        </li>
                );
        }
});

export default RecipeItem;
