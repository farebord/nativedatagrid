import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'
import Cell from '../../components/Cell';

describe('Cell should', () => {
  
  it('render without crashing', () => {
    const tr = document.createElement('tr');
    ReactDOM.render(<Cell onChange={jest.fn()} />, tr);
    ReactDOM.unmountComponentAtNode(tr);
  });

  it('handle double click when editable', () => {
    const cell = shallow(<Cell editable={true} onChange={jest.fn()} />)
    cell.simulate('doubleClick');
    expect(cell.contains(<input />)).toBe(true)
  })
})

