import React, { FC } from 'react';
import { Aspects } from '../../../models/workspace';
import './aspect.scss';

type AspectComponentAttribute = {aspect : Aspects};
const AspectComponent : FC<AspectComponentAttribute> = ( {aspect} : AspectComponentAttribute ) => {

return(
	<div className='aspect_container'>
		<div className='aspect_heading'>
			<p>{aspect.descriptor.name}</p>
		</div>
		<div className='treestructure_container'>
			<div className='root'></div>
			<div className='vertical-line'></div>

		</div>
	</div>
	)

}

export default AspectComponent;