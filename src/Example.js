import React from 'react';
import DataGrid from './components/DataGrid'
import columns from './columns'
import data from './data.json'


export default () => (
  <DataGrid 
    columns={columns}
    data={data}
    loading={false}
    loadingMessage="Fetching data..."
    editable={true}
    onCellChange={newItem => console.log(newItem)}
    onCellCancel={(item, canceledValue) => console.log(item, canceledValue)}
    selectable={false}
    onSelectedChange={selectedList => console.log(selectedList)}
  />
);
