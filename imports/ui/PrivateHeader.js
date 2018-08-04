import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

export default class PrivateHeader extends React.Component{
    onClickLogout (){
        Accounts.logout();
        //        history.push("/");
    }

    render(){
        return(
            <div className="nav_bar">
                <div className='nav_bar__content'>
                    <h1 className='nav_bar__title'> {this.props.title} </h1>
                    <button className='button button--link-text' onClick={this.onClickLogout.bind(this)}>Logout</button>
                </div>
                
            </div>
            
        );
    }
}

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
}