import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
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
                        data: [
                                {"id":"00001","itemName":"Apple", "price":"1.00", "quantity":"2"},
                                {"id":"00002","itemName":"Orange", "price":"1.00", "quantity":"2"},
                                {"id":"00003","itemName":"Weiner", "price":"1.00", "quantity":"2"},
                        ]
                };
        },
        generateId: function () {
                return Math.floor(Math.random()*90000) + 10000;
        },
        handleNodeRemoval: function (nodeId) {
                var data = this.state.data;
                data = data.filter(function (el) {
                        return el.id !== nodeId;
                });
                this.setState({data});
                return;
        },
        handleSubmit: function (item, price, quantity) {
                var data = this.state.data;
                var id = this.generateId().toString();
                var price = price;
                var quantity = quantity;
                var itemName = item;
                
                data = data.concat([{id, itemName, price, quantity}]);
                this.setState({data});
        },
        handleToggleComplete: function (nodeId) {
                var data = this.state.data;
                for (var i in data) {
                        if (data[i].id == nodeId) {
                                data[i].complete = data[i].complete === 'true' ? 'false' : 'true';
                                break;
                        }
                }
                this.setState({data});
                return;
        },
        handleLogin: function (token) {
                this.setState({authToken: token})
                this.setState({loggedIn: true})
        },
        getGroceryListId: function () {
                var data = {"token": this.state.authToken};
                var me = this;

                $.ajax({
                    method: "POST",                     
                    url: 'http://localhost:3000/v1/lists',                                                                                                          
                    data: data
                  })
                  .done(function(data) {
                    console.log('successfully retrieved grocery list id');                    
                    console.log(data);    
                    me.setState({groceryListId: data})                                    
                    return;
                  })
                  .fail(function(err) {
                    console.log('failed');
                    return;
                  });   
        },
        populateList: function (listId) {
                var data = {"token": this.state.authToken,
                            "id" : listId};

                $.ajax({
                    method: "POST",                     
                    url: 'http://localhost:3000/v1/list/',                                                                                                          
                    data: data
                  })
                  .done(function(data) {
                    console.log('successfully retrieved grocery list');                    
                    console.log(data);                                        
                    return;
                  })
                  .fail(function(err) {
                    console.log('failed');
                    return;
                  });  

        },        
        render: function() {                
                var loggedIn = this.state.loggedIn;

                if (loggedIn) {                                               
                        var data = this.state.data;                
                        var length = data.length;                        
                        console.log(this.state.authToken);
                        var groceryListId = this.state.groceryListId;
                        if (groceryListId == -1) {
                                this.getGroceryListId();                                
                        }
                        else {
                                this.populateList(groceryListId);
                        }
                        
                        return (        
                        <div>     
                                <TopBar />
                                <div className="well vert-offset-top-2">                                          
                                        <h1 className="vert-offset-top-0">Shopping List:</h1>
                                        <ShopList data={data} removeNode={this.handleNodeRemoval} toggleComplete={this.handleToggleComplete} />
                                        <ShopForm onItemSubmit={this.handleSubmit} />                                                                                                                                             
                                </div>
                        </div>
                        );                         
                }     
                else {
                        return (
                                <Login onLogin={this.handleLogin}/>
                                )
                }           
                
        }
});

export default ShopBox; 
