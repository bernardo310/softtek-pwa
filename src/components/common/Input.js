import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }

        this.handleValue = this.handleValue.bind(this);
    }

    handleValue(e) {
        let value = e.target.value;
        this.setState({value});
        if(this.props.handleValue)
            this.props.handleValue(value);
    }

    render(){
        return(
            <div className='input-wrapper mt-2 mb-3'>
                <input type={this.props.type} className='input' value={this.state.value} onChange={this.handleValue} ref={this.props.ref}/>
                <div className={`input-placeholder ${this.state.value.length > 0 && 'focused'}`}>
                    {this.props.label}
                </div>
            </div>
        );
    }
}

export default Input;