import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import RecipeList from './recipeList.jsx';
import RecipeForm from './recipeForm.jsx';
import ShopList from './shopList.jsx';
import ShopForm from './shopForm.jsx';
import TopBar from './topBar.jsx';
import Login from './login.jsx'


var ShopBox = React.createClass({
    getInitialState: function () {
        console.log("init");                

        return {
            loggedIn : false,
            authToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaXJzdF9uYW1lIjoiZmlyc3ROYW1lIiwibGFzdF9uYW1lIjoibGFzdE5hbWUiLCJlbWFpbCI6InRlbXAtZW1haWxAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ0ZXN0IiwicGFzc3dvcmQiOiJwYXNzIn0.77dKU0pq1xfA0zbV3ASl4QV-K43noKE7Gak8Ana2rhk",                        
            groceryListId : -1,   
            fridgeListId : -1,   
            listType : 0,
            offset : 0,
            percentage: 100,
            recipes: [],
            // recipes : [
            //     {"id":"00001","sourceUrl":"http://allrecipes.com/recipe/218489/", "text":"Roast the walnuts in a dry frying pan over medium heat, stirring frequently, until golden brown and fragrant. Remove the pan from the heat, and pour walnuts onto a cutting board to cool slightly; coarsely chop the nuts.                        Heat the olive oil in a saucepan over medium heat. Stir in the shallots and garlic; cook and stir until the shallots have softened and turned translucent, about 3 minutes. Add the chopped walnuts, orange zest, orange juice, and cinnamon, and boil for 1 minute.                        Puree the mixture in a blender or food processor with 1 cup of vegetable stock. Return the soup to the saucepan and pour in the remaining 3 cups of vegetable stock.                        Bring to a boil; reduce the heat and simmer for 4 to 5 minutes. Remove from heat; stir in the yogurt, and season with salt and black pepper to taste. Garnish with chopped cilantro.", "title":"Turkish Walnut Soup", "imageUrl" : "http://farm4.static.flickr.com/3623/3279671785_d1f2e665b6_s.jpg", "ingredients" : "3/4 cup peeled, seeded, and shredded cucumber"},
            //     {"id":"00002","sourceUrl":"http://allrecipes.com/recipe/218490/", "text":"Preheat oven to 250 degrees F (120 degrees C). Line 2 baking sheets with parchment paper.                        Cut about 1/4 inch off a corner of a heavy gallon-size resealable plastic bag, and push a large-size cake decorating tip (such as a star tip) into the opening. The fit should be tight.                        In a small bowl, stir the gelatin mix with the sugar substitute. In a large bowl, using an electric mixer, beat the egg whites with cream of tartar and salt until stiff peaks form. As you beat the egg whites, gradually add the gelatin mixture, about 1 tablespoon at a time. Spoon the fluffy mixture into the prepared plastic bag, and gently squeeze and twist the bag to force the meringue mixture to the decorating tip. (Do not seal bag, so that air can escape.)                        Squeeze the bag to place golf-ball size dollops of meringue mixture onto the prepared baking sheets. For a decorative effect, twist and lift as you place the cookie on the sheet, to make a pretty shape.                        Bake in the preheated oven until the cookies are set and dry, about 1 hour and 30 minutes. Do not open oven door while baking. At end of baking time, turn off oven, open oven door, and allow the cookies to slowly cool in the oven before removing from baking sheets. Store in airtight container.", "title":"Low Carb Flavored Meringue Cookies", "imageUrl" : "https://spoonacular.com/recipeImages/829382-556x370.jpg", "ingredients" : "200 Weiners"},
            // ],
            data : []                     
            // data: [ // Stub
            //         {"id":"00001","itemName":"Apple", "price":"1.00", "quantity":"2"},
            //         {"id":"00002","itemName":"Orange", "price":"1.00", "quantity":"2"},
            //         {"id":"00003","itemName":"Weiner", "price":"1.00", "quantity":"2"},
            // ]
        };
    },
    generateId: function () {
        return Math.floor(Math.random()*90000) + 10000;
    },
    getListId:  function (listType) {
        var listType = this.state.listType;
        var listId;
        switch (listType) {
            case 0:
                listId = this.state.groceryListId;
                break;
            case 1:
                listId = this.state.fridgeListId;
                break;
        } 

        return listId;
    },    
    handleNodeRemoval: function (nodeId) {
        // var data = this.state.data;
        // data = data.filter(function (el) {
        //         return el.id !== nodeId;
        // });
        // this.setState({data});

        var me = this;

        var itemId = nodeId;
        var listId = this.getListId();

        var data = {
               token : this.state.authToken 
        };

        $.ajax({
            method: "POST",                     
            url: 'http://localhost:3002/v1/list/' + listId + '/item/' + itemId,                                                                                                          
            data: data
          })
          .done(function(dataGet) {
            console.log('successfully delete from list');    

            if (dataGet == '') {return};
            var list = JSON.parse(dataGet);                    
            var data = [];

            for (var i = 0; i < list.length; i++) {
                var id = list[i].id;
                var itemName = list[i].name;
                var price = list[i].price;
                var quantity = list[i].quantity;
                var expiration = list[i].expiration;
                data = data.concat([{id, itemName, price, quantity, expiration}]); 
            }                                          

            me.setState({data});                                                                
            return;
          })
          .fail(function(err) {
            console.log('failed');
            return;
          }); 

        return;
    },
    handleSubmit: function (item, price, quantity, expiration) {
        // var data = this.state.data;
        var me = this;
        
        var itemPrice = price;
        var itemQuantity = quantity;
        var itemName = item;
        var listId = this.getListId();
        var itemExpiration = expiration;

        var data = {                        
            name : itemName,
            quantity : itemQuantity,
            price : itemPrice,
            expiration : itemExpiration,
            token : this.state.authToken
        }

        $.ajax({
            method: "POST",                     
            url: 'http://localhost:3002/v1/list/' + listId + '/item/add',                                                                                                          
            data: data
          })
          .done(function(dataGet) {
            console.log('successfully add to list');    

            if (dataGet == '') {return};
            var list = JSON.parse(dataGet);                    
            var data = [];



            for (var i = 0; i < list.length; i++) {
                var id = list[i].id;
                var itemName = list[i].name;
                var price = list[i].price;
                var quantity = list[i].quantity;
                var expiration = list[i].expiration;
                data = data.concat([{id, itemName, price, quantity, expiration}]); 
            }                                          

            me.setState({data});                                                                
            return;
          })
          .fail(function(err) {
            console.log('failed');
            return;
          });

        // data = data.concat([{id, itemName, price, quantity}]);
        // this.setState({data});
        return;
    },
    handleToggleComplete: function (nodeId) {
        // var data = this.state.data;
        // for (var i in data) {
        //         if (data[i].id == nodeId) {
        //                 data[i].complete = data[i].complete === 'true' ? 'false' : 'true';
        //                 break;
        //         }
        // }
        // this.setState({data});

        var me = this;

        var itemId = nodeId;
        var listId = this.getListId();

        var data = {
               token : this.state.authToken 
        };

        $.ajax({
            method: "POST",                     
            url: 'http://localhost:3002/v1/list/' + listId + '/item/' + itemId + '/done',                                                                                                          
            data: data
          })
          .done(function(dataGet) {
            console.log('successfully done from list');    

            if (dataGet == '') {return};
            var list = JSON.parse(dataGet);                    
            var data = [];

            for (var i = 0; i < list.length; i++) {
                var id = list[i].id;
                var itemName = list[i].name;
                var price = list[i].price;
                var quantity = list[i].quantity;
                var expiration = list[i].expiration;
                data = data.concat([{id, itemName, price, quantity, expiration}]); 
            }                                          

            me.setState({data});                                                                
            return;
          })
          .fail(function(err) {
            console.log('failed');
            return;
          });         

        return;
    },
    handleLogin: function (token) {                
        this.setState({authToken: token})
        this.setState({loggedIn: true})
        this.sync();
        return;
    },
    handleListChange: function(listId) {
        this.setState({listType: listId})
        this.sync(listId);        

        return;
    },
    handleExpirationChange: function(nodeId, newExpiration) {
        var me = this;

        var itemId = nodeId;
        var listId = this.getListId();

        var data = {
                expiration : newExpiration,
                token : this.state.authToken
        };

        $.ajax({
            method: "POST",
            url: 'http://localhost:3002/v1/list/' + listId + '/item/' + itemId + '/update',
            data: data
          })
          .done(function(dataGet) {
            console.log('successfully done from list');

            if (dataGet == '') {return};
            var list = JSON.parse(dataGet);
            var data = [];

            for (var i = 0; i < list.length; i++) {
                var id = list[i].id;
                var itemName = list[i].name;
                var price = list[i].price;
                var quantity = list[i].quantity;
                var expiration = list[i].expiration;
                data = data.concat([{id, itemName, price, quantity, expiration}]);
            }

            me.setState({data});                                                                
            return;
          })
          .fail(function(err) {
            console.log('failed');
            return;
          });         
        
        return;
    },
    handlePageChange: function(increment) {
        var oldOffset = this.state.offset;     
        var newOffset = oldOffset + increment;           
        this.populateRecipe(newOffset);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        this.setState({offset: newOffset});
        return;
    },
    handleAddRecipe: function(recipeId) {
        var me = this;

        var data = {                
                token : this.state.authToken
        };

        $.ajax({
            method: "POST",
            url: 'http://localhost:3002/v1/recipe/' + recipeId + '/add',
            data: data
          })
          .done(function(dataGet) {
            console.log('successfully added recipe ingredients');
                                                                          
            return;
          })
          .fail(function(err) {
            console.log('failed');
            return;
          });

        return;
    },
    getAllListId: function () {
        var data = {"token": this.state.authToken};
        var me = this;

        $.ajax({
            method: "POST",
            url: 'http://localhost:3002/v1/lists',
            data: data
          })
          .done(function(data) {
            console.log('successfully retrieved list id');

            var list = JSON.parse(data);
            var lid;

            for (var i = 0; i < list.length; i++) {
                var name = list[i].name;
                var id = list[i].id;
                if (name == 'Grocery List') {
                    me.setState({groceryListId: id});
                    lid = id;
                }
                else if (name == 'Fridge') {
                    me.setState({fridgeListId: id});                    
                    lid = id;
                }
            }              
            me.populateList(lid, false);                                
            return;
          })
          .fail(function(err) {
            console.log('failed');
            return;
          });   
    },
    recommandRecipe: function(percentage) {        
        var me = this;

        var data = {
                percentage : percentage,                
                token : this.state.authToken                
        };

        $.ajax({
            method: "POST",                     
            url: 'http://localhost:3002/v1/recipe/suggest',
            data: data
          })
          .done(function(dataGet) {
            console.log('successfully recommanded recipe');
            if (dataGet == '') {return};
            var list = JSON.parse(dataGet);

            var recipes = [];

            for (var i = 0; i < list.length; i++) {
                var id = list[i].id;
                var sourceUrl = list[i].sourceUrl;
                var title = list[i].title;
                var text = list[i].text;
                var ingredientsList = JSON.parse(list[i].extendedIngredients).ingredients;
                var ingredients = "";
                var imageUrl = list[i].imageUrl;
                for (var j = 0; j < ingredientsList.length; j++) {
                    ingredients +=   "• " + ingredientsList[j].originalString + '\n';
                };
                
                recipes = recipes.concat([{id, sourceUrl, title, text, ingredients, imageUrl}]);
            }

            me.setState({recipes});            
            return;
        })
          .fail(function(err) {
            console.log('failed');
            return;
          });
    },
    populateRecipe: function(offset) {        
        var me = this;

        var data = {
                offset : offset,                
                token : this.state.authToken                
        };

        $.ajax({
            method: "POST",                     
            url: 'http://localhost:3002/v1/recipe/',
            data: data
          })
          .done(function(dataGet) {
            console.log('successfully retrieved recipe');
            if (dataGet == '') {return};
            var list = JSON.parse(dataGet);

            var recipes = [];

            for (var i = 0; i < list.length; i++) {
                var id = list[i].id;
                var sourceUrl = list[i].sourceUrl;
                var title = list[i].title;
                var text = list[i].text;
                var ingredientsList = JSON.parse(list[i].extendedIngredients).ingredients;
                var ingredients = "";
                var imageUrl = list[i].imageUrl;
                for (var j = 0; j < ingredientsList.length; j++) {
                    ingredients += "• " + ingredientsList[j].originalString + '\n';
                };
                
                recipes = recipes.concat([{id, sourceUrl, title, text, ingredients, imageUrl}]);
            }

            me.setState({recipes});            
            return;
        })
          .fail(function(err) {
            console.log('failed');
            return;
          });

    },
    populateList: function (listId, doAlert) {                       
        var sendData = {"token": this.state.authToken}; 
        var me = this;

        $.ajax({
            method: "POST",                     
            url: 'http://localhost:3002/v1/list/' + listId,                                                                                                          
            data: sendData
          })
          .done(function(dataGet) {
            console.log('successfully retrieved list ' + listId);                                        
            if (dataGet == '') {return};
            var list = JSON.parse(dataGet);

            var data = [];
            var expired = 'Following Milq has gone sour:\n';
            var hasExpires = false;
            var n = new Date();            

            for (var i = 0; i < list.length; i++) {
                var id = list[i].id;
                var itemName = list[i].name;
                var price = list[i].price;
                var quantity = list[i].quantity;
                var expiration = list[i].expiration;                
                data = data.concat([{id, itemName, price, quantity, expiration}]); 

                var d = new Date(expiration);
                
                if (n>d  && expiration != null) {
                    hasExpires = true;
                    expired += itemName + ' expired on: ' + expiration + '\n';
                };
            }                    

            if (hasExpires && doAlert) {
                alert(expired);    
            };

            me.setState({data});            
            return;
          })
          .fail(function(err) {
            console.log('failed');
            return;
          });
    },
    getListName: function (listId) {
        var names = ["Shopping List", "Fridge", "Recipe", "Suggested Recipes"];
        return names[listId];
    },    
    sync: function (listType) {
        var loggedIn = this.state.loggedIn;
        var doAlert = true;
        console.log("sycing");

        if (loggedIn) {  
            if (listType == null) {
                listType = this.state.listType;
                doAlert = false;
            }            

            switch (listType) {
                case 0: 
                    var groceryListId = this.state.groceryListId;
                    if (groceryListId == -1) {
                            this.getAllListId();
                    }
                    else {
                            this.populateList(groceryListId, false);
                    }
                    break;
                case 1: 
                    var fridgeListId = this.state.fridgeListId;
                    if (fridgeListId == -1) {
                            this.getAllListId();
                    }
                    else {
                            this.populateList(fridgeListId, doAlert);
                    }
                    break;
                case 2: 
                    var offset = this.state.offset;
                    this.populateRecipe(offset);
                    break;
                case 3:
                    var percentage = this.state.percentage;
                    this.recommandRecipe(percentage);
                    break;
            }            
        }       
        else {
            console.log("not logged in");
        }

        return;
    },
    componentDidMount: function() {
        console.log("did mount");
        this.startPolling();
    },
    componentWillMount: function() {
        console.log("will mount");
        if (this._timer) {
                clearInterval(this._timer);
                this._timer = null;
        }
    },
    startPolling: function() {
        var self = this;
        self._timer = setInterval(self.sync , 10000);
    },                        
    render: function() {                
        var loggedIn = this.state.loggedIn;

        // if (true) { // Stub
        if (loggedIn) {           
            var listType = this.state.listType;
            var listName = this.getListName(listType);

            if (listType > 1) {
                var recipes = this.state.recipes;    

                return (
                <div>     
                        <TopBar changeList={this.handleListChange} curList={listType}/>
                        <div className="well vert-offset-top-2">  
                            <h1 className="vert-offset-top-0">{listName}:</h1>   
                            <RecipeList data={recipes} addRecipe={this.handleAddRecipe} curList={listType}/>          
                            <RecipeForm onPageChange={this.handlePageChange} pageOffset={this.state.offset} cl={listType}/> 
                        </div>
                </div>                    
                );
            } else {
                var data = this.state.data;                                
                          
                return (        
                    <div>     
                        <TopBar changeList={this.handleListChange} curList={listType}/>
                        <div className="well vert-offset-top-2">                                          
                            <h1 className="vert-offset-top-0">{listName}:</h1>
                            <ShopList data={data} removeNode={this.handleNodeRemoval} toggleComplete={this.handleToggleComplete} changeExpiration={this.handleExpirationChange} curList={listType}/>
                            <ShopForm onItemSubmit={this.handleSubmit} />                                                                                                                                             
                        </div>
                    </div>
                );
            }            
        }
        else {
            return (
                <Login onLogin={this.handleLogin}/>
            );
        }           
            
    }
});

export default ShopBox; 
