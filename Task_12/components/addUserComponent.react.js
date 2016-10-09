import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './addUserComponent.css'

class AddUserComponent extends Component{
    constructor(){
        super();
        this.state = {
            text: ''
        };
        this.onChange = this.onChange.bind(this);
        this.addButtonClick = this.addButtonClick.bind(this);
    }

    addButtonClick(){
        if (this.state.text.length > 0) {
            var inputNode = ReactDOM.findDOMNode(this.refs.inputNode);

            this.props.addUser(this.state.text); // property from userList.react.js

            inputNode.value = "";
            this.setState({text: ''});
        }
    }

    onChange(e) {
        this.setState({text: e.target.value});
    }

    render(){
        return (
            <div className="add-user-component">
                <input className="add-user-input" ref="inputNode" type="text" onChange={this.onChange} value={this.state.text} placeholder="Enter user name"/>
                <button className="add-user-button" onClick={this.addButtonClick}>Add to list</button>
            </div>
        )
    }
}

export default AddUserComponent