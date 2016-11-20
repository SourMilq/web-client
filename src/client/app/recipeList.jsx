import React from 'react';
import RecipeItem from './recipeItem.jsx';

var RecipeList = React.createClass({     
        addRecipe: function (recipeId) {
                this.props.addRecipe(recipeId);
                return;
        },   
        render: function() {                
                var listNodes = this.props.data.map(function (listItem) {
                return (
                        <RecipeItem addRecipe={this.addRecipe} key={listItem.id} nodeId={listItem.id} itemTitle={listItem.title} itemText={listItem.text} itemImage={listItem.imageUrl} itemIngredients={listItem.ingredients} cl={this.props.curList}/>
                );
                },this);
                return (
                        <ul className="list-group">
                                {listNodes}
                        </ul>
                );
        }
});

export default RecipeList;