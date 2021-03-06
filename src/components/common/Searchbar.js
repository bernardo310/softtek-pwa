import React, { Component } from 'react';
import searchIcon from '../../assets/search.svg';

class Searchbar extends Component {
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
    }

    render() {
        return(
            <div className='searchbar'>
                <input type='text' value={this.state.value} onChange={this.handleValue} placeholder={this.props.placeholder} />
                <img src={searchIcon} loading='lazy' />
            </div>
        );
    }
}

export default Searchbar;