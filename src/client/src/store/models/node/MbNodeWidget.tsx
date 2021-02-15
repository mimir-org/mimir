import React, { Component } from 'react';
import { MbNodeModel } from './MbNodeModel';
import { DiagramEngine, PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';

export interface MbNodeWidgetProps {
	node: MbNodeModel;
	engine: DiagramEngine;
	size: number;
}


	export const Port = styled.div`
		width: 16px;
		height: 16px;
		z-index: 10;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 8px;
		cursor: pointer;
		&:hover {
			background: rgba(0, 0, 0, 1);
		}
	`;

export class MbNodeWidget extends Component<MbNodeWidgetProps> {
	render() {
		return (
			<div className='mb-node'
			// style={{
			// 	position: 'relative',
			// 	width: this.props.size,
			// 	height: this.props.size
			// }}
			>
				<h1>{this.props.node.getOptions().name}</h1>
				<h2>{this.props.node.getOptions().title}</h2>

				{/* {<PortWidget port={this.props.node.getPort(PortModelAlignment.LEFT)} engine={this.props.engine }>
					<Port>Out</Port>
				</PortWidget> } */}
				
			</div>
		);
	}
}
