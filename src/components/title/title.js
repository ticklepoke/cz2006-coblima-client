import React, { Component } from 'react';
import './title.css';

class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <h1 className="coblima-header" style={{color: this.props.color}} >COBLIMA</h1> );
    }
}
 
export default Title;