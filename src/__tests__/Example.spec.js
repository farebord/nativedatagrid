import React from 'react'
import ReactDOM from 'react-dom'
import {shallow} from 'enzyme'
import Example from '../Example';
import DataGrid from '../components/DataGrid'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux'

const mockStore = configureMockStore([thunk])

describe('Example should', () => {
  it('renders without crashing', () => {
    const store = mockStore({})
    const div = document.createElement('div')
    ReactDOM.render(<Provider store={store}><Example /></Provider>, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})

