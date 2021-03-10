import React, { useEffect, FC } from 'react';
import './treeview.scss';
import { Workspace, Node, Edge } from "../../models/workspace";
import { WorkspaceService } from './../../services';
import FunctionalIcon from '../../assets/functionbox.png';
import ProductionIcon from '../../assets/productionbox.png';
import LocationIcon from '../../assets/locationbox.png';

const TreeviewComponent : FC<Workspace> = ({ root, aspects, aspectDescriptors }: Workspace) => {

	const service = new WorkspaceService({ root, aspects, aspectDescriptors});
	const fcat = service.getFunctionalAspectCategories();
	const pcat = service.getProductAspectCategories();
	const acat = service.getAreaAspectCategories();
	// const fgraph = service.getNodesConnectedToRoot('1');

	return (
		<div className='treeview_component'>
			<div className='treestructur_container'>
				<div className='heading'><p>{root.title}</p></div>
				<div className='aspects_container'>
					{
						aspectDescriptors.map(aspect => 
							<div className='aspect_container'>
								<div className='aspect_heading'>
									<img src={aspect.id === '1' ? FunctionalIcon : aspect.id === '2' ? ProductionIcon : aspect.id === '3' ? LocationIcon : null} alt='aspect-icon'/>
									<p>{aspect.name}</p>
								</div>
								<div className='aspect_category'>
									<select className='select_category'>
										{aspect.id === '1' ? fcat.map(category => 
											<option value={category.name}>{category.name}</option>
										): aspect.id === '2' ? pcat.map(category => 
											<option value={category.name}>{category.name}</option>
										): aspect.id === '3' ? acat.map(category => 
											<option value={category.name}>{category.name}</option>
										): null}
									</select>
								</div>
								<div className='aspect_view'>
								</div>
							</div>
						)
					}
				</div>
			</div>
			<div className='inspector_container'>
				<div className='heading'><p>Inspector</p></div>
				<div className='info_container'><p>Info to come</p></div>
			</div>
		</div>
	)
}

export default TreeviewComponent;