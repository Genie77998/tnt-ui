/*
* @Author: wj77998
* @Date:   2017-03-02 10:20:47
* @Email:  wj77998@qq.com
* @Last Modified by:   wj77998
* @Last Modified time: 2017-04-11 15:30:35
*/

'use strict';
import React, { PropTypes , Component } from 'react'

export default class Star extends Component {

	constructor(props) {
        super(props);
        this.onHover = this.onHover.bind(this);
        this.onClick = this.onClick.bind(this);
    }

	onHover(e) {
	    this.props.onHover(e, this.props.index);
	}

	onClick(e) {
	    this.props.onClick(e, this.props.index);
	}

	render(){
		const { onHover, onClick } = this; 
    	const { disabled, prefixCls , className , index } = this.props;
		return (
			<li
		        className={ className }
		    >
		    	<span
		    		data-index={1}
		    		onClick={disabled ? null : onClick}
		        	onMouseMove={disabled ? null : onHover}
		         	className={`${prefixCls}-first`}
		         	></span>
		        <span
		        	data-index={2}
		        	onClick={disabled ? null : onClick}
		        	onMouseMove={disabled ? null : onHover}
		        	className={`${prefixCls}-second`}
		        ></span>
		    </li>
		)
	}
}

Star.propTypes = {
    index: PropTypes.number,
    prefixCls: PropTypes.string,
    allowHalf: PropTypes.bool,
    disabled: PropTypes.bool,
    onHover: PropTypes.func,
    onClick: PropTypes.func
}
