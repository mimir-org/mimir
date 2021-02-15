import { MbPortModel } from './MbPortModel';
import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class MbPortFactory extends AbstractModelFactory<MbPortModel, DiagramEngine> {
	constructor() {
		super('mb');
	}

	generateModel(): MbPortModel {
		return new MbPortModel({
			name: 'unknown'
		});
	}
}