import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            url:'',
            isOpen: false,
            err: ''
        }
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }


    onSubmit(e){
        const { url }  = this.state;

        e.preventDefault();

        Meteor.call('links.insert', url, (err, res)=>{
            if(!err){
                this.handleModalClose();
            }else{
                this.setState({ err: err.reason });
            }
        })
    }

    onChangeHandler(e){
        this.setState({ 
            url: e.target.value 
        });
    }

    handleModalClose(){
        this.setState({isOpen: false, url: '', err: '' });
    }

    render(){
        return (
            <div >
                <button className="button" onClick={()=> this.setState({isOpen:true })}>Add Link</button>
                <Modal 
                    isOpen={this.state.isOpen} 
                    contentLabel="Add Link" 
                    onAfterOpen={()=>this.refs.url.focus()}
                    onRequestClose={this.handleModalClose.bind(this)}
                    className="boxed-view__box"
                    overlayClassName='boxed-view boxed-view--modal'
                >
                    <h1> Add Link </h1>
                    {this.state.err ? <p> {this.state.err} </p> : undefined }
                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input 
                        type="text" 
                        placeholder="URL" 
                        value={this.state.url}
                        ref='url'
                        onChange={this.onChangeHandler.bind(this)}
                        />
                        <button className='button'>Add Link</button>
                        <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>close</button>
                    </form>
                </Modal>
            </div>
            
        )
    }
}