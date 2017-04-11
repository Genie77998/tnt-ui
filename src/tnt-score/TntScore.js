/*
 * @Author: wj77998
 * @Date:   2017-03-01 15:26:44
 * @Email:  wj77998@qq.com
 * @Last Modified by:   wj77998
 * @Last Modified time: 2017-04-11 15:29:05
 */
'use strict';
import React, { PropTypes , Component } from 'react'
import classNames from 'classnames'
import Star from './Star'


function noop() {}

export default class TntScore extends Component {
    constructor(props) {
        super(props);
        let value = this.props.value;
        if (value === undefined) {
            value = this.props.defaultValue;
        }
        this.state =  {
            value,
        }
        this.getStarValue = this.getStarValue.bind(this);
        this.onHover = this.onHover.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    getStarValue(val,index){
      if (this.props.allowHalf) {
        if(index == 1){
          return val - 0.5
        }else{
          return val
        }
      }
      return val
    }

    onHover(event, index) {
      const _index = event.target.getAttribute("data-index");
      const hoverValue = this.getStarValue(index,_index);
      this.setState({
        hoverValue,
      });
      this.props.onHoverChange(hoverValue);
    }

    onClick(event, index) {
      const _index = event.target.getAttribute("data-index");
      const value = this.getStarValue(index,_index);
      const disabled = true;
      if (!('value' in this.props)) {
        this.setState({
          value,
        });
      }
      this.onMouseLeave();
      this.props.onChange(value);
    }

    onMouseLeave() {
      this.setState({
        hoverValue: undefined,
      });
      this.props.onHoverChange(undefined);
    }

    render() {

        const { count, allowHalf, style, prefixCls, className , disabled } = this.props;
        const { value, hoverValue } = this.state;
        const { onClick , onHover , onMouseLeave } = this;
        const disabledClass = disabled ? `${prefixCls}-disabled` : '';
        let stars = [];
        let _val = hoverValue === undefined ? value : hoverValue;
        let _cval = _val;
        for (let index = 1; index <= count; index++) {
            let _cls = "";
            if (_cval >= 1) {
                _cls = `${prefixCls}-full`
            } else if (0 < _cval && _cval < 1) {
                _cls = allowHalf ? `${prefixCls}-half` : `${prefixCls}-full`
            } else {
                _cls = `${prefixCls}-gary`
            }
            stars.push( 
              <Star  
                onClick={ onClick }
                onHover={ onHover }
                ref = { `star_${index}` }
                index = { index }
                key = {index}
                className = { _cls }
                prefixCls = { prefixCls }
                value = { _val }
                disabled = { disabled }
                allowHalf = { allowHalf } 
                />
            );
            _cval--;
        }

        return ( 
          <ul 
            className={classNames(prefixCls, className, disabledClass)}
            style={style}
            onMouseLeave={disabled ? null : onMouseLeave } 
          >
            { stars } 
          </ul>
        );
    }
}



TntScore.defaultProps = {
    defaultValue: 0,
    count: 5,
    style: {},
    prefixCls: 'tnt-score',
    onChange: noop,
    onHoverChange: noop,
    className: ''
}

TntScore.propTypes = {
    disabled: PropTypes.bool, //只读
    defaultValue: PropTypes.number, //默认值
    count: PropTypes.number, //个数
    allowHalf: PropTypes.bool, //是否允许半颗
    style: PropTypes.object, //最外层style
    prefixCls: PropTypes.string, //类名前缀
    onChange: PropTypes.func, //改变之后事件
    onHoverChange: PropTypes.func, //鼠标经过事件
    className: PropTypes.string //额外类名
}
