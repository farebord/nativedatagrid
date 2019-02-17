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
        const dataGrid = shallow(<DataGrid columns={[{value: 'id', title: 'Id'}]} loading={true} data={[]} />)
        expect(dataGrid.find('tbody').find('td').at(0).text()).toEqual('Loading...')
    })

    it('renders custom loading message', () => {
        const dataGrid = shallow(<DataGrid columns={[{value: 'id', title: 'Id'}]} loadingMessage="TestLoading" loading={true} data={[]} />)
        expect(dataGrid.find('tbody').find('td').at(0).text()).toEqual('TestLoading')
    })

    it('renders no data message', () => {
        const dataGrid = shallow(<DataGrid columns={[{value: 'id', title: 'Id'}]} data={[]} />)
        expect(dataGrid.find('tbody').find('td').at(0).text()).toEqual('No data')
    })
    
    it('renders no data custom message', () => {
        const dataGrid = shallow(<DataGrid columns={[{value: 'id', title: 'Id'}]} noDataMessage="NoDataTest" data={[]} />)
        expect(dataGrid.find('tbody').find('td').at(0).text()).toEqual('NoDataTest')
    })

    it('renders rows', () => {
        const dataGrid = shallow(<DataGrid columns={[{value: 'id', title: 'Id'}]} data={[{id: 1},{id: 2},{id: 3}]} />)
        expect(dataGrid.find('tbody').find('tr')).toHaveLength(3)
        expect(dataGrid.find('tbody').find(Cell).at(2).dive().text()).toBe("3")
    })

    it('renders checkbox for select', () => {
        const dataGrid = shallow(<DataGrid selectable={true} columns={[{value: 'id', title: 'Id'}]} data={[{id: 1},{id: 2},{id: 3}]} />)
        expect(dataGrid.find('tbody').find('input[type="checkbox"]').first().props().defaultChecked).toBe(false)
    })

    it('return selected rows', () => {
        const onSelectedChangeMock = jest.fn()
        const dataGrid = shallow(<DataGrid selectable={true} onSelectedChange={onSelectedChangeMock} columns={[{value: 'id', title: 'Id'}]} data={[{id: 1},{id: 2},{id: 3}]} />)
        dataGrid.find('tbody').find('input[type="checkbox"]').at(2).simulate('change', { target: { checked: true }})
        expect(onSelectedChangeMock).toHaveBeenCalledWith([3])
    })

    it('return the canceled value of the cell', () => {
        const onCellCancelMock = jest.fn()
        const dataGrid = shallow(<DataGrid editable={true} onCellCancelMock={onCellCancelMock} columns={[{value: 'id', title: 'Id'}]} data={[{id: 1},{id: 2},{id: 3}]} />)
        dataGrid.find(Cell).at(0).dive().setState({editing: true})
        expect(dataGrid.find(Cell).at(0).dive().state().editing).toEqual(true)
        dataGrid.find(Cell).at(0).simulate('keyDown', { target: { value: '2' }, keyCode: 27})
        expect(onCellCancelMock).toHaveBeenCalledWith({id: 2})
    })

})

