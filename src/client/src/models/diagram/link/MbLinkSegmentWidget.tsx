import * as React from 'react';
import { MbLinkFactory } from './MbLinkFactory';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { MbLinkModel } from './MbLinkModel';

export interface MbLinkSegmentWidgetProps {
	path: string;
	link: MbLinkModel;
	selected: boolean;
	forwardRef: React.RefObject<SVGPathElement>;
	factory: MbLinkFactory;
	diagramEngine: DiagramEngine;
	onSelection: (selected: boolean) => any;
	extras: object;
}

export class MbLinkSegmentWidget extends React.Component<MbLinkSegmentWidgetProps> {
	render() {
		const Bottom = React.cloneElement(
			this.props.factory.generateLinkSegment(
				this.props.link,
				this.props.selected || this.props.link.isSelected(),
				this.props.path
			),
			{
				ref: this.props.forwardRef
			}
		);

		const Top = React.cloneElement(Bottom, {
			strokeLinecap: 'round',
			onMouseLeave: () => {
				this.props.onSelection(false);
			},
			onMouseEnter: () => {
				this.props.onSelection(true);
			},
			...this.props.extras,
			ref: null,
			'data-linkid': this.props.link.getID(),
			strokeOpacity: this.props.selected ? 0.1 : 0,
			strokeWidth: 20,
			fill: 'none',
			onContextMenu: (e: Event) => {
				if (!this.props.link.isLocked()) {
					e.preventDefault();
					this.props.link.remove();
				}
			}
		});

		return (
			<g>
				{Bottom}
				{Top}
			</g>
		);
	}
}