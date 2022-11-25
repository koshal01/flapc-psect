import React, { Component } from "react";
import { Button, Upload } from "antd";
import { ExcelRenderer } from "react-excel-renderer";
import { UploadOutlined } from '@ant-design/icons';

//this class takes care of extracting information from the excel sheets.
export default class ExcelRender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cols: [],
            rows: [],
            errorMessage: null,
        };
    }

    // to check if an array contains only strings
    checkString = (list) => {
        return list.every(i => (typeof i === "string"));
    }
    // to check if an array contains only numbers
    checkNum = (list) => {
        return list.every(i => (typeof i === "number"));
    }

    //processing the excel sheets  
    fileHandler = fileList => {
        let fileObj = fileList;
        if (!fileObj) {
            this.setState({
                errorMessage: "No file uploaded!"
            });
            return false;
        }

        if ( !(fileObj.type === "application/vnd.ms-excel" || fileObj.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
            this.setState({
                errorMessage: "Only Excel files are uploaded!"
            });
            return false;
        }

        ExcelRenderer(fileObj, (err, resp) => {
            var timeStamp, powerReq;
            var unitName, Pmin, Pmax, fuelCost, heatRate_X3, heatRate_X2, heatRate_X1, heatRate_X0, coldHeat, bankHeat, thermalConstant, fixedCost;
            let isFormatClear = true;
            if (err) {
                console.log(err);
            } else {
                let newRows = [];
                if (resp.rows[0] != null) {
                    let nameTags = resp.rows[0].map(tags => tags.toUpperCase());
                    if (this.checkString(nameTags)) {
                        if (this.props.inputTag === 'Demand') {
                            timeStamp = nameTags.indexOf('TIMESTAMP');
                            powerReq = nameTags.indexOf('POWER');
                            if (timeStamp === -1 || powerReq === -1) {
                                isFormatClear = false;
                                this.setState({
                                    errorMessage: "Data not in acceptable format",
                                });
                            }
                        } else if (this.props.inputTag === 'GenUnits') {
                            unitName = nameTags.indexOf('GEN NO');
                            Pmin = nameTags.indexOf('PMIN');
                            Pmax = nameTags.indexOf('PMAX');
                            fuelCost = nameTags.indexOf('FUEL COST');
                            heatRate_X3 = nameTags.indexOf('X3');
                            heatRate_X2 = nameTags.indexOf('X2');
                            heatRate_X1 = nameTags.indexOf('X1');
                            heatRate_X0 = nameTags.indexOf('X0');
                            coldHeat = nameTags.indexOf('COLD HEAT')
                            bankHeat = nameTags.indexOf('BANK HEAT')
                            thermalConstant = nameTags.indexOf('THERMAL CONSTANT')
                            fixedCost = nameTags.indexOf('FIXED COST')
                            if (unitName === -1 || Pmin === -1 || Pmax === -1 || fuelCost === -1 || heatRate_X3 === -1 || heatRate_X2 === -1 || heatRate_X1 === -1 || heatRate_X0 === -1 || coldHeat === -1 || thermalConstant === -1 || Pmax === -1 || fixedCost === -1) {
                                isFormatClear = false;
                                this.setState({
                                    errorMessage: "Data not in acceptable format",
                                });
                            }
                        }
                    }
                }
                else {
                    isFormatClear = false;
                    this.setState({
                        errorMessage: "Data not in acceptable format",
                    });
                }
                // var numData = resp.rows.slice(1).length
                resp.rows.slice(1).map((row, index) => {
                    if (row && row !== "undefined") {
                        if (this.props.inputTag === 'Demand' && isFormatClear) {
                            var powerDemand;
                            // console.log(numData)
                            // console.log(row[powerReq])
                            powerDemand = row[powerReq]

                            newRows.push({
                                key: index,
                                time: row[timeStamp].toString(),
                                power: powerDemand,
                            });

                        }
                        else if (this.props.inputTag === 'GenUnits'  && isFormatClear) {
                            if (typeof row[Pmin] !== 'number' || typeof row[Pmax] !== 'number' || typeof row[fuelCost] !== 'number' || typeof row[heatRate_X3] !== 'number' || typeof row[heatRate_X2] !== 'number' || typeof row[heatRate_X1] !== 'number'
                                || typeof row[heatRate_X0] !== 'number' || typeof row[coldHeat] !== 'number' || typeof row[bankHeat] !== 'number' || typeof row[thermalConstant] !== 'number' || typeof row[fixedCost] !== 'number') { 
                                isFormatClear = false; 
                            } else {
                                newRows.push({
                                    key: index,
                                    unitName: row[unitName].toString(),
                                    pmin: row[Pmin],
                                    pmax: row[Pmax],
                                    fuelCost: row[fuelCost],
                                    heatRate: [row[heatRate_X3], row[heatRate_X2], row[heatRate_X1], row[heatRate_X0]],
                                    coldHeat: row[coldHeat],
                                    bankHeat: row[bankHeat],
                                    thermalConstant: row[thermalConstant],
                                    fixedCost: row[fixedCost],
                                });
                            }
                        }

                    }
                });
                if (isFormatClear && newRows.length === 0) {
                    this.setState({
                        errorMessage: "No data found in file!"
                    });
                    return false;
                } else if (!isFormatClear) {
                    // console.log('format not clear')
                    return false;
                } else {
                    this.setState({
                        cols: resp.cols,
                        rows: newRows,
                        errorMessage: null
                    });
                    if (this.props.inputTag === 'Demand') {
                        var time = [];
                        var power = [];
                        newRows.map((row, index) => {
                            time.push(row.time.toString());
                            power.push(row.power);
                        })
                        // console.log(time)
                        // console.log(power)
                        this.props.onExcelRender(time, power)
                    } else if (this.props.inputTag === 'GenUnits') {
                        // console.log(this.state.rows[0].heatRate)
                        this.props.onExcelRenderGenUnits(this.state.rows)
                    }
                }
            }
        });
        return false;
    };

    // displaying the UI
    render() {
        return (
            <div>
                <Upload
                    name="file"
                    beforeUpload={this.fileHandler}
                    onRemove={() => this.setState({ rows: [] })}
                    multiple={false}
                    maxCount={1}
                >
                    <Button>
                        <UploadOutlined />
                        Click to Upload Excel File
                    </Button>
                </Upload>
                <h6>
                    {this.state.errorMessage}
                </h6>
            </div>
        )
    }
}