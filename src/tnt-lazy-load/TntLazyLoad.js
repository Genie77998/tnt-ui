/*
 * @Author: wj77998
 * @Date:   2017-03-01 15:26:44
 * @Email:  wj77998@qq.com
 * @Last Modified by:   wj77998
 * @Last Modified time: 2017-04-11 15:31:25
 */

'use strict';
import React, { PropTypes ,Component} from 'react'
import Img from "./img"

function noop() {}

function inView(element, view) {
    var box = element.getBoundingClientRect();
    return (box.right >= view.l && box.bottom >= view.t && box.left <= view.r && box.top <= view.b);
}

function optionToInt(opt, fallback) {
  return parseInt(opt || fallback, 10);
}
export default class TntLazyLoad extends Component {
    constructor(props) {
        super(props);
        let src = props.src;
        if (src === undefined) {
            src = props.src;
        }
        this.state =  {
            element:{},
            src,
            showImage : false
        }
        this.updateViewport = this.updateViewport.bind(this);
        this.updateElementPosition = this.updateElementPosition.bind(this);
        this.removeEventListener = this.removeEventListener.bind(this);
    }
    componentWillMount(){
      window.addEventListener('scroll', this.updateViewport, false);
      window.addEventListener('resize', this.updateViewport, false);
      this.updateViewport();
    }
    updateElementPosition(element){ 
      this.setState({
        element : element
      });
      this.updateViewport(element);
    }
    removeEventListener(){
      window.removeEventListener('scroll', this.updateViewport);
      window.removeEventListener('resize', this.updateViewport);
    }
    componentWillUnmount() {
      this.removeEventListener();
    }
    updateViewport(ele){
      let { showImage , element } = this.state;
      let { offset , ...other} = this.props;
      if(!showImage && (element.nodeType == 1 || (ele && ele.nodeType == 1)) ){
        if(ele && ele.nodeType == 1){
          element = ele
        } 
        const offsetAll = offset || 0;
        const offsetVertical = other.offsetVertical || offsetAll;
        const offsetHorizontal = other.offsetHorizontal || offsetAll;
        const offsetEl = {
          t: optionToInt(other.offsetTop, offsetVertical),
          b: optionToInt(other.offsetBottom, offsetVertical),
          l: optionToInt(other.offsetLeft, offsetHorizontal),
          r: optionToInt(other.offsetRight, offsetHorizontal)
        };
        const view = {
          l: 0 - offsetEl.l,
          t: 0 - offsetEl.t,
          b: (window.innerHeight || document.documentElement.clientHeight) + offsetEl.b,
          r: (window.innerWidth || document.documentElement.clientWidth) + offsetEl.r
        };
        if ( inView(element , view) ) {
          this.setState({
            showImage : true
          });
          this.props.onChange(element);
          this.removeEventListener();
        }
      }
    }
    render() {
        const { src , showImage } = this.state;
        const { placeholder , alt , style , placeholderW , placeholderH} = this.props;
        const { updateElementPosition } = this;
        return ( 
          <Img 
            updateElementPosition = {updateElementPosition}
            placeholderW = {placeholderW}
            placeholderH = {placeholderH}
            style = {style}
            src = {src} 
            showImage = {showImage}
            placeholder = {placeholder}
            alt = {alt}
          /> 
        );
    }
}


TntLazyLoad.defaultProps = {
    offset: 100,
    alt : "",
    style : {},
    onChange : noop,
    placeholderW : 100,
    placeholderH : 100,
    placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQDAwMDAgQDAwMEBAQFBgoGBgUFBgwICQcKDgwPDg4MDQ0PERYTDxAVEQ0NExoTFRcYGRkZDxIbHRsYHRYYGRj/2wBDAQQEBAYFBgsGBgsYEA0QGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBj/wgARCAABAAEDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACP/EABUBAQEAAAAAAAAAAAAAAAAAAAME/9oADAMBAAIQAxAAAABeHZ//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/AH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AH//2Q=='        
}

TntLazyLoad.propTypes = {
    offset : PropTypes.number, //触发距离
    placeholder: PropTypes.string, //默认显示图片
    src: PropTypes.string, //图片地址
    style : PropTypes.object, //图片样式
    alt : PropTypes.string, //图片描述
    onChange : PropTypes.func //替换图片回调
}
