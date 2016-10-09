import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './addUserComponent.css'

class SearchUserComponent extends Component{
    constructor(){
        super();
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        let text = e.target.value;

        this.props.searchUser(text); // property from userList.react.js
    }

    render(){
        return (
            <div className="add-user-component">
                <input className="add-user-input" type="text" onChange={this.onChange} placeholder="Enter search user name"/>
            </div>
        )
    }
}

export default SearchUserComponent