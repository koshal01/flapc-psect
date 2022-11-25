import React, { Component } from 'react';
import Headbar from '../Headbar';

class Approach extends Component {        
    //displaying the UI
    render() {
        return (
            <div>
                <Headbar />
                <h2 id='currentTitle'>Approach</h2> 
                <div className='approach-list'>
                    <ul>
                        <li>Sort the generators based on FLAPC</li>
                        <li>Based on max output limit of each generator get the number of units needed to be commissioned</li>
                        <li>Compare those units with the already commissioned units (consider no units committed at start)</li>
                        <li>If generation required is met by already running units then no change</li>
                        <li>If generation required is greater than current generation than a new unit need to be commissioned</li>
                        <li>If generation required is less than current generation than we need to either switch off or bank unit/s based on priority list
                            <ul>
                                <li>Determine the hours before which the unit will be required again if it is switched off</li>
                                <li>Get the cost for cooling down boiler and cost for banking that unit for given hours before reinstated for generation.</li>
                                <li>Based on calculation of cost decide upon the state i.e. Banking or Switch-off</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default Approach;