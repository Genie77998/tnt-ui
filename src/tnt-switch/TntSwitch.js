/*
 * @Author: wj77998
 * @Date:   2017-03-01 15:26:44
 * @Email:  wj77998@qq.com
 * @Last Modified by:   wj77998
 * @Last Modified time: 2017-04-11 15:34:35
 */

'use strict';
import React, { PropTypes , Component } from 'react'
import classNames from 'classnames'

const noop = function() {}

export default class TntSwitch extends Component {
    constructor(props) {
        super(props);
        let value = this.props.value;
        if (value === undefined) {
            value = this.props.defaultValue;
        }
        this.state = {
            value,
        }
        this.onClick = this.onClick.bind(this);
    }


    onClick(){
      const value = this.state.value;
      this.setState({
        value : !value,
      });
      this.props.onChange(!value);
    }

    render() {
        const { style, prefixCls, className ,checkedTxt , uncheckedTxt , disabled} = this.props; 
        const { value } = this.state;
        const { onClick } = this;
        const disabledClass = disabled ? `${prefixCls}-disabled` : '';
        const text = value ? checkedTxt : uncheckedTxt;
        const checkClass = value ? `${prefixCls}-checked` : "";
        return ( 
          <span
            style={style}
            className={classNames(prefixCls, className, checkClass , disabledClass)}
            onClick={disabled ? null : onClick}
          >
                <span className="tnt-switch-inner">
                  { text }
                </span>
          </span>
        );
    }
}

TntSwitch.defaultProps = {
    defaultValue: false,
    style: {},
    prefixCls: 'tnt-switch',
    onChange: noop,
    className: '',
    checkedTxt : '',
    uncheckedTxt : ''
}

TntSwitch.propTypes = {
    disabled: PropTypes.bool, //只读
    defaultValue: PropTypes.bool, //默认值
    style: PropTypes.object, //最外层style
    prefixCls: PropTypes.string, //类名前缀 
    onChange: PropTypes.func, //改变之后事件
    className: PropTypes.string, //额外类名
    checkedTxt : PropTypes.string, //选中文字
    uncheckedTxt : PropTypes.string, //未选中文字
}
