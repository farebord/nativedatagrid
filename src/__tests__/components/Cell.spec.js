import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Cell from '../../components/Cell'

describe('Cell should', () => {
  
  it('render without crashing', () => {
    const tr = document.createElement('tr')
    ReactDOM.render(<Cell onChange={jest.fn()} />, tr)
    ReactDOM.unmountComponentAtNode(tr)
  });

  it('have editing initial state disabled', () => {
    const cell = shallow(<Cell editable={true} onChange={jest.fn()} />)
    expect(cell.state().editing).toBe(false)
  })

  it('handle double click when non-editable', () => {
    const cell = shallow(<Cell editable={false} onChange={jest.fn()} />)
    cell.simulate('doubleClick');
    expect(cell.state().editing).toBe(false)
  })

  it('render an input by default when double clicked', () => {
    const cell = shallow(<Cell editable={true} value='test' onChange={jest.fn()} />)
    cell.simulate('doubleClick');
    expect(cell.state().editing).toBe(true)
    expect(cell.find('input').get(0).props.defaultValue).toEqual('test')
  })

  it('render a checkbox when boolean type and double clicked', () => {
    const cell = shallow(<Cell editable={true} type='boolean' value={true} onChange={jest.fn()} />)
    cell.simulate('doubleClick');
    expect(cell.state().editing).toBe(true)
    expect(cell.find('input[type="checkbox"]').get(0).props.defaultChecked).toEqual(true)
  })

  it('render the correct value', () => {
    const cell = shallow(<Cell editable={false} value='test' onChange={jest.fn()} />)
    expect(cell.children().text()).toEqual('test')
  })

  it('return the correct input value when saved', () => {
    const cell = shallow(<Cell editable={true} value='test' onChange={jest.fn()} />)
    const spy = jest.spyOn(cell.instance(), 'onSave')
    cell.simulate('doubleClick');
    cell.children().find('input').simulate('blur', {target: { value: 'new test' } } )
    expect(spy).toBeCalledWith('new test')
  })

  it('return the correct checkbox value when saved', () => {
    const cell = shallow(<Cell editable={true} value={true} type='boolean' onChange={jest.fn()} />)
    const spy = jest.spyOn(cell.instance(), 'onSave')
    cell.simulate('doubleClick');
    cell.children().find('input[type="checkbox"]').simulate('blur', {target: { checked: true } } )
    expect(spy).toBeCalledWith(true)
  })

  it('renders custom element', () => {
    const cell = shallow(<Cell editable={false} value={'something'} renderValue={() => <div></div>} onChange={jest.fn()} />)
    expect(cell.children().find('div').exists()).toBe(true)
  })
})

