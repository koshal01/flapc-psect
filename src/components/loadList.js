import React, { Component } from 'react';

import Headbar from '../Headbar';
import PriorityList from './PriorityList';

class LoadList extends Component {        
    //displaying the UI
    render() {
        return (
            <div>
                <Headbar />
                <h2 id='currentTitle'>Load List</h2> 
                {this.props.Data.timeStamp.length === 0 || this.props.Data.powerDemand.length === 0 ? 
                    <div className="emptyText">
                        Please upload Load Curve Data and Generator Data
                    </div> : 
                    <div style={{ width: '50%', height: '50%', margin: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                        {this.props.Data.isInputRight ? <PriorityList unitList={this.props.Data.priorityList} /> :
                            <div className="emptyText">Please upload Generator Data</div>
                        }
                        <br />
                    </div>
                }
            </div>
        );
    }
}
export default LoadList;