/*
* @Author: wj77998
* @Date:   2017-03-13 10:48:43
* @Email:  wj77998@qq.com
* @Last Modified by:   wj77998
* @Last Modified time: 2017-03-17 15:23:33
*/

'use strict';
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import SelectItem from './SelectItem'
function noop (){}

export default class TntSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen : this.props.isOpen
    }
    this.result = [];
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onClose = this.onClose.bind(this);
    this.renderSelectItem = this.renderSelectItem.bind(this);
    this.setCacheResult = this.setCacheResult.bind(this);
    this.show = this.show.bind(this);
  }
  onChange(val,index,key){
    this.result[key] = {
      value : val,
      key : index
    }
    this.props.onChange(val,index,key);
  }
  onSelect(){
    this.unprev();
    this.props.onSelect(this.result);
    this.setState({
      isOpen:false
    });
    this.result = [];
  }
  prev(){
    document.body.style.overflow = "hidden"
  }
  unprev(){
    document.body.style.overflow = "auto"
  }
  onClose(){
    this.unprev();
    this.setState({
      isOpen:false
    });
    this.result = [];
    this.props.onClose();
    
  }
  show(){
    this.prev();
    this.setCacheResult();
    this.setState({
      isOpen:true
    });
  }
  componentDidUpdate(){
    this.setCacheResult();
  }
  setCacheResult(){
    const { defaultData , defaultValues} = this.props;
    for(let i = 0 , len = defaultData.length ; i < len ; i++){
      for(let s = 0 , _len = defaultData[i].length; s < _len ; s++){
          if(defaultData[i][s] === defaultValues[i]){
            this.result[i] = {
              value : defaultData[i][s],
              key : s
            }
          }
      }
      if(typeof this.result[i] == "undefined"){
        this.result[i] = {
          value : defaultData[i][0],
          key : 0
        }
      }
    }
  }
  componentDidMount(){
    this.setCacheResult();
  }
  renderSelectItem(){
    const { prefixCls , defaultData , defaultValues} = this.props;
    const { onChange } = this;
    const itemLists = [];
      for(let i = 0 , len = defaultData.length ; i < len ; i++){
        if(defaultData[i] && defaultData[i].length > 0){
          itemLists.push(
            <SelectItem 
              index={i}
              key={`item.${i}`}
              prefixCls={prefixCls}
              defaultData={defaultData[i]}
              defaultValue={defaultValues[i] || ""} 
              onChange={onChange}
            />  
          )
        }else{
          itemLists.push(null);
        }
      }
      return itemLists
  }
  render () {
      const { isOpen } = this.state;
      const { style , className , prefixCls , theme , buttons , defaultData , defaultValues} = this.props;
      const { onClose , renderSelectItem , onSelect , prev} = this;
      const showClass = isOpen ? "show" : "hide";
      isOpen && prev()
      return (
          <div
            style={style}
            className={classnames(prefixCls,className,`${prefixCls}-${showClass}`)}
          >
            <div className={classnames(`${prefixCls}-content`,`${prefixCls}-${theme}`)}>
                <div className={`${prefixCls}-body`}>
                  { renderSelectItem() }
                  
                </div>
                <div className={`${prefixCls}-navbar`}>
                  <a
                    onClick={onSelect}
                    className={`${prefixCls}-btn`}
                    href="javascript:;">{buttons[0]}</a>
                  <a
                    onClick={onClose}
                    className={`${prefixCls}-btn`}
                    href="javascript:;">{buttons[1]}</a>
                </div>
            </div>
            <div 
              className={`${prefixCls}-mask`}
              onClick={onClose}
            ></div>
          </div>
      )
  }
}

TntSelect.defaultProps = {
  style: {},
  prefixCls: 'tnt-select',
  onChange: noop,
  onClose : noop,
  onSelect : noop,
  className: '',
  theme : "default", 
  isOpen : false,
  defaultValues : [],
  defaultData : [],
  buttons : ["确定","取消"]
}

TntSelect.propTypes = {
  defaultData : PropTypes.array, //列表值
  defaultValues : PropTypes.array, //默认值
  buttons : PropTypes.array,//按钮文字
  theme : PropTypes.string,//主题样式
  prefixCls :  PropTypes.string,//样式前缀
  onChange: PropTypes.func, //滑动之后的事件
  onClose : PropTypes.func, //点击取消事件
  onSelect : PropTypes.func, //点击确定事件
  className: PropTypes.string,//额外类名
  style: PropTypes.object,//最外层style
  isOpen : PropTypes.bool //是否显示
}


