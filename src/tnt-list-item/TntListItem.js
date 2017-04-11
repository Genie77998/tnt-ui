/*
 * @Author: wj77998
 * @Date:   2017-03-01 15:26:44
 * @Email:  wj77998@qq.com
 * @Last Modified by:   wj77998
 * @Last Modified time: 2017-03-21 15:14:24
 */
'use strict';
import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'

const noop = function() {}

export default class TntListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { subtitle, icon, arrow, style, prefixCls, onClick, className , iconSize , ishidden , children } = this.props;
        let iconStyle = {}
        const arrowClass = arrow ? `${prefixCls}-arrow` : null;
        const ishiddenClass = ishidden ? null : `${prefixCls}-nohidden` 
        if(icon && iconSize){
          let size = [];
          try{
            size = iconSize.split('|');
          }catch(e){}
          if(size.length > 0){
            iconStyle.width = size[0];
            iconStyle.height = size[1] || size[0];
          }
        }
        return (
          <div 
            className = { classNames(prefixCls,arrowClass,ishiddenClass,className) }
            style = { style }
            onClick={onClick}
          >
            {
              icon 
              ?
              <div className = { `${prefixCls}-thumb` }>
                <img src = { icon } style = { iconStyle } />
              </div>
              :
              null 
            }
            <div className = {`${prefixCls}-content`} >{ children }</div>
            {subtitle ? <div className = {`${prefixCls}-subtitle`} >{ subtitle }</div> : null }
          </div>
        );
    }
}

TntListItem.defaultProps = {
    subtitle: "",
    icon: "",
    iconSize : "",
    ishidden:true,
    arrow: true,
    style: {},
    prefixCls: 'tnt-list-item',
    onClick: noop,
    className: ''
}

TntListItem.propTypes = {
    subtitle: PropTypes.string, //副标题
    icon: PropTypes.string, //图标
    iconSize : PropTypes.string, //图标大小  width|height
    ishidden: PropTypes.bool, //超出是否隐藏
    arrow: PropTypes.bool, //是否显示箭头
    style: PropTypes.object, //最外层style
    prefixCls: PropTypes.string, //类名前缀
    onClick: PropTypes.func, //点击事件
    className: PropTypes.string //额外类名
}
