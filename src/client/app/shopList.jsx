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
        render: function() {
                var listNodes = this.props.data.map(function (listItem) {
                        return (
                                <ShopItem key={listItem.id} nodeId={listItem.id}  itemName={listItem.itemName} complete={listItem.complete} removeNode={this.removeNode} toggleComplete={this.toggleComplete} />
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
