import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

export default  class LinksListItem extends React.Component{
    constructor(props){
        super(props);
            this.state = {
                justCopied : false
        }
    }



    componentDidMount(){
        this.clipboard = new Clipboard(this.refs.copy);

        this.clipboard.on('success',()=>{
            this.setState((prevState) => {
                return { justCopied : true}
              });
              setTimeout(()=>{ 
                this.setState(() => {
                    return { justCopied : false}
                  });
               }, 1000);
        }).on('error', ()=>{
            alert('Unable to copy, Please manually copy the link');
        });
    }

    componentWillUnmount(){
        this.clipboard.destroy();
    }

    renderStats(){
        const visitMessage = this.props.visitedCount === 1 ? "visit" : "visits";
        let visitedMessage= null;

        if( typeof this.props.lastVisitedAt === 'number'){
            var momentNow = moment(this.props.lastVisitedAt);
            visitedMessage = `visited ${momentNow.fromNow() }`;
        }
        return <p className="item__message"> {this.props.visitedCount} {visitMessage} - { this.props.lastVisitedAt } {visitedMessage} </p>
    }

    render(){
        return (
            <div className="item">
                <h2> {this.props.shortUrl} </h2>
                <p className="item__message"> {this.props.url} </p>
                {this.renderStats()}
                <a className="button button--pill button--link" href={this.props.shortUrl}>Visit</a>
                <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
                    {this.state.justCopied ? 'Copied' : 'Copy'}
                </button>
                <button className="button button--pill" onClick={()=>{
                    Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
                }}>
                    { this.props.visible ? 'Hide' : 'Unhide' }
                </button>
            </div>
        );
    }
}

LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    shortUrl: PropTypes.string.isRequired,
    lastVisitedAt: PropTypes.number,
    visitedCount: PropTypes.number.isRequired
}