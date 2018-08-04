import React from 'react'
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component{
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
        
        Meteor.loginWithPassword({email}, password, (err) => {
            if(err){
                this.setState((prevState)=>{
                    return {error: err.reason }
                });
            }else{
                this.setState((prevState)=>{
                    return {error : ''};
                });
            }
        })
    }

    render(){
        return (
        <div className="boxed-view">
            <div className="boxed-view__box">
                <h3>  Short Lnk </h3>
                {this.state.error ? <p> {this.state.error} </p> : undefined}
                <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
                    <input type="email" name="email" ref="email" placeholder="Email" />
                    <input type="password" name="password" ref="password" placeholder="Password"/>
                    <button className="button">Login</button>
                </form>
                Login from here <Link to="/signup"> Don't have an accounte? </Link>
            </div>    
        </div>
        );
        


    }
}