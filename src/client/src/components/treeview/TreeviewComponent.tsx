import React, { useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './treeview.scss';
import {  getWorkspace } from '../../store/workspace/actions'; 
import { Workspace, Node, Edge } from "../../models/workspace";
import { RootState } from './../../store/index';

import NodeComponent from './node/NodeComponent';
import AspectComponent from './aspect/AspectComponent';
import { WorkspaceService } from './../../services';

import PlattForm from '../../assets/plattform.svg';
import FunctionalIcon from '../../assets/functionbox.png';
import ProductionIcon from '../../assets/productionbox.png';
import LocationIcon from '../../assets/locationbox.png';

const TreeviewComponent : FC<Workspace> = ({ root, aspects, aspectDescriptors }: Workspace) => {

    const service = new WorkspaceService({ root, aspects, aspectDescriptors});
    // const functionNodeMap = service.createNodeMap("1", "1");
    // console.log(functionNodeMap);

    return (
        <div className='treeview_component'>
            <div className='treestructur_container'>
                <div className='heading'><p>{root.title}</p></div>
                <div className='aspects_container'>
                    {
                        aspectDescriptors.map(aspect => 
                            <div className='aspect_container'>
                                <div className='aspect_heading'>
                                    <img src={aspect.name === 'function' ? FunctionalIcon : aspect.name === 'product' ? ProductionIcon : aspect.name === 'area' ? LocationIcon : null} alt='aspect-icon'/>
                                    <p>{aspect.name}</p>
                                </div>
                                <div className='aspect_category'>
                                    <select>
                                        {/* {aspects['descriptor'].name.forEach.filter(category => category === 1)} */}
                                        <option value="process">Process</option>
                                        <option value="power">Power</option>
                                    </select>
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

    // const n = service.getRootEdges('root');
    // n.forEach(edge => {
    //     const label = service.getProductLabel(edge.from);
    //     console.log('label');
    //     console.log(label);
    //     const node = service.functionalNodeMap.get(edge.from);
    //     console.log('node');
    //     console.log(node);
    // })    
    
    // console.log(service.functionalNodeMap);
    // console.log(service.getRootEdges("root"));
    // console.log(service.getRootEdges)

{/* {aspects.map(aspect => 
                <AspectComponent aspect={aspect}/>
            )} */}

            {/* <div className='aspect'>
                <div className='aspect_heading'>
                    <img src={ProductionIcon} alt='functional-aspect-icon'/>
                    <p>Production</p>
                </div>
                <div className='treestructure_container'>
                    <NodeComponent type={'children'}/>
                </div>
            </div>
            <div className='aspect'>
                <div className='aspect_heading'>
                    <img src={LocationIcon} alt='functional-aspect-icon'/>
                    <p>Location</p>
                </div>
                <div className='treestructure_container'>
                    <NodeComponent type={'children'}/>
                </div>
            </div> */}
            {/* 
                    <NodeComponent type={"root"}/>
                    <div className="treestructure_container">
                        { nodes.map((node) => (
                            <NodeComponent name={node.name} type={"children"}/>
                        ))}
                    </div>
            */}