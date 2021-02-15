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
	constructor(options?: MbModelOptions) {
		super({ type: 'mb', ...options });
		
		// this.addPort(new MbPortModel(true, "port"));
		// this.addPort(new MdPortModel(PortModelAlignment.LEFT));
		// this.addPort(new MdPortModel(PortModelAlignment.BOTTOM));
		// this.addPort(new MdPortModel(PortModelAlignment.RIGHT));
	}
}
