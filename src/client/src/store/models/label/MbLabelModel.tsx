import { LabelModel, LabelModelGenerics, LabelModelOptions } from '@projectstorm/react-diagrams-core';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface MbLabelModelOptions extends LabelModelOptions {
	label?: string;
}

export interface MbLabelModelGenerics extends LabelModelGenerics {
	OPTIONS: MbLabelModelOptions;
}

export class MbLabelModel extends LabelModel<MbLabelModelGenerics> {
	constructor(options: MbLabelModelOptions = {}) {
		super({
			offsetY: options.offsetY == null ? -23 : options.offsetY,
			type: 'mb',
			...options
		});
	}

	setLabel(label: string) {
		this.options.label = label;
	}

	deserialize(event: DeserializeEvent<this>) {
		super.deserialize(event);
		this.options.label = event.data.label;
	}

	serialize() {
		return {
			...super.serialize(),
			label: this.options.label
		};
	}
}