import React, { Component } from 'react';
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionType from '../../store/actions';
class Counter extends Component {
    state = {
        counter: 0
    }

    render() {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 5" clicked={() => this.props.onAdd(5)} />
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubtract(5)} />

                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {
                        this.props.res.map(result => (
                            <li key={result.id} onClick={() => this.props.onDeleteResult(result.id)}>{result.value}</li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ctr: state.ctr.counter,
        res: state.res.results
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({ type: actionType.INCREMENT }),
        onDecrementCounter: () => dispatch({ type: actionType.DECREMENT }),
        onAdd: (val) => dispatch({ type: actionType.ADD, value: val }),
        onSubtract: (val) => dispatch({ type: actionType.SUBTRACT, value: val }),
        onStoreResult: (result) => dispatch({ type: actionType.STORE_RESULT,  result: result }),
        onDeleteResult: (id) => dispatch({ type: actionType.DELETE_RESULT, resultId: id })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);