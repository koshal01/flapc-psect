import React, { Component } from 'react';
import "antd/dist/antd.css";
import * as BsIcons from "react-icons/bs";

import Headbar from './Headbar';
import { Card } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import ExcelRender from './components/excelRender';

class Input extends Component {

    renderLoadCurveHeader() {
        let header = ["S.No", "TimeStamp", "Power"]
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderLoadCurveInfo() {
        return this.props.LoadCurveData.timeStamp.map((data, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data}</td>
                    <td>{this.props.LoadCurveData.powerDemand[index]}</td>
                </tr>
            );
        })
    }

    renderGeneratorHeader() {
        let header = ["Gen No.", "Pmin (MW)", "Pmax (MW)", "FUEL COST", "X3", "X2", "X1", "X0", "COLD HEAT", "BANK HEAT", "THERMAL CONSTANT", "FIXED COST"];
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderGeneratorInfo() {
        return this.props.LoadCurveData.unitList[0].map((data, index) => {
            return (
                <tr key={index}>
                    <td>{data.unitName}</td>
                    <td>{data.pmin}</td>
                    <td>{data.pmax}</td>
                    <td>{data.fuelCost}</td>
                    <td>{data.heatRate[0]}</td>
                    <td>{data.heatRate[1]}</td>
                    <td>{data.heatRate[2]}</td>
                    <td>{data.heatRate[3]}</td>
                    <td>{data.coldHeat}</td>
                    <td>{data.bankHeat}</td>
                    <td>{data.thermalConstant}</td>
                    <td>{data.fixedCost}</td>
                </tr>
            );
        })
    }

    render() {
        return (
            <div>
                <Headbar />

                <h2 id='currentTitle'>Input </h2>

                <div className="pageBody align-start" style={{ padding: '2rem' }}>
                    <Row xs={1} md={2} className="g-2">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <div className='verticalLine'><BsIcons.BsFileEarmarkArrowUpFill size='24px' color='#d81b60' /></div>
                                        <div>
                                            <div style={{marginTop: '1rem'}}>
                                                <h4 style={{ lineHeight: '4px' }}>Upload the load curve for the day(24hr)</h4>
                                                <h6>Attributes: Timestamp (only numeric value), power in MW</h6>
                                            </div>
                                            <div style={{marginTop: '5rem', marginLeft: '8rem'}}>
                                                <ExcelRender onExcelRender={this.props.handleLoadCurve} inputTag={'Demand'} />
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <div className='verticalLine'><BsIcons.BsFileEarmarkArrowUpFill size='24px' color='#d81b60' /></div>
                                        <div>
                                            <div style={{ marginBottom: '8px', marginTop: '1rem' }}>
                                                <h4 style={{ lineHeight: '4px' }}>Upload the details of the generating units</h4>
                                                <h6>Attributes: Gen No, Pmax, Pmin, Fuel Cost, X3, X2, X1, X0 (denoting heat rate coefficients), Cold Start Heat Required, Heat Rate For Banking, Thermal Constant, Fixed Cost</h6>
                                            </div>
                                                <div style={{marginTop: '2.6rem', marginLeft: '8rem'}}>
                                                    <ExcelRender onExcelRenderGenUnits={this.props.handleGenUnits} inputTag={'GenUnits'} />
                                                </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>

                <div>
                    {this.props.LoadCurveData.timeStamp.length === 0 || this.props.LoadCurveData.powerDemand.length === 0 ? <div></div> :
                        <div style={{ textAlign: 'center', marginTop: '25px' }}>
                            <h5 style={{ fontWeight: 'bold' }}>Load Curve Data</h5>
                            <table id='users' style={{ width: '50%', margin: 'auto', marginTop: '25px', marginBottom: '25px' }}>
                                <tbody>
                                    <tr>
                                        {this.renderLoadCurveHeader()}
                                    </tr>
                                    {this.renderLoadCurveInfo()}
                                </tbody>
                            </table>
                            <br />
                        </div>
                    }
                </div>

                <div>
                    {this.props.LoadCurveData.timeStamp.length === 0 || this.props.LoadCurveData.powerDemand.length === 0 || this.props.LoadCurveData.isInputRight === false ? <div></div> :
                        <div style={{ textAlign: 'center', marginTop: '25px' }}>
                            <h5 style={{ fontWeight: 'bold' }}>Generator Data</h5>
                            <table id='users' style={{ width: '80%', margin: 'auto', marginTop: '25px', marginBottom: '25px' }}>
                                <tbody>
                                    <tr>
                                        {this.renderGeneratorHeader()}
                                    </tr>
                                    {this.renderGeneratorInfo()}
                                </tbody>
                            </table>
                            <br />
                        </div>
                    }
                </div>

            </div>
        );
    }
}

export default Input;