import React, { Component } from 'react';
import './submitbutton.css'

class Submitbutton extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <button type="submit" className="submit-button">{this.props.text}</button>
         );
    }
}
 
export default Submitbutton;