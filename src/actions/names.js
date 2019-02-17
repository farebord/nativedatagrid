import {fetchData} from '../data'

function dataFetched(data) {
    return {
        type: 'FETCHED',
        payload: data
    }
}

export const fetchDataAfterTimeout = () => dispatch => {
    dispatch({type: 'LOADING'})
    setTimeout(() => {
        dispatch(dataFetched(fetchData))
    }, 3000)
}