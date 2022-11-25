import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/antd.min.css";
import { Routes, Route } from 'react-router-dom';

import Input from './Input';
import FirstPage from './FirstPage';
import { getPriorityList } from './utils/main';
import LoadGraph from './components/loadGraph';
import LoadList from './components/loadList';
import LoadGenerator from './components/loadGenerator';
import Approach from './components/approach';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeStamp: [],
            powerDemand: [],
            unitList: [],
            isInputRight: false,
            dataTable: null,
            priorityList: null,
            gen_no: []
        };
        this.handleLoadCurve.bind(this);
        this.handleGenUnits.bind(this);
    }

    handleLoadCurve = (time, power) => {
        this.setState({
            timeStamp: time,
            powerDemand: power
        })
    }

     
    handleGenUnits = (obtainedUnitList) => {
        this.setState({
            unitList: [...this.state.unitList, obtainedUnitList]
        });

        if (this.state.unitList.length !== 0 && this.state.timeStamp.length !== 0 && this.state.powerDemand.length !== 0) {
            const [rUpdatedPriorityList, rUpdatedTableData, rGen_no] = getPriorityList(this.state.unitList[0], this.state.powerDemand);
            this.setState({
                isInputRight: true,
                dataTable: rUpdatedTableData,
                priorityList: rUpdatedPriorityList,
                gen_no: rGen_no,
            });
        }
    }

    render() {
        return (
            <div>
                <Routes>
                    <Route path="/" element={<FirstPage />} />
                    <Route exact path="/Input" element={<Input LoadCurveData = {this.state} handleLoadCurve = {this.handleLoadCurve} handleGenUnits = {this.handleGenUnits} />} />
                    <Route exact path="/LoadGraph" element={<LoadGraph LoadCurveData = {this.state} />} />
                    <Route exact path="/LoadList" element={<LoadList Data = {this.state} />} />
                    <Route exact path="/LoadGenerator" element={<LoadGenerator Data = {this.state} />} />
                    <Route exact path="/Approach" element={<Approach />} />
                </Routes>
            </div>
        );
    }
}

export default App;