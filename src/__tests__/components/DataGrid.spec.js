import React from 'react'
import ReactDOM from 'react-dom'
import DataGrid from '../../components/DataGrid'
import { shallow } from 'enzyme'
import Cell from '../../components/Cell'

describe('DataGrid should', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<DataGrid onCellCancel={jest.fn()} onCellChange={jest.fn()} columns={[{value: 'id', title: 'Id'}]} />, div)
        ReactDOM.unmountComponentAtNode(div)
    });

    it('renders loading', () => {
        const dataGrid = shallow(<DataGrid onCellCancel={jest.fn()} onCellChange={jest.fn()}columns={[{value: 'id', title: 'Id'}]} loading={true} data={[]} />)
        expect(dataGrid.find('tbody').find('td').at(0).text()).toEqual('Loading...')
    })

    it('renders custom loading message', () => {
        const dataGrid = shallow(<DataGrid onCellCancel={jest.fn()} onCellChange={jest.fn()} columns={[{value: 'id', title: 'Id'}]} loadingMessage="TestLoading" loading={true} data={[]} />)
        expect(dataGrid.find('tbody').find('td').at(0).text()).toEqual('TestLoading')
    })

    it('renders no data message', () => {
        const dataGrid = shallow(<DataGrid onCellCancel={jest.fn()} onCellChange={jest.fn()} columns={[{value: 'id', title: 'Id'}]} data={[]} />)
        expect(dataGrid.find('tbody').find('td').at(0).text()).toEqual('No data')
    })
    
    it('renders no data custom message', () => {
        const dataGrid = shallow(<DataGrid onCellCancel={jest.fn()} onCellChange={jest.fn()} columns={[{value: 'id', title: 'Id'}]} noDataMessage="NoDataTest" data={[]} />)
        expect(dataGrid.find('tbody').find('td').at(0).text()).toEqual('NoDataTest')
    })

    it('renders rows', () => {
        const dataGrid = shallow(<DataGrid onCellCancel={jest.fn()} onCellChange={jest.fn()} columns={[{value: 'id', title: 'Id'}]} data={[{id: 1},{id: 2},{id: 3}]} />)
        expect(dataGrid.find('tbody').find('tr')).toHaveLength(3)
        expect(dataGrid.find('tbody').find(Cell).at(2).dive().text()).toBe("3")
    })

    it('renders checkbox for select', () => {
        const dataGrid = shallow(<DataGrid onCellCancel={jest.fn()} onCellChange={jest.fn()} selectable={true} columns={[{value: 'id', title: 'Id'}]} data={[{id: 1},{id: 2},{id: 3}]} />)
        expect(dataGrid.find('tbody').find('input[type="checkbox"]').first().props().defaultChecked).toBe(false)
    })

    it('return selected rows', () => {
        const onSelectedChangeMock = jest.fn()
        const dataGrid = shallow(<DataGrid onCellCancel={jest.fn()} onCellChange={jest.fn()} selectable={true} onSelectedChange={onSelectedChangeMock} columns={[{value: 'id', title: 'Id'}]} data={[{id: 1},{id: 2},{id: 3}]} />)
        dataGrid.find('tbody').find('input[type="checkbox"]').at(2).simulate('change', { target: { checked: true }})
        expect(onSelectedChangeMock).toHaveBeenCalledWith([3])
    })

    it('return the selected rows when checkbox is already on', () => {
        const onSelectedChangeMock = jest.fn()
        const dataGrid = shallow(<DataGrid onCellCancel={jest.fn()} onCellChange={jest.fn()} selectable={true} onSelectedChange={onSelectedChangeMock} columns={[{value: 'id', title: 'Id'}]} data={[{id: 1},{id: 2},{id: 3}]} />)
        dataGrid.state().selectedRows = [2]
        dataGrid.find('tbody').find('input[type="checkbox"]').at(1).simulate('change', { target: { checked: true }})
        expect(onSelectedChangeMock).toHaveBeenCalledWith([2])
    })

    it('return selected rows after unselecting', () => {
        const onSelectedChangeMock = jest.fn()
        const dataGrid = shallow(<DataGrid onCellCancel={jest.fn()} onCellChange={jest.fn()} selectable={true} onSelectedChange={onSelectedChangeMock} columns={[{value: 'id', title: 'Id'}]} data={[{id: 1},{id: 2},{id: 3}]} />)
        dataGrid.state().selectedRows = [1, 3]
        dataGrid.find('tbody').find('input[type="checkbox"]').at(2).simulate('change', { target: { checked: false }})
        expect(onSelectedChangeMock).toHaveBeenCalledWith([1])
    })

    it('return the canceled value of the cell', () => {
        const onCellCancelMock = jest.fn()
        const dataGrid = shallow(<DataGrid editable={true} onCellChange={jest.fn()} onCellCancel={onCellCancelMock} columns={[{value: 'id', title: 'Id'}]} data={[{id: 1},{id: 2},{id: 3}]} />)
        const cell = dataGrid.find(Cell).first().dive()
        cell.simulate('doubleClick')
        cell.find('input').simulate('keyDown', { target: { value: '2' }, keyCode: 27, preventDefault: () => {}})
        expect(onCellCancelMock).toHaveBeenCalledWith({id: 1}, {id: '2'})
    })

    it('return the changed row when cell changed', () => {
        const onCellChangeMock = jest.fn()
        const dataGrid = shallow(<DataGrid editable={true} onCellChange={onCellChangeMock} onCellCancel={jest.fn()} columns={[{value: 'id', title: 'Id'}]} data={[{id: 1},{id: 2},{id: 3}]} />)
        const cell = dataGrid.find(Cell).first().dive()
        cell.simulate('doubleClick')
        cell.find('input').simulate('blur', { target: { value: '2' }})
        expect(onCellChangeMock).toHaveBeenCalledWith({id: '2'})
    })

})

