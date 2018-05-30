import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Feather from '../../node_modules/feather-icons';

class CountryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            inputValue: '',
            sortStatus: 0,
            alphabetic: 0
        };


    }

    componentDidMount() {
        this.setState({items: this.props.countries});
        Feather.replace();
    }

    getDerivedStateFromProps(nextProps) {
        this.setState({items: nextProps.countries});
    }

    sortByCountry = () => {
        let sortedItems;
            
        if (this.state.alphabetic === 0) {
            sortedItems  = this.state.items.sort(function (a, b) {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase

            if (nameA < nameB) {
                return -1;
            }

            if (nameA > nameB) {
                return 1;
            }

            return 0;
        });
        this.setState({alphabetic: 1 });
    } else {
        sortedItems  = this.state.items.sort(function (a, b) {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase

            if (nameA < nameB) {
                return 1;
            }

            if (nameA > nameB) {
                return -1;
            }

            return 0;
        });
        this.setState({alphabetic: 0 });
    }
        this.setState({items: sortedItems });
    };

    sortByPopulation = () => {
        let sortedItems;
        if (this.state.sortStatus === 0) {
        sortedItems = this.state.items.sort(function (a, b) {
            return b.value - a.value;
        });
        this.setState({sortStatus: 1 });
    } else {
        sortedItems = this.state.items.sort(function (a, b) {
            return a.value - b.value;
        });
        this.setState({sortStatus: 0 });
    }

        this.setState({items: sortedItems });
    };

    filterByNumber = (e) => {

        let numb = e.target.innerHTML;

        let newItems;

        if (numb !== "All") {
            newItems = this.props.countries.slice(0, numb);
        } else {
            newItems = this.props.countries;
        }
        
        this.setState({
            items: newItems
        });

    }


    filterByLetters = (event) => {

        this.setState({
        inputValue: event.target.value
    })

        let newTarget = event.target.value.toUpperCase();

        let newItems = this.props.countries.filter( (element) => {
            let patt = new RegExp(newTarget);
            return patt.test(element.name.toUpperCase()) ? element.name : null;
        });

        
        this.setState({
            items: newItems
        });

    }



    render() {
        return (
            <main role="main">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <div className="table-responsive">
            <h1 className="h2">Reports</h1>
            <button className="btn btn-info mr-2 mb-2" onClick={this.filterByNumber}>10</button><button className="btn btn-info mr-2 mb-2" onClick={this.filterByNumber}>50</button>
            <button className="btn btn-info mr-2 mb-2" onClick={this.filterByNumber}>100</button><button className="btn btn-info mb-2" onClick={this.filterByNumber}>All</button>
            <input id="searchKey" type="text" className="btnFloat mb-2 form-control" value={this.state.inputValue} placeholder="Search..." onChange={event => this.filterByLetters(event)}/>
            <table className="table table-striped table-sm table-lg" style={{marginLeft: 'auto'}}>
                <thead>
                    <tr><td onClick={this.sortByCountry}>Country <span data-feather="arrow-down"></span></td><td onClick={this.sortByPopulation}>Population <span data-feather="arrow-down"></span></td></tr>
                </thead>
                <tbody>
                    {
                        this.state.items.map((item, i) => {



                            return (
                                
                                <tr key={i}><td>
                                <Link to={`/detailed/${item.name}`} style={{textDecoration: 'none', color: '#000000', width: '100%'}}>
                                    {item.name}
                                </Link></td>
                                <td>
                                <Link to={`/detailed/${item.name}`} style={{textDecoration: 'none', color: '#000000', width: '100%'}}>
                                    {item.value}
                                </Link>
                                </td>
                                </tr>
                                
                            )
                        })
                    }
                </tbody>
            </table>
            </div>
            </div>
            </main>
        )
    }
}

export default CountryList;
