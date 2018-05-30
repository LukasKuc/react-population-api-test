import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CountryList from './CountryList';

class Reports extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/reports' render={routeProps => <CountryList {...routeProps} countries={this.props.countries}/>} />
            </Switch>
        );
    }
}

export default Reports;
