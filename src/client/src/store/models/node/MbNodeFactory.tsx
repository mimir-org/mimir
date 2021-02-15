import { MbNodeWidget } from './MbNodeWidget';
import { MbNodeModel } from './MbNodeModel';
import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class MbNodeFactory extends AbstractReactFactory<MbNodeModel, DiagramEngine> {
	constructor() {
		super('mb');
	}

	generateReactWidget(event): JSX.Element {
		return <MbNodeWidget engine={this.engine} size={50} node={event.model} />;
	}

	generateModel(event): MbNodeModel {
		return new MbNodeModel();
	}
}