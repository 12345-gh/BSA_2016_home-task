import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "./actions/userAction.js";

import SearchUserComponent from './searchUserComponent.js';
import AddUserComponent from './addUserComponent.react.js';
import UserInfoComponent from './userInfoComponent.react.js';
import User from './user.js';
import './userList.css'

class UserList extends Component {
    constructor() {
        super();
        this.addUser = this.addUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.searchUser = this.searchUser.bind(this);
        //this.state = {
        //    arrUserListComponents : []
        //};
    }

    addUser(name) {
        let user = new User(name);
        const { arrUserListComponents }  = this.props.stateFromReducer;

        //this.state.arrUserListComponents.push(
        //    {
        //        id: user.id,
        //        removeUser: this.removeUser,
        //        name: user.name
        //    }
        //);
        arrUserListComponents.push(
            {
                id: user.id,
                removeUser: this.removeUser,
                name: user.name
            }
        );

        //this.setState({arrUserListComponents: this.state.arrUserListComponents});


        this.props.addUser({
            arrUserListComponents: arrUserListComponents
        });
    }

    removeUser(deleteId) {
        //let arr = this.state.arrUserListComponents;
        const { arrUserListComponents } = this.props.stateFromReducer;

        //for (let i = 0; i < arr.length; i++) {
        //    if (arr[i].id === deleteId) {
        //        arr.splice(i, 1);
        //    }
        //}

        for (let i = 0; i < arrUserListComponents.length; i++) {
            if (arrUserListComponents[i].id === deleteId) {
                arrUserListComponents.splice(i, 1);
            }
        }

        //this.setState({arrUserListComponents: this.state.arrUserListComponents});

        this.props.removeUser({
            arrUserListComponents: arrUserListComponents
        });
    }

    searchUser(searchText) {
        this.props.searchUser({
            searchText: searchText
        });
    }

    render() {
        //console.log(this.props.stateFromReducer);
        const { arrUserListComponents, searchText } = this.props.stateFromReducer;

        return (
            <div>
                <div className="user-list">
                    <SearchUserComponent searchUser={this.searchUser}/>
                </div>

                <div className="user-list">
                    <AddUserComponent addUser={this.addUser}/>

                </div>

                <div>
                    {
                        arrUserListComponents.map(function(item) {
                            if(item.name.toLowerCase().indexOf(searchText.toLowerCase()) === -1) {
                                return;
                            } else {
                                return <UserInfoComponent
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    removeUser={item.removeUser}
                                    />
                            }
                        },this)
                    }
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        stateFromReducer: state
    };
}
const UserListConnected = connect(mapStateToProps, mapDispatchToProps)(UserList);

export default UserListConnected;