export function addUser(param) {
    const action = {
        type: 'ADD_USER',
        arrUserListComponents: param.arrUserListComponents
    };
    return action;
}

export function removeUser(param) {
    const action = {
        type: 'REMOVE_USER',
        arrUserListComponents: param.arrUserListComponents
    };
    return action;
}

export function searchUser(param) {
    const action = {
        type: 'SEARCH_USER',
        searchText: param.searchText
    };
    return action;
}