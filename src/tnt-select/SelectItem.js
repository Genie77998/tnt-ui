/*
* @Author: wj77998
* @Date:   2017-03-13 20:28:25
* @Email:  wj77998@qq.com
* @Last Modified by:   wj77998
* @Last Modified time: 2017-03-20 14:06:40
*/

'use strict';
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
function noop (){}

let ITEM_HEIGHT = 40;    // 每个元素的高度         

export default class SelectItem extends Component {
	constructor (props) {
	    super(props)
	    this.animating = false;                 // 判断是否在transition过渡动画之中
        this.itemLength = 0;                    // 元素的个数
        this.min = 0;                           //最大距离
        this.max = 0;                           //最小距离
        this.touchY = 0;                        // 保存touchstart的pageY
        this.translateY = 0;                    // 容器偏移的距离
        this.currentIndex = 0;                  // 滑动中当前元素的索引
        this.getCurrentIndex(this.props);
        this.state = {
        	defaultData : this.props.defaultData,
        	defaultValue : this.props.defaultValue,
            translateY: this.translateY
        };
        this.renderItem = this.renderItem.bind(this);
        this.handleContentTouch = this.handleContentTouch.bind(this);
        this.handleContentMouseDown = this.handleContentMouseDown.bind(this);
        this.handleContentMouseMove = this.handleContentMouseMove.bind(this);
        this.handleContentMouseUp = this.handleContentMouseUp.bind(this);
	}
	getCurrentIndex(opt){
		let currindex = 0;
		let { defaultData , defaultValue} = opt;
		this.itemLength = defaultData.length;
		defaultData.forEach(function(val,key){
			if(val === defaultValue){
				currindex = key
			}
		});
		this.max = ITEM_HEIGHT;
		this.min = - (this.itemLength) * ITEM_HEIGHT;
		this.translateY = -currindex * ITEM_HEIGHT;
		this.currentIndex = currindex;  
	}

	componentWillReceiveProps(nextProps) {
        // if (nextProps.defaultData === this.props.defaultData) {
        //     return;
        // }
        this.setState({
        	defaultData : nextProps.defaultData,
        	defaultValue : nextProps.defaultValue,
        })
        this.getCurrentIndex(nextProps);
        this.setState({
            translateY: this.translateY
        });
    }

	handleContentMouseDown(event) {
        if (this.animating) return;
        this.handleStart(event);
        document.addEventListener('mousemove', this.handleContentMouseMove);
        document.addEventListener('mouseup', this.handleContentMouseUp);
    }

    handleContentMouseMove(event) {
        if (this.animating) return;
        this.handleMove(event);
    }

    handleContentMouseUp(event) {
        if (this.animating) return;
        this.handleEnd(event);
        document.removeEventListener('mousemove', this.handleContentMouseMove);
        document.removeEventListener('mouseup', this.handleContentMouseUp);
    }


	handleContentTouch(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.animating) return;
        if (event.type === 'touchstart') {
            this.handleStart(event);
        } else if (event.type === 'touchmove') {
            this.handleMove(event);
        } else if (event.type === 'touchend') {
            this.handleEnd(event);
        }
    }
    handleStart(event) {
        this.touchY = event.pageY || event.targetTouches[0].pageY;
        this.translateY = this.state.translateY;
    }

    handleMove(event) {
        const touchY = event.pageY || event.targetTouches[0].pageY;
        const dir = touchY - this.touchY;
        const translateY = this.translateY + dir;
        const direction = dir > 0 ? -1 : 1;
        if(translateY < this.min || translateY > this.max){
        	return
        }
        if (this._checkIsUpdateDates(direction, translateY)) {
            this._updataPos(direction);
        }
        this.setState({ translateY });
    }
    _checkIsUpdateDates(direction, translateY) {
        return direction === 1 ?
            this.currentIndex * ITEM_HEIGHT + ITEM_HEIGHT / 2 < -translateY :
            this.currentIndex * ITEM_HEIGHT - ITEM_HEIGHT / 2 > -translateY;
    }
    handleEnd(event) {
        const touchY = event.pageY || event.changedTouches[0].pageY;
        const dir = touchY - this.touchY;
        const direction = dir > 0 ? -1 : 1;
        this._moveToNext(direction);
    }

    _updataPos(direction) {
        if (direction === 1) {
        	if(this.currentIndex <= this.itemLength - 2){
        		this.currentIndex ++;
        	}
        } else {
        	if(this.currentIndex >= 1){
        		this.currentIndex --;
        	}
        }
        
    }

    _moveToNext(direction) {
        const el = ReactDOM.findDOMNode(this); 
        let _currinex = Math.abs(Math.ceil(-this.state.translateY/40));
        if(_currinex >= this.itemLength - 1){
            _currinex = this.itemLength - 1
        }
        if(_currinex <= 0){
            _currinex = 0;
        }
        this._moveTo(el,_currinex);
        // if(this.translateY < this.min || this.translateY > this.max){
        //     this._updataPos(direction); 
        // }
        // this._moveTo(el, this.currentIndex);
    }

    _moveTo(obj, currentIndex) {
        this.animating = true;

        this.setState({
            translateY: -currentIndex * ITEM_HEIGHT,
        });

        setTimeout(() => {
            this.animating = false;
            this.props.onChange(this.state.defaultData[currentIndex],currentIndex,this.props.index)
        }, 200);
    }
	renderItem(value,index){
		return(
			<li
				key={index}
			>
				{value}
			</li>
		)
	}
    render () {
    	const scrollStyle = {
            transition : "-webkit-transform 0.3s ease-out",
            transform: `translate3d(0px, ${this.state.translateY}px, 0px)`
        };
      	const { prefixCls , onSelect} = this.props;
      	const { defaultData } = this.state;
	    return (
	        <div className={`${prefixCls}-items`}>
    	        <div className={`${prefixCls}-viewport`}
    	        	onTouchStart={this.handleContentTouch}
                    onTouchMove={this.handleContentTouch}
                    onTouchEnd={this.handleContentTouch}
                    onMouseDown={this.handleContentMouseDown}
    	        >
    	          	<div className={`${prefixCls}-wheel`}>
    		            <ul
    		            	style={scrollStyle}
    		            >
    		              {defaultData.map(this.renderItem)}
    		            </ul>
    	          	</div>
    	        </div>
	        </div>
      	)
  }
}


SelectItem.propTypes = {
  prefixCls :  PropTypes.string,
  defaultData : PropTypes.array,
  onChange : PropTypes.func,
  index : PropTypes.number,
  defaultValue : PropTypes.string,
}
