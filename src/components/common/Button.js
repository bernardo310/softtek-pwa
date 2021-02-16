import React, { Component } from 'react';

class Button extends Component {
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
            <button 
                type={this.props.type ? this.props.type : 'button'}
                className={`button ${this.props.block && 'block'} ${this.props.variant === 'primary' ? 'primary' : 'secondary'}`}
                disabled={this.props.disabled}
            >
                <p className='text-smaller mb-0'>{this.props.label}</p>
            </button>
        );
    }
}

export default Button;