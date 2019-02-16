import React from 'react'
import PropTypes from 'prop-types'
import './DataGrid.css'

import Cell from './Cell'

class DataGrid extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            selectedRows: []
        }
    }
    onCellChange(value, column, row){
        const { onCellChange } = this.props
        if(onCellChange) onCellChange(Object.assign({}, row, {[column]: value}))
    }
    onCellCancel(value, column, row){
        const { onCellCancel } = this.props
        if(onCellCancel) onCellCancel(row, Object.assign({[column]: value}))
    }
    isCellEditable(column){
        const { editable } = this.props
        if(column.editable !== undefined) return column.editable
        else return editable
    }
    onSelectChange(checked, id){
        const { onSelectedChange } = this.props
        let newSelectedList = []
        if(!checked) 
            newSelectedList = this.state.selectedRows.filter(item => item !== id)
        else 
            newSelectedList = this.state.selectedRows.indexOf(id) === -1 ? [id, ...this.state.selectedRows] : this.state.selectedRows
        this.setState({selectedRows: newSelectedList})
        onSelectedChange(newSelectedList)
    }
    render() {
        const { columns, data, selectable, noDataMessage, loading, loadingMessage } = this.props
        return (
            <table>
                <thead>
                    <tr>
                        { columns.map(column => <th key={column.value}>{column.title}</th>) }
                    </tr>
                </thead>
                <tbody>
                    { loading && <tr><td colSpan={columns.length}>{loadingMessage}</td></tr>}
                    { data.length === 0 && !loading && <tr><td colSpan={columns.length}>{noDataMessage}</td></tr>}
                    { data.map(row => 
                        <tr key={row.id}>
                            {selectable && (
                                <td>
                                    <input type="checkbox" defaultChecked={false} onChange={event => this.onSelectChange(event.target.checked, row.id)} />
                                </td>
                            )}
                            {columns.map(column => 
                                <Cell
                                    type={column.type} 
                                    value={row[column.value]} 
                                    key={column.value}
                                    editable={this.isCellEditable(column)}
                                    onChange={value => this.onCellChange(value, column.value, row)}
                                    onCancel={value => this.onCellCancel(value, column.value, row)}
                                    renderEdit={column.renderEdit}
                                    renderValue={column.renderValue}
                                />
                            )}
                        </tr>    
                    )}
                </tbody>
            </table>
        )
    }
}

DataGrid.defaultProps = {
    data: [],
    loading: false,
    noDataMessage: "No data",
    loadingMessage: "Loading...",
    selectable: false,
    editable: false
}

DataGrid.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array,
    loading: PropTypes.bool,
    loadingMessage: PropTypes.string,
    noDataMessage: PropTypes.string,
    selectable: PropTypes.bool,
    editable: PropTypes.bool,
    onSelectedChange: PropTypes.func,
    onCellChange: PropTypes.func,
    onCellCancel: PropTypes.func
}

export default DataGrid