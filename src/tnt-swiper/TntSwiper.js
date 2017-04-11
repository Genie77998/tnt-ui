/*
* @Author: wj77998
* @Date:   2017-03-13 10:48:43
* @Email:  wj77998@qq.com
* @Last Modified by:   wj77998
* @Last Modified time: 2017-03-17 15:58:42
*/

'use strict';
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Swipe from './swipe'
import objectAssign from 'object-assign'
import classnames from 'classnames'

function noop (){}

export default class TntSwiper extends Component {
	constructor (props) {
		super(props)
		this.state = {
			images : this.props.images || [],
			activeIndex : this.props.startSlide || 0,
			style: {
		      container: {
		        overflow: 'hidden',
		        visibility: 'hidden',
		        position: 'relative'
		      },

		      wrapper: {
		        overflow: 'hidden',
		        position: 'relative'
		      },

		      child: {
		        float: 'left',
		        width: '100%',
		        position: 'relative',
		        transitionProperty: 'transform'
		      }
		    }
		}
		this.sliderTo = this.sliderTo.bind(this);
		this.onClick = this.onClick.bind(this);
		this.setPagination = this.setPagination.bind(this);
	}
	componentDidMount(){
		const el = ReactDOM.findDOMNode(this);
		const {images,...options} = this.props;
		this.swipe = Swipe(el, {
			startSlide : options.startSlide,
			speed : options.speed,
			continuous : images.length >=3 ? options.loop : false, 
			disableScroll : options.disableScroll,
			stopPropagation : options.stopPropagation,
			callback : options.onChange,
			transitionEnd : (index,elem) => {
				this.setState({
					activeIndex : index
				})
				options.transitionEnd(index,elem)
			},
			swiping : options.swiping,
			auto : options.auto
		});
	}
	/**
	 *     滑动到底几张
	 *     @author wj77998
	 *     @date   2017-03-13
	 *     @param  {[number]}   index    [索引]
	 *     @param  {[number]}   duration [速度]
	 */
	sliderTo(index, duration){
		const _len = this.swipe.getNumSlides()
		if(index < _len){
			this.swipe.slide(index, duration);
		}
	}
	onClick(){
		this.props.onClick(this.swipe.getPos())
	}
	setPagination(){//设置分页器
		const {images,activeIndex,style} = this.state
  		const {className ,prefixCls , pagination , paginationType } = this.props
		let paginationEl = null;
		if(paginationType === 'fraction'){//分式
  			let fraction = [];
  			fraction.push(
  				<span 
  					key='fraction-active'
  					className={`${prefixCls}-pagination-active`}
  				>
  					{ activeIndex+1 }
  				</span>
  			);
  			fraction.push(
  				<span 
  					key='fraction-split'
  				>
  					/
  				</span>
  			);
  			fraction.push(
  				<span 
  					key='fraction-total' 
  					className={`${prefixCls}-pagination-total`}
  				>
  					{images.length}
  				</span>
  			);
  			paginationEl = <div className={`${prefixCls}-pagination ${prefixCls}-pagination-fraction`}>{fraction}</div>;
  		}else if(paginationType === "progress"){//进度条
  			let _pro = (activeIndex+1)/images.length;
  			let progressStyle = {
  				transform: `translate3d(0px, 0px, 0px) scaleX(${_pro}) scaleY(1)`,
    			transitionDuration: '300ms'
  			}
  			let progress = <span 
  				className={`${prefixCls}-pagination-progressbar`}
  				style={progressStyle}
  				>
  				</span>
  			paginationEl = <div className={`${prefixCls}-pagination ${prefixCls}-pagination-progress`}>{progress}</div>;
  		}else{//原点
  			const bullets = [];
  			for(let i = 0 , len = images.length ; i < len ; i++){
  				let activeClassName = '';
  				if(i == activeIndex){
  					activeClassName = `${prefixCls}-pagination-pagination-bullet-active`;
  				}
	  			bullets.push(
	  				<span 
	  					className={classnames(`${prefixCls}-pagination-pagination-bullet`,activeClassName)}
	  					key={`bullet-${i}`}
	  				>
	  				</span>
	  			)
	  		}
  			paginationEl = <div className={`${prefixCls}-pagination ${prefixCls}-pagination-bullets`}>{bullets}</div>;
  		}
  		return paginationEl
	}
  	render () {
  		const {images,activeIndex,style} = this.state
  		const {className ,prefixCls , pagination , paginationType } = this.props
  		const { onClick , sliderTo , setPagination } = this
  		const _style = this.props.style;
  		const child = []

  		for(let i = 0 , len = images.length ; i < len ; i++){
  			child.push(
  				<div
  					style={style.child}
  					key={`swipe-${i}`}
  				>
  				<span
  					className={`${prefixCls}-sildel`}
  				>
  					{images[i].component ? images[i].component : images[i].src ? <img src={images[i].src}/>  : null}
  				</span>
  				</div>
  			)
  		}
  		

	    return (
	    	images.length > 0 
	    	? 
		    	<div
		    		className = {classnames(`${prefixCls} ${className}`)}
		    		style={objectAssign(style.container,_style)}
		    		onClick={onClick}
		    	>
			        <div 
			        	style={style.wrapper}
			        >
				        { child }
			        </div>
			        { pagination ?  setPagination() : null}
			    </div>
		    :
		    null
	    )
	}
}

TntSwiper.defaultProps = {
	style: {},
	pagination : true,
	paginationType : 'bullets',
	prefixCls: 'tnt-swiper',
	auto : 7000,
	speed : 300,
	onChange: noop,
	onClick : noop,
	transitionEnd: noop,
	disableScroll:false,
	stopPropagation:true,
	swiping: noop,
	images : [],
	loop : true,
	startSlide : 0,
	className: ''
}

TntSwiper.propTypes = {
	pagination : PropTypes.bool,//是否显示分页器
	paginationType : PropTypes.string,//分页器样式  bullets  圆点（默认） fraction  分式 progress 进度条
	startSlide : PropTypes.number, //开始项
	onChange: PropTypes.func, //滑动之后的事件
	onClick: PropTypes.func, //点击事件
	className: PropTypes.string,//额外类名
	transitionEnd : PropTypes.func,//在结束幻灯片过渡动画之后
	swiping : PropTypes.func,//滑动过程中事件
	images: PropTypes.array.isRequired,//图片
	style: PropTypes.object,//最外层style
	speed : PropTypes.number,//切换速度
	auto : PropTypes.number, //自动播放速度
	prefixCls: PropTypes.string, //类名前缀
	loop : PropTypes.bool,//是否无限滚动
	disableScroll : PropTypes.bool,//停止滚动
	stopPropagation : PropTypes.bool//阻止事件冒泡
}
