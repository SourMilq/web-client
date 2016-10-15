import React from 'react';

var ShopItem = React.createClass({
        removeNode: function (e) {
                e.preventDefault();
                this.props.removeNode(this.props.nodeId);
                return;
        },
        toggleComplete: function (e) {
                e.preventDefault();                
                this.props.removeNode(this.props.nodeId);
                return;
        },
        updateClass: function () {
                
        },
        render: function() {
                var classes = 'list-group-item clearfix';
                // if (this.props.complete === 'true') {
                //         classes = classes + ' list-group-item-success';
                // }
                return (
                        <li className={classes}>
                                <div className="row">                                        
                                        <div className="item-name col-md-3 pull-left"> {this.props.item} </div>
                                        <div className="item-name-2 col-md-6 pull-center"> {this.props.item} </div>
                                        <div className="item-name-3 col-md-3 pull-right" role="group">
                                                <button type="button" className="btn btn-xs btn-success img-circle pull-right" onClick={this.toggleComplete}>&#x2713;</button> 
                                                <button type="button" className="btn btn-xs btn-danger img-circle pull-right" onClick={this.removeNode}>&#xff38;</button>
                                        </div>
                                </div>
                        </li>
                );
        }
});

export default ShopItem;
