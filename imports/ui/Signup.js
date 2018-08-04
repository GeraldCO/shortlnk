import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default  class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error : ''
    }
  }

  onSubmit(e){
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password.length < 9)
    {
      return this.setState((prevState) => {
        return { error: "password must be more than 8 characters long"};
      });
    }
    
    Accounts.createUser({email, password}, (err)=>{
      if(err){
        this.setState((prevState) => {
          return { error: err.reason};
        });
      }else{
        this.setState((prevState)=>{
          return { error: ''};
        });
      }
    });
    
}
  
  render(){
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h3>  Join Short Lnk </h3>
          {this.state.error ? <p> {this.state.error} </p> : undefined}
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" name="email" ref="email" placeholder="Email" />
            <input type="password" name="password" ref="password" placeholder="Password"/>
            <button className="button">Create Account</button>
          </form>
          <Link to="/"> Already an account?</Link>
        </div>
    </div>
    );
  }
}

