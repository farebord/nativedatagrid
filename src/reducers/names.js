
const initialState = {
    loading: false,
    names: []
}

export default ( state = initialState, action ) => {
    switch(action.type) {
        case 'LOADING':
            return { names: [], loading: true}
        case 'FETCHED':
            return { names: action.payload }
        default: 
            return state
    }
}