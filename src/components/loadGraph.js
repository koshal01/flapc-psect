import React, { Component } from 'react';

import Headbar from '../Headbar';
import BarChart from '../Chart';

class LoadGraph extends Component {        
    //displaying the UI
    render() {
        return (
            <div>
                <Headbar />
                <h2 id='currentTitle'>Load Graph</h2> 
                {this.props.LoadCurveData.timeStamp.length === 0 || this.props.LoadCurveData.powerDemand.length === 0 ? 
                    <div className="emptyText">
                        Please upload Load Curve Data
                    </div> : 
                    <div style={{ width: '50%', height: '50%', margin: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                        <BarChart time={this.props.LoadCurveData.timeStamp} power={this.props.LoadCurveData.powerDemand} />
                        <br />
                    </div>
                }
            </div>
        );
    }
}
export default LoadGraph;