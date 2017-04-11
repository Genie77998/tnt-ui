/*
 * @Author: wj77998
 * @Date:   2017-03-01 15:26:44
 * @Email:  wj77998@qq.com
 * @Last Modified by:   wj77998
 * @Last Modified time: 2017-03-21 18:38:49
 */


import React, { PropTypes } from 'react'
import Model from './Model'
import ReactDOM from 'react-dom'


const div = document.createElement('div')
document.body.appendChild(div)
const container = ReactDOM.render(<Model />, div);

let TntToast = function(opt){
  opt = opt || {};
  if(opt.msg){
    container.showMsg(opt)
  }
}


TntToast.hide = function(){
	container.hide()
}


export default TntToast;
