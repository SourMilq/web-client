import React from 'react';
import ReactDOM from 'react-dom';

var ShopForm = React.createClass({
        doSubmit: function (e) {
                e.preventDefault();
                var item = ReactDOM.findDOMNode(this.refs.item).value.trim();                
                if (!item) {
                        return;
                }                
                var price = ReactDOM.findDOMNode(this.refs.price).value.trim();
                var quantity = ReactDOM.findDOMNode(this.refs.quantity).value.trim();
                
                this.props.onItemSubmit(item, price, quantity);
                ReactDOM.findDOMNode(this.refs.item).value = '';
                ReactDOM.findDOMNode(this.refs.price).value = '';
                ReactDOM.findDOMNode(this.refs.quantity).value = '';
                return;
        },
        render: function() {
                return (
                        <div className="commentForm">                                
                                <div className="clearfix">
                                        <form className="shopForm form-horizontal" onSubmit={this.doSubmit}>
                                                <div className="form-group">
                                                        <label htmlFor="item" className="col-md-2 control-label">New</label>
                                                        
                                                        <div className="col-md-3">
                                                                <input type="text" id="item" ref="item" className="form-control" placeholder="Item Name" />
                                                        </div>  
                                                        <div className="col-md-3">
                                                                <input type="text" id="price" ref="price" className="form-control" placeholder="Price" />
                                                        </div>    
                                                        <div className="col-md-3">
                                                                <input type="text" id="quantity" ref="quantity" className="form-control" placeholder="Quantity" />
                                                        </div>                                                                                                                                                                      
                                                </div>
                                                <div className="row">
                                                        <div className="col-md-10 col-md-offset-2 text-right">
                                                                <input type="submit" value="Save Item" className="btn btn-primary" />
                                                        </div>
                                                </div>
                                        </form>
                                </div>
                        </div>
                );
        }
});

export default ShopForm;
