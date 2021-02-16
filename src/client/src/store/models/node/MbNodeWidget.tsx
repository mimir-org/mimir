import React, { Component } from 'react';
import * as _ from 'lodash';
import { MbNodeModel } from './MbNodeModel';
import { MbPortLabel } from './../port/MbPortLabelWidget'
import { DiagramEngine, PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';
import { MbPortModel } from '../port/MbPortModel';

export interface MbNodeWidgetProps {
	node: MbNodeModel;
	engine: DiagramEngine;
}


export const Node = styled.div<{ background: string; selected: boolean }>`
	background-color: ${(p) => p.background};
	border-radius: 5px;
	font-family: sans-serif;
	color: white;
	border: solid 2px black;
	overflow: visible;
	font-size: 11px;
	border: solid 2px ${(p) => (p.selected ? 'rgb(0,192,255)' : 'black')};
`;

export const Title = styled.div`
	background: rgba(0, 0, 0, 0.3);
	display: flex;
	white-space: nowrap;
	justify-items: center;
`;

export const TitleName = styled.div`
	flex-grow: 1;
	padding: 5px 5px;
`;

export const Ports = styled.div`
	display: flex;
	background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
`;

export const PortsContainer = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	&:first-of-type {
		margin-right: 10px;
	}
	&:only-child {
		margin-right: 0px;
	}
`;

export class MbNodeWidget extends Component<MbNodeWidgetProps> {

	generatePort = (port) => {
		return <MbPortLabel engine={this.props.engine} port={port} key={port.getID()} />;
	};

	render() {
		
		return (
			<Node
				data-default-node-name={this.props.node.getOptions().name}
				selected={this.props.node.isSelected()}
				background='#c8c8c8'>
				<Title>
					<TitleName>{this.props.node.getOptions().name}</TitleName>
				</Title>
				<Ports>
					<PortsContainer>{_.map(this.props.node.getInPorts(), this.generatePort)}</PortsContainer>
					<PortsContainer>{_.map(this.props.node.getOutPorts(), this.generatePort)}</PortsContainer>
				</Ports>
			</Node>
		);
	}
}
