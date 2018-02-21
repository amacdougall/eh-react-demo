import React, { Component } from 'react';
import './ExampleGrid.css';

export default class ExampleGrid extends Component {
  render() {
    return (
      <div className="ExampleGrid-container">
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
        <div>Four</div>
        <div>Five</div>
      </div>
    );
  }
}
