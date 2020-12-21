const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SIGNIN':
            return action.payload;
        case 'SIGNOUT':
            return {};
        default:
            return state;
    }
};

const vacationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'EDIT':
            return action.payload;
        case 'REMOVE':
            return action.payload;
        default:
            return state;
    }
};

export { userReducer, vacationReducer };
