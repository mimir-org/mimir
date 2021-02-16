import * as _ from 'lodash';
import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams';
import { MbPortModel } from '../port/MbPortModel';
import { BasePositionModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';

import { Node, PortType } from './../../workspace/types';

export interface MbModelOptions extends BasePositionModelOptions {
	name?: string;	
}

export interface MbNodeModelGenerics extends NodeModelGenerics {
	OPTIONS: MbModelOptions;
}

export class MbNodeModel extends NodeModel<MbNodeModelGenerics> {
	protected portsIn: MbPortModel[];
	protected portsOut: MbPortModel[];

	constructor(name: string, color: string);
	constructor(options?: MbModelOptions);
	constructor(options: any = {}) {
		if (typeof options === 'string') {
			options = {
				name: options				
			};
		}
		super({
			type: 'default',
			name: 'Untitled',
			// color: 'rgb(0,192,255)',
			...options
		});
		this.portsOut = [];
		this.portsIn = [];
	}

	

	addPort<T extends MbPortModel>(port: T): T {
		super.addPort(port);
		if (port.getOptions().in) {
			if (this.portsIn.indexOf(port) === -1) {
				console.log(port.getParent().getID());
				this.portsIn.push(port);
			}
		} else {
			if (this.portsOut.indexOf(port) === -1) {
				console.log(port.getParent().getID());
				this.portsOut.push(port);
			}
		}
		return port;
	}

	addInPort(label: string, after = true): MbPortModel {
		const p = new MbPortModel({
			in: true,
			name: label,
			label: label,
			alignment: PortModelAlignment.LEFT
		});
		if (!after) {
			this.portsIn.splice(0, 0, p);
		}
		return this.addPort(p);
	}

	addOutPort(label: string, after = true): MbPortModel {
		const p = new MbPortModel({
			in: false,
			name: label,
			label: label,
			alignment: PortModelAlignment.RIGHT
		});
		if (!after) {
			this.portsOut.splice(0, 0, p);
		}
		return this.addPort(p);
	}

	deserialize(event: DeserializeEvent<this>) {
		super.deserialize(event);
		this.options.name = event.data.name;
		// this.options.color = event.data.color;
		this.portsIn = _.map(event.data.portsInOrder, (id) => {
			console.log('deserialize: ' + JSON.stringify(this.portsIn));
			return this.getPortFromID(id);
		}) as MbPortModel[];
		this.portsOut = _.map(event.data.portsOutOrder, (id) => {
			console.log('deserialize: ' + JSON.stringify(this.portsOut));
			return this.getPortFromID(id);
		}) as MbPortModel[];
	}

	serialize(): any {
		return {
			...super.serialize(),
			name: this.options.name,
			// color: this.options.color,
			portsInOrder: _.map(this.portsIn, (port) => {
				console.log('serialize IN: ' + port.getID());
				return port.getID();
			}),
			portsOutOrder: _.map(this.portsOut, (port) => {
				console.log('serialize OUT: ' + port.getID());
				return port.getID();
			})
		};
	}

	getInPorts(): MbPortModel[] {
		return this.portsIn;
	}

	getOutPorts(): MbPortModel[] {
		return this.portsOut;
	}
}
