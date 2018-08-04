import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { links } from '../api/links';
import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            links: []
        }
    }

    componentDidMount(){
        this.linksTracker = Tracker.autorun(()=>{
            Meteor.subscribe('links'); 
            const myLinks = links.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState(()=>{
                return {links : myLinks }
            });
        });

    }

    componentWillUnmount(){
        this.linksTracker.stop();
    }

    renderLinksListItems(){
        if(this.state.links.length === 0){
            return (
                <div className="item">
                    <p className="item__status-message"> No Links founds</p>
                </div>
            );
            
        }else{
            return this.state.links.map((currentValue)=>{
                const shortUrl = Meteor.absoluteUrl(currentValue._id);
                return <LinksListItem key={currentValue._id} shortUrl={shortUrl} {...currentValue} />
            });
        }        
    }

    render(){
        return(
            <div>                
                <FlipMove maintainContainerHeight={true}>
                    {this.renderLinksListItems()}
                </FlipMove>
            </div>
        );
    }
}