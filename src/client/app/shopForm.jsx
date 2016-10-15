import React from 'react';
import ReactDOM from 'react-dom';

var ShopForm = React.createClass({
        doSubmit: function (e) {
                e.preventDefault();
                var item = ReactDOM.findDOMNode(this.refs.item).value.trim();
                if (!item) {
                        return;
                }
                this.props.onItemSubmit(item);
                ReactDOM.findDOMNode(this.refs.item).value = '';
                return;
        },
        render: function() {
                return (
                        <div className="commentForm vert-offset-top-2">
                                <hr />
                                <div className="clearfix">
                                        <form className="shopForm form-horizontal" onSubmit={this.doSubmit}>
                                                <div className="form-group">
                                                        <label htmlFor="item" className="col-md-2 control-label">Item</label>
                                                        <div className="col-md-10">
                                                                <input type="text" id="item" ref="item" className="form-control" placeholder="What do you need to do?" />
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
