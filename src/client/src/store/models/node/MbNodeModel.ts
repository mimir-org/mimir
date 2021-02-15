import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams';
import { MbPortModel } from '../port/MbPortModel';
import { BasePositionModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface MbModelOptions extends BasePositionModelOptions {
	name?: string;
	title?: string;
}

export interface MbNodeModelGenerics extends NodeModelGenerics {
	OPTIONS: MbModelOptions;
}

export class MbNodeModel extends NodeModel<MbNodeModelGenerics> {
	protected portsIn: MbPortModel[];
	protected portsOut: MbPortModel[];


	constructor(options?: MbModelOptions) {
		super({ type: 'mb', ...options });
	}
}
