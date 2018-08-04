import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class LinksListFilters extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showVisible: false
        }
    }

    componentDidMount(){
        this.showVisibleTracker =Tracker.autorun(()=>{
            //const showVisible = Session.get('showVisible');
                this.setState(()=>{
                    return { showVisible: Session.get('showVisible') }
                });
            });
    }

    componentWillUnmount(){
        this.showVisibleTracker.stop();
    }

    onChangeHandler = (e)=>{
        const showVisible = Session.get('showVisible');
        //Session.set('showVisible', !e.target.checked);
        Session.set('showVisible', !this.state.showVisible);
        this.setState({ showVisible: !this.state.showVisible});
    }  

    render(){
        return(
            <div>
                <label className="checkbox"> 
                    <input 
                    className='checkbox__box'
                    type="checkbox" 
                    onChange={this.onChangeHandler.bind(this)}
                    checked={!this.state.showVisible}
                    />
                    show hidden links
                </label>
            </div>
        );
    }
}