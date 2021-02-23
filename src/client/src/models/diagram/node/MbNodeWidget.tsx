import React, { Component } from "react";
import * as _ from "lodash";
import { MbNodeModel } from "./MbNodeModel";
import { MbPortLabel } from "./../port/MbPortLabelWidget";
import { DiagramEngine } from "@projectstorm/react-diagrams";

export interface MbNodeWidgetProps {
  node: MbNodeModel;
  engine: DiagramEngine;
}
export class MbNodeWidget extends Component<MbNodeWidgetProps> {
  generatePort = (port) => {
    return (
      <MbPortLabel engine={this.props.engine} port={port} key={port.getID()} />
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.props.node.getOptions().svg && (
          <div
          className={`mb-node-svg mb-node-svg__reservoir ${
            this.props.node.isSelected() ? "mb-node-svg__selected" : ""
          }`}
        >
            <h1>Reservoir</h1>
            <div className="ports">
              <div className="ports-container">
                {_.map(this.props.node.getInPorts(), this.generatePort)}
              </div>
              <div className="ports-container">
                {_.map(this.props.node.getOutPorts(), this.generatePort)}
              </div>
            </div>
          </div>
        )}

        {!this.props.node.getOptions().svg && (
          <div
            className={`mb-node ${
              this.props.node.isSelected() ? "mb-node__selected" : ""
            }`}
          >
            <h1>{this.props.node.getOptions().rdfType}</h1>
            <h2>xxx- {this.props.node.getOptions().rdfId}</h2>

            <div className="ports">
              <div className="ports-container">
                {_.map(this.props.node.getInPorts(), this.generatePort)}
              </div>
              <div className="ports-container">
                {_.map(this.props.node.getOutPorts(), this.generatePort)}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
