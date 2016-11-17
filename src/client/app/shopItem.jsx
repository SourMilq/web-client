import React from 'react';
import ReactDOM from 'react-dom';

var ShopItem = React.createClass({        
        removeNode: function (e) {
                e.preventDefault();
                this.props.removeNode(this.props.nodeId);
                return;
        },
        toggleComplete: function (e) {
                e.preventDefault();                
                this.props.toggleComplete(this.props.nodeId);
                return;
        },
        updateClass: function (e) {    
                e.preventDefault();
                var curDate = ReactDOM.findDOMNode(this.refs.curDate).value.trim();
                console.log(curDate);
                this.props.changeExpiration(this.props.nodeId, curDate);
                return;
        },
        render: function() {
                var classes = 'list-group-item clearfix';                
                return (
                        <li className={classes}>
                                <div className="row">                                        
                                        <div className="item-name col-xs-3 col-xl-3 col-md-3 pull-left"> {this.props.itemName} </div>
                                        <div className="item-name-2 col-xs-3 col-xl-3 col-md-3 pull-center"> {this.props.price} </div>
                                        <div className="item-name-2 col-xs-2 col-xl-2 col-md-2 pull-center"> {this.props.quantity} </div>
                                        <div className={"item-name-2 col-xs-2 col-xl-2 col-md-2 pull-center " + (this.props.cl == 1 ? 'show' : 'hidden')}><input type="date" ref="curDate" id="curDate" defaultValue={this.props.expiration} onChange={this.updateClass}/></div>                                        
                                        <div className="item-name-3 col-xs-2 col-xl-2 col-md-2 pull-right" role="group">
                                                <button type="button" className="btn btn-xs btn-danger img-circle pull-right" onClick={this.removeNode}>&#xff38;</button>
                                                <button type="button" className={"btn btn-xs btn-success img-circle pull-right btnCheck " + (this.props.cl == 0 ? 'show' : 'hidden')}  onClick={this.toggleComplete}>&#x2713;</button>                                                 
                                        </div>
                                </div>
                        </li>
                );
        }
});

export default ShopItem;
