const initialState = {
    arrUserListComponents : [],
    searchText: ''
}

export default function patentDetailsReducer(state = initialState, action = null) {
    switch (action.type) {
        case 'ADD_USER': {
            const{ arrUserListComponents } = action
            return Object.assign({}, state, {
                arrUserListComponents: arrUserListComponents
            })
        }
        case 'REMOVE_USER': {
            const{ arrUserListComponents } = action
            return Object.assign({}, state, {
                arrUserListComponents: arrUserListComponents
            })
        }
        case 'SEARCH_USER': {
            const{ searchText } = action
            return Object.assign({}, state, {
                searchText: searchText
            })
        }
        default: {
            return state;
        }
    }
}