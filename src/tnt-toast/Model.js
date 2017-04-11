/*
* @Author: wj77998
* @Date:   2017-03-09 15:26:24
* @Email:  wj77998@qq.com
* @Last Modified by:   wj77998
* @Last Modified time: 2017-03-21 18:18:51
*/

'use strict';

import React, { Component } from 'react'
import classnames from 'classnames'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      prefixCls : 'tnt-toast',//样式前缀
      timer : 0,
      icon : "", //图标
      className:"enter hide",
      msg : '', //消息
      style : {},//样式
    }
    this.showMsg = this.showMsg.bind(this);
    this.hide = this.hide.bind(this);
  }
  hide(){
    let { timer } = this.state;
    clearTimeout(timer);
    this.setState({
      className : "enter hide"
    });
  }
  showMsg (opt) {
   	let { msg , duration , style , icon , animation ,autoClose} = opt;
   	let time = null;
   	const { timer } = this.state;
   	clearTimeout(timer);
   	duration = duration || 1500;
    if(autoClose !== false){
      time = setTimeout(() => {
        this.setState({
          className : "enter"
        });
        setTimeout(() => {
          let _cls = this.state.className;
          if(_cls === "enter"){
            this.setState({
              className : "enter hide"
            });
          }
        },500);
      },duration);
    }
   	
   	this.setState({
   		msg,
      animation : (typeof animation != "undefined" && animation.constructor == Boolean) ? animation : false ,
      icon : icon || "",
   		style : style || {},
   		timer : time,
   		className : ""
   	});
  }

  addPrefix(cls){
  	const { prefixCls } = this.state;
  	let _cls = "";
  	if(cls && cls.split(' ').length > 0){
  		let __cls = cls.split(' ');
  		let ___cls = [];
  		for(let i = 0 ,len = __cls.length; i < len ; i++){
  			if(typeof __cls[i] == "string" && __cls[i] != ""){
  				___cls.push(`${prefixCls}-${__cls[i]}`)
  			}
  		}
  		_cls = ___cls.join(" ");
  	}
  	return _cls;
  }

  render () {
  	const { msg , type , style  , prefixCls , className , icon , animation} = this.state;
  	const _className = this.addPrefix(className); 
    return (
    	<div 
    		className={classnames(prefixCls,_className)}
    		style={style}
    	>
    		<div className={`${prefixCls}-text`}>
          { 
            icon 
            ? 
            <span
              className={classnames(`${prefixCls}-icon`, animation ? `${prefixCls}-icon-animation` : null)}
            >
              <img src={icon} />
            </span>
            :
            null
          }
          { msg }
    		</div>
    	</div>
    )
  }
}
