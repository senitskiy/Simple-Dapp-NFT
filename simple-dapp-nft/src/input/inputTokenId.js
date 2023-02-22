import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "1"
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
          id="inputTokenId"
          type="text"
          onChange={this.handleChange}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default Input;