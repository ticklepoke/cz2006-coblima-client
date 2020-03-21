import React, { Component } from 'react';
import './status.css';

import Triangle from "../../images/triangle.svg";

class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="status-container">
                <h2 className="status-name">Jeremy Tan</h2>
                <img src={Triangle} alt='status-arrow' className='status-arrow' />
            </div>
         );
    }
}
 
export default Status;