import React, { Component } from 'react';
import axios from "axios/index";
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const COLORS = ['red', 'green'];

class CountryDetail extends Component {
    constructor(match) {
        super(match);

        this.state = {
            isMounted: false,
            country: match.match.params.country,
            population: '',
            males: '',
            females: '',
            ratio: '',
            datapie: []
        }


    }

    componentDidMount(country) {
                const year = new Date().getFullYear();
                axios.get('http://api.population.io:80/1.0/population/'+ year + '/' + this.state.country +'/')
                    .then(res => {
                        let totalMen = 0;
                   for (let i = 0; i < res.data.length; i++) {
                        totalMen += res.data[i].males;
                   }
        
                   let totalWomen = 0;
                   for (let i = 0; i < res.data.length; i++) {
                        totalWomen += res.data[i].females;
                   }

                  return this.setState({
                       population: totalMen + totalWomen,
                       males: totalMen,
                       females: totalWomen,
                       ratio: totalMen / totalWomen
                   });
                   
                    }).then( (state) => {
                        this.pieData(this.state);
                    }).catch( (err) => { console.log(err) });

                }

    componentWillUnmount() {
        this.setState( { isMounted: false } )
    }

    pieData = () => {
                    const data = [{name: 'Male', value: this.state.males}, {name: 'Female', value: this.state.females}]
                    this.setState({ datapie: data}, this.forceUpdate())
    };

    render() {

        return (
            <main role="main">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">{this.state.country}</h1>
            </div>
            <div className="jumbotron bg-light mb-0">
            <figure className="figure w-100 text-center">
            <PieChart width={200} height={150}>
            <Pie dataKey="value" startAngle={180} endAngle={0} data={this.state.datapie} cx={100} cy={100} outerRadius={80} fill="#8884d8">
     { this.state.datapie.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index]}/>
      ))
    }
            </Pie>
            <Tooltip/>
            <Legend />
            </PieChart>
            <figcaption className="figure-caption">{this.state.country} male/female population ratio.</figcaption>
            </figure>
            </div>
            <div className="table-responsive">
            <table className="table alert-success text-center my-5">
                <thead>
                    <tr>
                    <th scope="col">Population of Men</th>
                    <th scope="col">Population of Women</th>
                    <th scope="col">Gender Population Ratio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{this.state.males}</td>
                    <td>{this.state.females}</td>
                    <td>{this.state.ratio}</td>
                    </tr>
                </tbody>
            </table>
            </div>
            </main>
        )
    }
}

export default CountryDetail;