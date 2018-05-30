import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import Top from './Top';

class App extends Component {
    render() {
        return (
            <div>
                <Top />
                <div className="container-fluid">
                <div className="row">
                <Header />
                <Main />
                </div>
                </div>
            </div>
        );
    }
}

export default App;
