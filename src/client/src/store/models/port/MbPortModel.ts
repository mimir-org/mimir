import {
	LinkModel,
	PortModel,
	PortModelAlignment,
	PortModelGenerics,
	PortModelOptions
} from '@projectstorm/react-diagrams-core';
import { MbLinkModel } from '../link/MbLinkModel';
import { AbstractModelFactory, DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface MbPortModelOptions extends PortModelOptions {
	label?: string;
	in?: boolean;
}

export interface MbPortModelGenerics extends PortModelGenerics {
	OPTIONS: MbPortModelOptions;
}

export class MbPortModel extends PortModel<MbPortModelGenerics> {
	constructor(isIn: boolean, name?: string, label?: string);
	constructor(options: MbPortModelOptions);
	constructor(options: MbPortModelOptions | boolean, name?: string, label?: string) {
		if (!!name) {
			options = {
				in: !!options,
				name: name,
				label: label
			};
		}
		options = options as MbPortModelOptions;
		super({
			label: options.label || options.name,
			alignment: options.in ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
			type: 'mb',
			...options
		});
	}

	deserialize(event: DeserializeEvent<this>) {
		super.deserialize(event);
		this.options.in = event.data.in;
		this.options.label = event.data.label;
	}

	serialize() {
		return {
			...super.serialize(),
			in: this.options.in,
			label: this.options.label
		};
	}

	link<T extends LinkModel>(port: PortModel, factory?: AbstractModelFactory<T>): T {
		let link = this.createLinkModel(factory);
		link.setSourcePort(this);
		link.setTargetPort(port);
		return link as T;
	}

	canLinkToPort(port: PortModel): boolean {
		if (port instanceof MbPortModel) {
			return this.options.in !== port.getOptions().in;
		}
		return true;
	}

	createLinkModel(factory?: AbstractModelFactory<LinkModel>): LinkModel {
		let link = super.createLinkModel();
		if (!link && factory) {
			return factory.generateModel({});
		}
		return link || new MbLinkModel();
	}
}