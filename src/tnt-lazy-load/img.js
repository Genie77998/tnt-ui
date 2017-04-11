/*
* @Author: wj77998
* @Date:   2017-03-02 10:20:47
* @Email:  wj77998@qq.com
* @Last Modified by:   wj77998
* @Last Modified time: 2017-04-11 15:14:41
*/

'use strict';
import React, { PropTypes,Component } from 'react'
import ReactDOM from 'react-dom'

export default class Img extends Component {
	
	componentDidMount(e){ 
		var el = ReactDOM.findDOMNode(this)
		this.props.updateElementPosition(el);
	}
	render(){
		let  {showImage , src , placeholder , style , alt , placeholderW , placeholderH} = this.props;
		let img = showImage ? src : placeholder ;
	    return (
	      <img 
	      	className="tnt-lady-load"
	      	style={style}
	      	width={showImage ? null : placeholderW}
	      	height={showImage ? null : placeholderH}
	      	alt={alt}
	      	src={img} 
	      />
	    );
	}
}

Img.propTypes = {
	updateElementPosition : PropTypes.func,
    style: PropTypes.object,
    showImage: PropTypes.bool,
    src: PropTypes.string,
    placeholder: PropTypes.string,
    alt : PropTypes.string
}
