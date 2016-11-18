import React from 'react';
import RecipeItem from './recipeItem.jsx';

var RecipeList = React.createClass({        
        render: function() {                
                var listNodes = this.props.data.map(function (listItem) {
                return (
                        <RecipeItem key={listItem.id} nodeId={listItem.id} itemTitle={listItem.title} itemText={listItem.text} itemImage={listItem.imageUrl} itemIngredients={listItem.ingredients}/>
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