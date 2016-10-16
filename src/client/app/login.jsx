import React from 'react';
import ReactDOM from 'react-dom';

var Login = React.createClass({     
		doLogin: function (e) {
			e.preventDefault();
			var username = ReactDOM.findDOMNode(this.refs.username).value.trim();
			var password = ReactDOM.findDOMNode(this.refs.password).value.trim();			
			this.props.onLogin(username, password);
			return;
		},
		doCreateUser: function (e) {
			e.preventDefault();
			
			var username = ReactDOM.findDOMNode(this.refs.username).value.trim();
			var password = ReactDOM.findDOMNode(this.refs.password).value.trim();	

			var data = {
			    first_name: "firstName",
			    last_name: "lastName",
			    email: "temp-email@gmail.com",			    
			    username: username,
			    password: password
			  }
			console.log(data);
			$.ajax({
				method: "POST",			    
			    url: 'http://f3a5a098.ngrok.io/v1/user/create',			    
			    dataType: 'json',
			    headers: {			    
        		"Content-Type":"application/json"        		
    			},
			    data: data
			  })
			  .done(function(data) {
			    console.log('successfully registered');
			    console.log(data);
			    return;
			  })
			  .fail(function(err) {
			    console.log('failed to register');
			    return;
			  });			
		},
        render: function() {                              
                return (
                        <form className="login-form">	
                        <div className="imgcontainer login-title">
						    <img src="./milq.jpg" className="imgavatar"/>
						    Login Friend!
						  </div>					  

						  <div className="login-container">
						    <label><b>Username</b></label>
						    <input type="text" id="username" ref="username" placeholder="Enter Username" className="login-input" required />

						    <label><b>Password</b></label>
						    <input type="password" id="password" ref="password" placeholder="Enter Password" className="login-input" required />

						    <button className="login-button" type="submit" onClick={this.doLogin}>Login</button>						    
						    <button className="login-button" type="submit" onClick={this.doCreateUser}>Create User</button>						    
						  </div>						  
						</form>
                );
        }
});

export default Login;
