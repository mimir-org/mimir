import * as _ from 'lodash';
import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams';
import { MbPortModel } from '../port/MbPortModel';
import { BasePositionModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';

export interface MbModelOptions extends BasePositionModelOptions {
	rdfId?: string;
	rdfType?: string;
}

export interface MbNodeModelGenerics extends NodeModelGenerics {
	OPTIONS: MbModelOptions;
}

export class MbNodeModel extends NodeModel<MbNodeModelGenerics> {
	protected portsIn: MbPortModel[];
	protected portsOut: MbPortModel[];

	constructor(rdfId: string, rdfType: string);
	constructor(options?: MbModelOptions);
	constructor(options: any = {}) {
		if (typeof options === 'string') {
			options = {
				rdfType: options				
			};
		}
		super({
			type: 'mb',
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
				this.portsIn.push(port);
			}
		} else {
			if (this.portsOut.indexOf(port) === -1) {
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
		this.options.rdfId = event.data.rdfId;
		this.options.rdfType = event.data.rdfType;		
		this.portsIn = _.map(event.data.portsInOrder, (id) => {
			return this.getPortFromID(id);
		}) as MbPortModel[];
		this.portsOut = _.map(event.data.portsOutOrder, (id) => {
			return this.getPortFromID(id);
		}) as MbPortModel[];
	}

	serialize(): any {
		return {
			...super.serialize(),
			rdfId: this.options.rdfId,
			rdfType: this.options.rdfType,
			portsInOrder: _.map(this.portsIn, (port) => {
				return port.getID();
			}),
			portsOutOrder: _.map(this.portsOut, (port) => {
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
