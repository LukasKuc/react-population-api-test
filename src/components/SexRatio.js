import React, { Component } from 'react';

class SexRatio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: []
        }
        
    }

    componentDidMount() {
        this.ratioSorted(this.props.countries);
        
    }

    componentWillReceiveProps(nextProps) {
        this.ratioSorted(nextProps.countries);
    }

 

    ratioSorted = (data) => {
        let sorted = data.sort(function (a, b) {
            return (b.ratio - a.ratio);
        });
        
        this.setState({ countries: sorted });


    }

    render() {


        return (
            
            <div>
                {   
                    this.state.countries.sort(function (a, b) {
                        return (b.ratio - a.ratio);
                    }).filter( (item) => {
                        return item.ratio ? item : null
                    }).slice(0, 1)
                    .map( (item, key) => {
                        return (
                            <div key={key}>
                            <div className="alert alert-success my-5" role="alert">
  <h4 className="alert-heading">Fact of the day!</h4>
  <p>The biggest male-female ratio <strong>({item.ratio.toFixed(3)})</strong> is in {item.name}</p>
  <hr/>
  <p className="mb-0"><strong>{item.name}</strong> has {item.males} men and {item.females} women!</p>
</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default SexRatio;