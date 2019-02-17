import React from 'react';
import { connect } from 'react-redux';
import DataGrid from './components/DataGrid'
import { fetchDataAfterTimeout } from './actions/names'
import {fetchDataColumns, somedataColumns} from './columns'
import {someData} from './data'


const Example = ({loading, dispatch, names}) => {
  return (
    <div>
      <h1>Basic example</h1>
      <DataGrid
        columns={somedataColumns}
        data={someData}
        loading={false}
        loadingMessage="Fetching data..."
        editable={true}
        onCellChange={newItem => console.log(newItem)}
        onCellCancel={(item, canceledValue) => console.log(item, canceledValue)}
        selectable={true}
        onSelectedChange={selectedList => console.log(selectedList)}
      />
      
      <h1>Redux example</h1>
      <button onClick={()=>dispatch(fetchDataAfterTimeout())}>Fetch data</button>
      <DataGrid
        columns={fetchDataColumns}
        data={names}
        loading={loading}
        loadingMessage="Fetching data..."
        editable={true}
        onCellChange={newItem => console.log(newItem)}
        onCellCancel={(item, canceledValue) => console.log(item, canceledValue)}
        selectable={false}
        onSelectedChange={selectedList => console.log(selectedList)}
      />
    </div>
  )
};

export default connect(state => state)(Example)
