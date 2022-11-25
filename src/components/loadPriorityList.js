import React, { Component } from 'react';

// this class deals with displaying the load shared by each generator unit for each load
class LoadPriorityList extends Component {
    dataTable = this.props.dataTable;
    powerDemand = this.props.powerDemand;
    gen_list = this.props.genNum;
    numGen = this.dataTable[0].length - 2;
    headerTags = [];

    renderPriorityListHeader() {
        this.headerTags[0] = "Load at (24 hr)";
        for (let i = 1; i < this.gen_list.length + 1; i++) {
            this.headerTags[i] = "Gen" + this.gen_list[i - 1].toString() + " (MW)";
        }

        var minpmin = this.props.unitList[0][2];
        var maxpower = this.props.unitList[0][3];
        for (let i = 1; i < this.gen_list.length; i++) {
            if (minpmin > this.props.unitList[i][2]) {
                minpmin = this.props.unitList[i][2];
            }
            maxpower += this.props.unitList[i][3];
        }

        this.headerTags[this.gen_list.length + 1] = "Less than Min Power of " + minpmin + "MW";
        this.headerTags[this.gen_list.length + 2] = "More than Max Power of " + maxpower + "MW";
        return this.headerTags.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }


    renderPriorityInfo = function () {
        return this.dataTable.map((row, index) => {
            return <tr key={index}><RenderRow key={index} data={row} keys={this.headerTags} time={index} powerDemand={this.props.powerDemand} gen_list={this.gen_list} /></tr>
        })
    }

    // displaying the table
    render() {
        return (
            <div>
                {(this.dataTable.length > 0) ?
                    <div style={{ textAlign: 'center', marginTop: '25px' }}>
                        <h5 style={{ fontWeight: 'bold' }}>Developed Load Priority List</h5>
                        <table id='users' style={{ margin: 'auto', marginTop: '25px', marginBottom: '25px' }}>
                            <tbody>
                                <tr>
                                    {this.renderPriorityListHeader()}
                                </tr>
                                {this.renderPriorityInfo()}
                            </tbody>
                        </table>
                    </div> : <div></div>
                }
            </div>
        );
    }
}

const RenderRow = (props) => {
    return props.keys.map((key, index) => {
        if (index === 0) {
            return <td key={index}>Load of {props.powerDemand[props.time]}MW at {props.time}:00 </td>
        } else {
            if (index >= props.gen_list.length + 1) {
                if (props.data[index - 1] !== 0) {
                    return <td key={index} style={{ color: '#FF0000', fontWeight: 'bold' }}>Yes</td>
                } else {
                    return <td key={index}>No</td>
                }
            } else
                return <td key={index}>{props.data[index - 1]}</td>
        }
    })
}

export default LoadPriorityList;