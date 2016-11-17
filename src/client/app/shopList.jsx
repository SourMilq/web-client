import React from 'react';
import ShopItem from './shopItem.jsx';

var ShopList = React.createClass({
        removeNode: function (nodeId) {
                this.props.removeNode(nodeId);
                return;
        },
        toggleComplete: function (nodeId) {
                this.props.toggleComplete(nodeId);
                return;
        },
        changeExpiration: function (nodeId, expiration) {
                this.props.changeExpiration(nodeId, expiration);
                return;
        },
        render: function() {                
                var listNodes = this.props.data.map(function (listItem) {
                return (
                        <ShopItem key={listItem.id} nodeId={listItem.id} itemName={listItem.itemName} price={listItem.price} quantity={listItem.quantity} expiration={listItem.expiration} removeNode={this.removeNode} toggleComplete={this.toggleComplete} changeExpiration={this.changeExpiration} cl={this.props.curList}/>
                );
                },this);
                return (
                        <ul className="list-group">
                                {listNodes}
                        </ul>
                );
        }
});

export default ShopList;