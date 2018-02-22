import React, { Component } from "react";
import { connect } from "react-redux";
import { setView } from "../redux/actionCreators";
import "./Navigation.css";

const tabs = [
  ["patients", "Patients"],
  ["appointments", "Appointments"]
];

class Navigation extends Component {
  buildTabs({ view, setView }) {
    return tabs.map(([tabName, displayName]) => {
      const className = (tabName === view) ? "navigation-tab--selected" : "navigation-tab";
      const onClick = () => this.props.setView(tabName);

      return (
        <div key={tabName} className={className}>
          <div onClick={onClick}>
            {displayName}
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="navigation-bar">
        {this.buildTabs({ view: this.props.view, setView: this.props.setView })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    view: state.view
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setView: view => dispatch(setView(view))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
