import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Symbol"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange( event ) {
    this.setState({
     value: event.target.value
    });
  }

  render() {
    return (
      <div>
        <input
          id="inputSymbol"
          type="text"
          onChange={this.handleChange}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default Input;