import React, { Component } from 'react';

//this class deals with creating a priority list for the given system
class PriorityList extends Component {

    unitList = this.props.unitList;

    renderPriorityListHeader() {
        let header = ["S.No", "Unit No.", "FLAPC Value", "Pmin (MW)", "Pmax (MW)"]
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderPriorityInfo(unitList) {
        return this.unitList.map((data, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data[0]}</td>
                    <td>{data[1]}</td>
                    <td>{data[2]}</td>
                    <td>{data[3]}</td>
                </tr>
            );
        })
    }
    //displaying the UI
    render() {
        return (
            <div>
                {(this.unitList.length > 0) ?
                    <div style={{ textAlign: 'center', marginTop: '25px' }}>
                        <h5 style={{ fontWeight: 'bold' }}>Developed Priority List</h5>
                        <table id='users' style={{ width: '80%', margin: 'auto', marginTop: '25px', marginBottom: '25px' }}>
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
export default PriorityList;