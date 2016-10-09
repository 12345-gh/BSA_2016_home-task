import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import User from './user.js';
import './userInfoComponent.css';

class UserComponent extends Component{

    constructor(props) {
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
        this.state = {
            id : this.props.id,
            name: this.props.name
        };
    }

    shouldComponentUpdate(){
        return false;
    }

    deleteUser(){
        this.props.removeUser(this.state.id); // property from userList.react.js
    }

    render() {
        return (
            <div className="user-info-component">
                User #{this.state.id} : {this.state.name}
                <button className="delete-user-info-button" onClick={this.deleteUser}>Delete</button>
            </div>
        );
    }
}

export default UserComponent