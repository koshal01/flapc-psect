import Chart from 'chart.js';
import React, { Component } from 'react';

// To display the load curve
class BarChart extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidUpdate() {
        var len = this.props.time.length;
        var tempArray = [];

        for (var i = 0; i < len + 1; i++) {
            if (i === len) {
                if (tempArray[tempArray.length - 1] === 24) {
                    tempArray.push(0)
                } else
                    tempArray.push(tempArray[tempArray.length - 1] + 1)
            } else {
                tempArray.push(parseInt(this.props.time[i]));
            }
        }

        this.myChart.data.labels = tempArray
        this.myChart.data.datasets[0].data = this.props.power;
        this.myChart.update();
    }

    componentDidMount() {
        var len = this.props.time.length;
        var tempArray = [];

        for (var i = 0; i < len + 1; i++) {
            if (i === len) {
                if (tempArray[tempArray.length - 1] === 24) {
                    tempArray.push(0)
                } else
                    tempArray.push(tempArray[tempArray.length - 1] + 1)
            } else {
                tempArray.push(parseInt(this.props.time[i]));
            }
        }

        this.myChart = new Chart(this.chartRef.current, {
            type: 'bar',
            data: {
                labels: tempArray,
                datasets: [{
                    label: 'Power Demand',
                    data: this.props.power,
                    barPercentage: 1.3,
                    backgroundColor: '#5975D6',
                    opacity: '0.6'
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        display: false,
                        ticks: {
                            max: this.props.power.length - 1,
                        },
                    },
                    {
                        display: true,
                        ticks: {
                            autoSkip: false,
                            max: this.props.power.length,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Time in 24hr format (hr)'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Power (MW)'
                        }
                    }]
                }
            }
        });
    }
    render() {
        return (
            <canvas id="histogram" width="800" height="800" ref={this.chartRef} />
        );
    }
}

export default BarChart;