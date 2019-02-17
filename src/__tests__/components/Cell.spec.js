import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Cell from '../../components/Cell'

describe('Cell should', () => {
  
  it('render without crashing', () => {
    const tr = document.createElement('tr')
    ReactDOM.render(<Cell onCancel={jest.fn()} onChange={jest.fn()} />, tr)
    ReactDOM.unmountComponentAtNode(tr)
  });

  it('have editing initial state disabled', () => {
    const cell = shallow(<Cell editable={true} onCancel={jest.fn()} onChange={jest.fn()} />)
    expect(cell.state().editing).toBe(false)
  })

  it('handle double click when non-editable', () => {
    const cell = shallow(<Cell editable={false} onCancel={jest.fn()} onChange={jest.fn()} />)
    cell.simulate('doubleClick');
    expect(cell.state().editing).toBe(false)
  })

  it('render an input by default when double clicked', () => {
    const cell = shallow(<Cell editable={true} value='test' onCancel={jest.fn()} onChange={jest.fn()} />)
    cell.simulate('doubleClick');
    expect(cell.state().editing).toBe(true)
    expect(cell.find('input').at(0).props().defaultValue).toEqual('test')
  })

  it('render a checkbox when boolean type and double clicked', () => {
    const cell = shallow(<Cell editable={true} type='boolean' value={true} onCancel={jest.fn()} onChange={jest.fn()} />)
    cell.simulate('doubleClick');
    expect(cell.state().editing).toBe(true)
    expect(cell.find('input[type="checkbox"]').at(0).props().defaultChecked).toEqual(true)
  })

  it('render the correct value', () => {
    const cell = shallow(<Cell editable={false} value='test' onCancel={jest.fn()} onChange={jest.fn()} />)
    expect(cell.children().text()).toEqual('test')
  })

  it('return the correct input value when saved', () => {
    const onChangeMock = jest.fn()
    const cell = shallow(<Cell editable={true} value='test' onCancel={jest.fn()} onChange={onChangeMock} />)
    cell.simulate('doubleClick');
    cell.find('input').at(0).simulate('blur', {target: { value: 'new test' } } )
    expect(onChangeMock).toBeCalledWith('new test')
  })

  it('return no saved value when cancel', () => {
    const onCancelMock = jest.fn()
    const cell = shallow(<Cell onCancel={onCancelMock} editable={true} value="something" onChange={jest.fn()}/>)
    cell.simulate('doubleClick');
    cell.find('input').at(0).simulate('keyDown', {target: { value: 'example' }, keyCode: 27, preventDefault: jest.fn() } )
    expect(onCancelMock).toBeCalledWith('example')
  })

  it('keep editing if keydown is not espace', () => {
    const cell = shallow(<Cell editable={true} value="something" onCancel={jest.fn()} onChange={jest.fn()}/>)
    cell.simulate('doubleClick');
    cell.find('input').at(0).simulate('keyDown', {target: { value: 'example' }, keyCode: 21 } )
    expect(cell.state().editing).toBe(true)
  })

  it('return the correct checkbox value when saved', () => {
    const onChangeMock = jest.fn()
    const cell = shallow(<Cell editable={true} value={true} type='boolean' onCancel={jest.fn()} onChange={onChangeMock} />)
    cell.simulate('doubleClick');
    cell.find('input[type="checkbox"]').at(0).simulate('blur', {target: { checked: true } } )
    expect(onChangeMock).toBeCalledWith(true)
  })

  it('return the no saved check when cancel', () => {
    const onCancelMock = jest.fn()
    const cell = shallow(<Cell onCancel={onCancelMock} editable={true} value={false} type='boolean' onChange={jest.fn()}/>)
    cell.simulate('doubleClick');
    cell.find('input[type="checkbox"]').at(0).simulate('keyDown', {target: { checked: true }, keyCode: 27, preventDefault: jest.fn() } )
    expect(onCancelMock).toBeCalledWith(true)
  })

  it('renders custom element', () => {
    const cell = shallow(<Cell editable={false} value={'something'} renderValue={() => <div></div>} onCancel={jest.fn()} onChange={jest.fn()} />)
    expect(cell.find('div').at(0).exists()).toBe(true)
  })

  it('renders custom edit element', () => {
    const cell = shallow(<Cell editable={true} value={'something'} renderEdit={() => <div></div>} onCancel={jest.fn()} onChange={jest.fn()} />)
    cell.simulate('doubleClick');
    expect(cell.find('div').at(0).exists()).toBe(true)
  })
})

