import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import ShopList from './shopList.jsx';
import ShopForm from './shopForm.jsx';
import TopBar from './topBar.jsx';
import Login from './login.jsx'


var ShopBox = React.createClass({
        getInitialState: function () {
                return {
                        loggedIn : false,
                        authToke: "123",
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
        handleLogin: function (username, password) {
                console.log(username);
                console.log(password);
                this.setState({loggedIn: true})
        },
        render: function() {                
                var loggedIn = this.state.loggedIn;                ;

                if (loggedIn) {
                        var data = this.state.data;                
                        var length = data.length;
                        console.log(length);
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
