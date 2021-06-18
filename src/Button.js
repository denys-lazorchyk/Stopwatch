import React from "react";
import PropTypes from "prop-types";

class Button extends React.Component {
  static propTypes = {
    sClass: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.clickHandle();
  }

  render() {
    return (
      <div>
        <button
          className={(this.props.sClass, "btn")}
          onClick={this.handleClick}
        >
          {this.props.name}
        </button>
      </div>
    );
  }
}

export default Button;
