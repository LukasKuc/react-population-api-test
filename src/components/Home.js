import React, { Component } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import SexRatio from './SexRatio';

const COLORS = ['red', 'green', 'blue', 'yellow', 'grey', 'black', 'purple', 'orange', 'brown', 'white'];

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.countries
        };
    }

    componentDidMount() {
        this.sortByPopulation(this.props.countries);
    }



    getDerivedStateFromProps(nextProps) {
        this.sortByPopulation(nextProps.countries);
    }

    sortByPopulation = (data) => {
        let sortedItems = data.sort(function (a, b) {
            return b.value - a.value;
        });

        this.setState({items: sortedItems.slice(1, 11) });
    };


    render() {

        
        return (
            <div>
            <main role="main">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
            </div>
            <div className="jumbotron bg-light">
            <figure className="figure w-100 text-center">
            {this.state.items.length > 9 &&
                <PieChart width={200} height={200}>
                    <Pie dataKey="value" data={this.state.items} cx={100} cy={100} outerRadius={80} fill="#8884d8">
                    { this.state.items.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index]}/>
      ))
    }
                    </Pie>
                    <Tooltip />
                </PieChart>
                }
                <figcaption className="figure-caption">Countries with the highest population (see detail on hover).</figcaption>
            </figure>
            </div>
            <SexRatio countries={this.props.countries}/>
            </main>
            </div>
        );
    }
}

export default Home;
