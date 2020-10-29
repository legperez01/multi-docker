import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seeIndexes: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        console.log('Loading data...')
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        console.log(values);
        this.setState({ values: values.data });
    }

    async fetchIndexes() {
        const seeIndexes = await axios.get('/api/values/all');
        console.log(seeIndexes);
        this.setState({
            seeIndexes: seeIndexes.data
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('/api/values', {
            index: this.state.index
        });
        this.setState({ index: ''});
    }

    renderSeeIndexes() {
        return this.state.seeIndexes.map(({ number}) => number).join(', ');
    }

    renderValues() {
        let entries = [];
   
        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated {this.state.values[key]}
                </div>
            )
        }

        return entries;
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit} > 
                    <label>Enter you index:</label>
                    <input
                    value={this.state.index}
                    onChange={event => this.setState({ index: event.target.value })}
                    
                    />
                    <button>Submit</button>
                </form>

                <h3>Indexes I have seen:</h3>
                {this.renderSeeIndexes()}

                <h3>Calculated values:</h3>
                {this.renderValues()}
            </div>
        )
    }
}

export default Fib;