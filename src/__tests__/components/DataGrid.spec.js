import React from 'react'
import ReactDOM from 'react-dom'
import DataGrid from '../../components/DataGrid'
import { shallow } from 'enzyme'
import Cell from '../../components/Cell'

describe('DataGrid should', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<DataGrid columns={[{value: 'id', title: 'Id'}]} />, div)
        ReactDOM.unmountComponentAtNode(div)
    });

    it('renders loading', () => {
        const cell = shallow(<DataGrid columns={[{value: 'id', title: 'Id'}]} loading={true} data={[]} />)
        expect(cell.find('tbody').find('td').first().text()).toEqual('Loading...')
    })

    it('renders custom loading message', () => {
        const cell = shallow(<DataGrid columns={[{value: 'id', title: 'Id'}]} loadingMessage="TestLoading" loading={true} data={[]} />)
        expect(cell.find('tbody').find('td').first().text()).toEqual('TestLoading')
    })

    it('renders rows', () => {
        const cell = shallow(<DataGrid columns={[{value: 'id', title: 'Id'}]} data={[{id: 1},{id: 2},{id: 3}]} />)
        expect(cell.find('tbody').find('tr')).toHaveLength(3)
        expect(cell.find('tbody').find(Cell).get(2).props.value).toBe(3)
    })

    it('renders checkbox for select', () => {
        const cell = shallow(<DataGrid selectable={true} columns={[{value: 'id', title: 'Id'}]} data={[{id: 1},{id: 2},{id: 3}]} />)
        expect(cell.find('tbody').find('input[type="checkbox"]').first().props().defaultChecked).toBe(false)
    })

})

