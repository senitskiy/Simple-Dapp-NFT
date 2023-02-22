import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "https://www.shutterstock.com/image-vector/cute-dog-space-vector-illustration-600w-547688842.jpg"
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
          id="inputTokenURI"
          type="text"
          onChange={this.handleChange}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default Input;