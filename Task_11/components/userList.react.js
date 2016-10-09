import React, { Component } from 'react';
import AddUserComponent from './addUserComponent.react.js';
import UserInfoComponent from './userInfoComponent.react.js';
import User from './user.js';
import './userList.css'

class UserList extends Component {
    constructor(props) {
        super(props);
        this.addUser = this.addUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.state = {
            arrUserListComponents : []
        };
    }

    addUser(name) {
        let user = new User(name);

        this.state.arrUserListComponents.push(
            {
                id: user.id,
                removeUser: this.removeUser,
                name: user.name
            }
        );

        this.setState({arrUserListComponents: this.state.arrUserListComponents});
    }

    removeUser(deleteId) {
        let arr = this.state.arrUserListComponents;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === deleteId) {
                arr.splice(i, 1);
            }
        }

        this.setState({arrUserListComponents: this.state.arrUserListComponents});
    }

    render() {
        return (
            <div>
                <div className="user-list">
                    <AddUserComponent addUser={this.addUser}/>

                </div>

                <div>
                    {
                        this.state.arrUserListComponents.map(function(item) {
                            return <UserInfoComponent
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                removeUser={item.removeUser}
                                />
                        },this)
                    }
                </div>
            </div>
        )
    }
}

export default UserList