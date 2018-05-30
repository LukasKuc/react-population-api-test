import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Reports from './Reports';
import CountryDetail from './CountryDetail';
import axios from "axios/index";

class Main extends Component {
    constructor() {
        super();

        this.countries = [];
    }

    componentDidMount() {
        this.getCountries(this.countries);
    }

    getCountries(arr) {

        axios.get('http://api.population.io:80/1.0/countries')
            .then(res => {
                const countries = res.data.countries;
                const countriesLength = countries.length;
                let current = 0;

                countries.forEach((element) => {
                    current++;
                    const country = element.split('/').pop();
                    // this.getPopulation(arr, country, today, current, countriesLength);
                    this.getRatio(arr, country, current, countriesLength);
                });

                return arr;
            });
    }

    getRatio (arr, country, i, length) {
        const year = new Date().getFullYear();
        axios.get('http://api.population.io:80/1.0/population/'+ year + '/' + country +'/')
            .then(res => {
                    let totalMen = 0;
               for (let i = 0; i < res.data.length; i++) {
                    totalMen += res.data[i].males;
               }
    
               let totalWomen = 0;
               for (let i = 0; i < res.data.length; i++) {
                    totalWomen += res.data[i].females;
               }


                    arr.push({
                        name: country,
                        males: totalMen,
                        females: totalWomen,
                        value: totalMen + totalWomen,
                        ratio: totalMen / totalWomen
                    });

                    if (i === length) {
                        this.setState({updated: true});
                }

                return arr;
               
            }).catch( (err) => console.log(err));

            }
    



    render() {
        return (
            <div className="col-md-10 ml-sm-auto col-lg-10 col-xl-10 px-4">
                <Switch>
                    <Route exact path='/' render={routeProps => <Home {...routeProps} countries={this.countries}/>} />
                    <Route path='/reports' render={routeProps => <Reports {...routeProps} countries={this.countries}/>} />
                    <Route path='/detailed/:country' component={CountryDetail} />
                    <Route render={ () => {
                        return <p>Not Found</p>
                    }} />
                </Switch>
            </div>
        );
    }

}

export default Main;