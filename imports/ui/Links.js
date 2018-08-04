import React from 'react';


import history from './history';
import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

  //import history from './history'


export default class Links extends React.Component{
    UNSAFE_componentWillMount(){
        if(!Meteor.userId()){
            history.replace('/');
          }  
    }    
    render(){
        return(
            <div id="app">
                
                <PrivateHeader title="Short Lnk"/>
                <div className="page-content">
                    <LinksListFilters />
                    <AddLink/>
                    <LinksList/>
                </div>
            </div>
        );
    }
}