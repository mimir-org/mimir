import React, { useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './treeview.scss';
import { TreeviewState } from '../../store/treeview/types';
import { getTreeview } from '../../store/treeview/actions'; 
import {  getWorkspace } from '../../store/workspace/actions'; 
import { Workspace, Node, Edge } from "../../models/workspace";
import { RootState } from './../../store/index';

import NodeComponent from './node/NodeComponent';
import { WorkspaceService } from './../../services';

import FunctionalIcon from '../../assets/functionbox.png';
import ProductionIcon from '../../assets/productionbox.png';
import LocationIcon from '../../assets/locationbox.png';

const TreeviewComponent : FC<Workspace> = ({ root, aspects }: Workspace) => {

    const service = new WorkspaceService({ root, aspects});
    // console.log(service.functionalNodeMap);
    // console.log(service.getRootEdges("root"));
    // console.log(service.getRootEdges)

    const n = service.getRootEdges("root");
    n.forEach(edge => {
        const label = service.getProductLabel(edge.from);
        console.log(label);
        const node = service.functionalNodeMap.get(edge.from);
        console.log(node);
    })

    return (
        <div className="treeviewComponent">
            <p>test</p>
        {/* {
        //     treeviewState &&
        //         treeviewState.root && !treeviewState.fetching && (
        //             <>
        //                 <div className="aspect">
        //                     <div className="aspect_heading">
        //                         <img src={FunctionalIcon} alt="functional-aspect-icon"/>
        //                         <p>Function</p>
        //                     </div>
        //                     { nodes &&
        //                     <>
        //                         <NodeComponent type={"root"}/>
        //                         <div className="treestructure_container">
        //                             { nodes.map((node) => (
        //                                 <NodeComponent name={node.name} type={"children"}/>
        //                             ))}
        //                         </div>
        //                     </>
        //                     }
        //                 </div>
        //                 <div className="aspect">
        //                     <div className="aspect_heading">
        //                         <img src={ProductionIcon} alt="functional-aspect-icon"/>
        //                         <p>Production</p>
        //                     </div>
        //                     <div className="treestructure_container">

        //                     </div>
        //                 </div>
        //                 <div className="aspect">
        //                     <div className="aspect_heading">
        //                         <img src={LocationIcon} alt="functional-aspect-icon"/>
        //                         <p>Location</p>
        //                     </div>
        //                     <div className="treestructure_container">
        //                     </div>
        //                 </div>
        //             </>
        //         )
        // } */}
        </div>
    )
}

export default TreeviewComponent;