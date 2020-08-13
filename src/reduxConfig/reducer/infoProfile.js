const initState = {}

export default (state = initState, action) => {
    switch (action.type) {
        case 'INIT_PROFILE_DATA':
            return {...action.payload};
        default:
            return state
    }
}