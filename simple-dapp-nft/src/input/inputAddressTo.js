import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "0x265F176620fCD0AcBE38f4cC75B30007AB0A10c9"
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
          id="inputAddressTo"
          type="text"
          onChange={this.handleChange}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default Input;