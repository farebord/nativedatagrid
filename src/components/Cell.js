import React from 'react'
import PropTypes from 'prop-types'

class Cell extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            editing: false
        }
    }
    onKeyDown(event, value) {
        if(event.keyCode === 27) {
            event.preventDefault()
            this.onCancel(value)
        }
    }
    onCancel(value){
        const { onCancel } = this.props
        if(onCancel) onCancel(value)
        this.switchRenderMode()
    }
    onSave(value){
        const { onChange } = this.props
        if(onChange) onChange(value)
        this.switchRenderMode()
    }
    switchEditMode(){
        const { editable } = this.props
        const { editing } = this.state
        if(editable && !editing)
            this.setState({editing: true})
    }
    switchRenderMode(){
        const { editing } = this.state
        if(editing)
            this.setState({editing: false})
    }
    renderValue(value){
        const { type, renderValue } = this.props
        if(renderValue) return renderValue(value) 
        switch(type) {
            case 'img': 
                return <img src={value} alt={value} />
            case 'boolean':
                return value ? 'True' : 'False'
            default:
                return value 
        }
    }
    renderEdit(value){
        const { type, renderEdit } = this.props
        if(renderEdit) return renderEdit(value) 
        switch(type) {
            case 'boolean':
                return <input 
                            onKeyDown={event => this.onKeyDown(event, event.target.checked)}
                            autoFocus
                            type="checkbox"
                            defaultChecked={value}
                            onBlur={event => this.onSave(event.target.checked)}
                        />
            default:
                return <input
                            onKeyDown={event => this.onKeyDown(event, event.target.value)}
                            autoFocus 
                            defaultValue={value}  
                            onBlur={event => this.onSave(event.target.value)}
                        />
        }
    }
    render() {
        const { value } = this.props
        const { editing } = this.state
        return (
            <td onDoubleClick={()=> this.switchEditMode()}>
                { editing ? this.renderEdit(value) : this.renderValue(value)}
            </td>
        )
    }
}

Cell.defaultProps = {
    type: 'string',
    value: '',
    editable: false
}

Cell.propTypes = {
    value: PropTypes.any,
    type: PropTypes.string,
    renderValue: PropTypes.func,
    editable: PropTypes.bool.isRequired,
    renderEdit: PropTypes.func,
    onCancel: PropTypes.func,
    onChange: PropTypes.func.isRequired
}

export default Cell