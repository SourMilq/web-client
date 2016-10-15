import React from 'react';
import ShopList from './shopList.jsx';
import ShopForm from './shopForm.jsx';

var ShopBox = React.createClass({
        getInitialState: function () {
                return {
                        data: [
                                {"id":"00001","item":"Apple","complete":"false"},
                                {"id":"00002","item":"Orange","complete":"false"},
        {"id":"00003","item":"Weiner","complete":"false"}
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
        handleSubmit: function (item) {
                var data = this.state.data;
                var id = this.generateId().toString();
                var complete = 'false';
                data = data.concat([{id, item, complete}]);
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
        render: function() {
                return (
                        <div className="well">
                                <h1 className="vert-offset-top-0">Shopping List:</h1>
                                <ShopList data={this.state.data} removeNode={this.handleNodeRemoval} toggleComplete={this.handleToggleComplete} />
                                <ShopForm onItemSubmit={this.handleSubmit} />
                        </div>
                );
        }
});

export default ShopBox; 
