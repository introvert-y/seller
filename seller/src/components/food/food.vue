<template>
	<transition name="slide">
		<div class="food" v-show="showFlag" ref="food">
		   <div class="food-content" ref="foodList">
		   	  <div class="image-header">
		   	 	 <img :src="food.image">
		   	 	 <div class="back" @click="hide">
		   	 	 	<i class="icon-arrow_lift"></i>
		   	 	 </div>	   	 	 
		   	  </div>
		   	  <div class="content">
		   	  	 <h1 class="title">{{food.name}}</h1>
		   	  	 <div class="detail">
		   	  		<span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
		   	  	 </div>
                 <div class="price">
	   				<span class="now">￥{{food.price}}</span><span class='old' v-show="food.oldPrice">￥{{food.oldPrice}}</span>
	   			 </div>
	   			 <div class="cartcontrol-wrapper">
		   	  	    <cartcontrol :food="food" v-on:get-dom="addCount"></cartcontrol> 
		   	     </div>
		   	     <transition name="fade">
		   	     <div class="buy" v-show="!food.count||food.count===0" @click="addFood()">加入购物车</div>		   	  	
		   	     </transition>
		   	  </div>
		   	  <split v-show="food.info"></split>
		   	  <div class="info">
		   	  	<h1 class="title">商品信息</h1>
		   	  	<p class="text" v-show="food.info">{{food.info}}</p>
		   	  </div>
		   	  <split></split>
		   	  <div class="rating">
		   	  	 <h1 class="title">商品评价</h1>
		   	  	 <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" v-on:rating-type-select="ratingTypeSelect" v-on:rating-content-toggle="ratingContentToggle"></ratingselect>
		   	  </div>
		   	  <div class="rating-wrapper">
		   	  	 <ul v-show="foodRatingFlag">
		   	  		<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
		   	  			<div class="user">
		   	  				<span class="name">{{rating.username}}</span>
		   	  				<img :src="rating.avatar" width="12" height="12" class="avatar">
		   	  			</div>
		   	  			<div class="time">{{rating.rateTime| formatDate}}</div>
		   	  			<p class="text">
		   	  				<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
		   	  			</p>
		   	  		</li>
		   	     </ul>
		   	     <div class="no-rating" v-show="!foodRatingFlag">暂无评价</div>
		   	  </div>
		   </div>
	    </div>
	</transition>	
</template>

<script type="text/javascript">
	import Vue from 'vue';
	import BScroll from 'better-scroll';
	import split from "../split/split.vue";
	import ratingselect from '../ratingselect/ratingselect.vue';
	import cartcontrol from '../cartcontrol/cartcontrol.vue';

	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	
	Vue.filter('formatDate',function(value){
        let date = new Date(value);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let str = year.toString()+ "/"+month.toString()+ "/"+day.toString();
        let hour = date.getHours();
        let minute = date.getUTCMinutes();
        let s = date.getUTCSeconds()
        let time = hour.toString()+":"+minute.toString()+":"+s.toString();
        let total = str+" "+time;

	  	return total;
	  	
	  })
	export default{ 
       props:{
       	 food:{
       	 	type:Object
       	 }
       },
       data(){
       	 return{
       		showFlag:false,
       		selectType:ALL,
       		onlyContent:true,
       		desc:{
       			all:'全部',
       			positive:'推荐',
       			negative:'吐嘈'
       		}
       	 }
       },
       methods:{
         show(){
       		this.showFlag = true;
       		this.selectType = ALL;
       		this.onlyContent = true;
       		this.$nextTick(()=>{
       			if(!this.scroll){
       				this.scroll = new BScroll(this.$refs.food,{
       					click:true
       				})
       			}else{
       				this.scroll.refresh();
       			}
       		})
       	 },
       	 hide(){
       	 	this.showFlag = false;
       	 },
       	 addFood(){
            Vue.set(this.food,'count',1);
            this.$emit('get-dom',event.target);
       	 },
       	 addCount(){
       	 	this.$emit('get-dom',event.target);
       	 },
       	 needShow(type,text){
            if(this.onlyContent&&!text){
            	return false;
            }
            if(this.selectType === ALL){
                return true;
            }else{
            	return type===this.selectType;
            }
       	 },
       	 ratingTypeSelect(type){ 
       	   this.selectType = type;	
       	   this.$nextTick(()=>{
       	   	 this.scroll.refresh();
       	   })  	 	       	 	  	 	
       	 },
       	 ratingContentToggle(judgeOnlyContent){
             this.onlyContent = judgeOnlyContent;
             this.$nextTick(()=>{
       	   	   this.scroll.refresh();
       	   }) 
       	 }
         
       },
       // filters:{
       //    formatDate(time){
       //       let date = new Date(time);
       //       let dateTime = date.toLocaleString();
       //       console.log(dateTime);
       //       //toLocaleString( );获取日期与时间
       //       return dateTime;
       //    }
       // },
       computed:{
       	 foodRatingFlag(){
       	 	return (this.food.ratings)&&(this.food.ratings.length);
       	 }

       },
       components:{
       	 cartcontrol,
       	 split,
       	 ratingselect
       }
	}
</script>

<style>
.food{
	position: fixed;
	left:0;
	top:0;
	bottom: 48px;
	z-index:30;
	width:100%;
	background:#fff;
}

.fade-leave-active,.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to,.fade-enter{
  transform: translateX(100%);	
  opacity: 0;
}
.slide-leave-active,.slide-enter-active {
  transition: all 0.8s linear;
}

.slide-leave-to,.slide-enter{
  transform: translate3d(100%,0,0);
}

.food .food-content .image-header{
	/*图片的高度跟屏幕一致*/
	position: relative;
	width: 100%;
	height: 0;
	padding-top: 100%;
	/*这时候padding-top:100%是相对于width的宽度的*/
}
.food .food-content .image-header img{
	position: absolute;
	top:0;
	left:0;
	width:100%;
	height: 100%;
}
.food .food-content .image-header .back{
	position: absolute;
	top:10px;
	left:0;
}
.food .food-content .image-header .back .icon-arrow_lift{
	display: block;
	padding: 10px;
    font-size: 20px;
    color:#fff;
}

.food .food-content .content{padding: 18px;position: relative;}

.food .food-content .content .title{
	line-height: 14px;
	margin-bottom: 8px;
	font-size: 14px;
	font-weight: 700;
	color:rgb(7,17,27);
}
.food .food-content .content .detail{
	margin-bottom: 18px;
	line-height: 10px;
	height: 10px;
	font-size: 0;
}
.food .food-content .content .sell-count,.rating{
   font-size: 10px;
   color:rgb(147,153,159);
}
.food .food-content .content .sell-count{margin-right: 12px;}
.food .food-content .content .price{
	font-weight: 700;
	line-height: 24px;
}
.food .food-content .content .price .now{
	margin-right: 8px;
	font-size: 14px;
	color:rgb(240,20,20);
}
.food .food-content .content .price .old{
	text-decoration: line-through;
	font-size: 10px;
	color:rgb(147,153,159);
}
.food .food-content .cartcontrol-wrapper{
	position: absolute;
	right:12px;
	bottom: 12px;
}
.food .food-content .buy{
	position: absolute;
	right:18px;
	bottom:18px;
	z-index: 40;
	height: 24px;
	line-height: 24px;
	padding: 0 12px;
	box-sizing: border-box;
	font-size: 10px;
	border-radius: 12px;
	color:#fff;
	background: rgb(0,160,220)
}

.food .food-content .info{padding: 18px;}

.food .food-content .info .title{
	line-height: 14px;
	margin-bottom: 6px;
	font-weight: 700;
	font-size: 14px;
	color:rgb(7,17,27);
}
.food .food-content .info .text{
	line-height: 24px;
	padding:0 8px;
	font-size: 12px;
	color:rgb(77,85,93);
}
.food .food-content .rating{padding-top:18px;}
.food .food-content .rating .title{
	line-height: 14px;
	margin-left: 18px;
	font-weight: 700;
	font-size: 14px;
	color:rgb(7,17,27);	
}
.food .food-content .rating-wrapper{
	padding: 0 18px;
}
.food .food-content .rating-wrapper .rating-item{
	position: relative;
	padding: 16px 0;
}
.food .food-content .rating-wrapper .rating-item:after{
  display: block;
  position: absolute;
  width:100%;
  left:0px;
  bottom: 0px;
  border-top: 1px solid rgba(7,17,27,0.1);
  content:'';
}
.food .food-content .rating-wrapper .user{
	position: absolute;
	right:0;
	top:16px;
	font-size: 0;
	line-height: 12px;
}

.food .food-content .rating-wrapper .user .name{
	display: inline-block;
	vertical-align: top;
	margin-right: 6px;
	font-size: 10px;
	color:rgb(147,153,159);
}
.food .food-content .rating-wrapper .user .avatar{
	border-radius: 50%;
}

.food .food-content .rating-wrapper .time{
	margin-bottom:6px;
	line-height: 12px;
	font-size: 10px;
	color:rgb(147,153,159);
}
.food .food-content .rating-wrapper .text{
	line-height: 16px;
	font-size: 12px;
	color:rgb(7,17,27);
}
.food .food-content .rating-wrapper .text .icon-thumb_up,.icon-thumb_down{
	margin-right: 4px;
    line-height: 16px;
    font-size: 12px;

}
.food .food-content .rating-wrapper .text .icon-thumb_up{
	color:rgb(0,160,220);
}
.food .food-content .rating-wrapper .text .icon-thumb_down{
	color:rgb(7,17,27);
}

.food .food-content .rating-wrapper .no-rating{
	padding: 16px 0;
	font-size: 12px;
	color:rgb(147,153,159);
}
</style>