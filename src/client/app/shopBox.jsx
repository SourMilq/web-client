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
            fridgeListId : -1,   
            listType : 0,
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
    handleNodeRemoval: function (nodeId) {
        // var data = this.state.data;
        // data = data.filter(function (el) {
        //         return el.id !== nodeId;
        // });
        // this.setState({data});

        var me = this;

        var itemId = nodeId;
        var listId = this.state.groceryListId;

        var data = {
               token : this.state.authToken 
        };

        $.ajax({
            method: "POST",                     
            url: 'http://localhost:3000/v1/list/' + listId + '/item/' + itemId,                                                                                                          
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
                data = data.concat([{id, itemName, price, quantity}]); 
            }                                          

            me.setState({data});
            me.setState({groceryListId: listId})                                                        
            return;
          })
          .fail(function(err) {
            console.log('failed');
            return;
          }); 

        return;
    },
    handleSubmit: function (item, price, quantity) {
        // var data = this.state.data;
        var me = this;
        
        var itemPrice = price;
        var itemQuantity = quantity;
        var itemName = item;
        var listId = this.state.groceryListId;

        var data = {                        
            name : itemName,
            quantity : itemQuantity,
            price : itemPrice,
            token : this.state.authToken
        }

        $.ajax({
            method: "POST",                     
            url: 'http://localhost:3000/v1/list/' + listId + '/item/add',                                                                                                          
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
                data = data.concat([{id, itemName, price, quantity}]); 
            }                                          

            me.setState({data});
            me.setState({groceryListId: listId})                                                        
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
        this.sync();
        return;
    },
    handleListChange: function(listId) {
        this.setState({listType: listId})
        return;
    },
    getAllListId: function () {
        var data = {"token": this.state.authToken};
        var me = this;

        $.ajax({
            method: "POST",                     
            url: 'http://localhost:3000/v1/lists',                                                                                                          
            data: data
          })
          .done(function(data) {
            console.log('successfully retrieved grocery list id');   
            var list = JSON.parse(data);

            for (var i = 0; i < list.length; i++) {
                var name = list[i].name;
                var id = list[i].id;
                if (name == 'Grocery List') {
                    me.setState({groceryListId: id})
                }
                else if (name == 'Fridge') {
                    me.setState({fridgeListId: id})
                }
            }              
            me.populateList();                                
            return;
          })
          .fail(function(err) {
            console.log('failed');
            return;
          });   
    },
    populateList: function () {
        var listId = this.state.groceryListId;
        var sendData = {"token": this.state.authToken}; 
        var me = this;

        $.ajax({
            method: "POST",                     
            url: 'http://localhost:3000/v1/list/' + listId,                                                                                                          
            data: sendData
          })
          .done(function(dataGet) {
            console.log('successfully retrieved grocery list');                                        
            if (dataGet == '') {return};
            var list = JSON.parse(dataGet);

            var data = [];

            for (var i = 0; i < list.length; i++) {
                var id = list[i].id;
                var itemName = list[i].name;
                var price = list[i].price;
                var quantity = list[i].quantity;
                data = data.concat([{id, itemName, price, quantity}]); 
            }                    

            me.setState({data});            
            return;
          })
          .fail(function(err) {
            console.log('failed');
            return;
          });
    },
    getListName: function (listId) {
        var names = ["Shopping List", "Fridge", "Recipe"];
        return names[listId];
    },
    sync: function () {
        var loggedIn = this.state.loggedIn;

        if (loggedIn) {  
            var listType = this.state.listType;

            var groceryListId = this.state.groceryListId;
            if (groceryListId == -1) {
                    this.getAllListId();
            }
            else {
                    this.populateList(groceryListId);
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
            var data = this.state.data;                
            var length = data.length;

            var listType = this.state.listType;
            var listName = this.getListName(listType);
                      
            return (        
                <div>     
                    <TopBar changeList={this.handleListChange} curList={listType}/>
                    <div className="well vert-offset-top-2">                                          
                        <h1 className="vert-offset-top-0">{listName}:</h1>
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
