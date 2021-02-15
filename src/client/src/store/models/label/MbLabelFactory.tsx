import * as React from 'react';
import { MbLabelModel } from './MbLabelModel';
import { MbLabelWidget } from './MbLabelWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

/**
 * @author Dylan Vorster
 */
export class MbLabelFactory extends AbstractReactFactory<MbLabelModel, DiagramEngine> {
	constructor() {
		super('mb');
	}

	generateReactWidget(event): JSX.Element {
		return <MbLabelWidget model={event.model} />;
	}

	generateModel(event): MbLabelModel {
		return new MbLabelModel();
	}
}