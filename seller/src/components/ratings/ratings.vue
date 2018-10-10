<template>
  <div class="ratings" ref="dom">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings" v-on:rating-type-select="ratingTypeSelect" v-on:rating-content-toggle="ratingContentToggle"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star class="star" :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
	import Vue from 'vue';
	import star from '../star/star.vue';
	import split from '../split/split.vue';
	import BScroll from 'better-scroll';
	import ratingselect from '../ratingselect/ratingselect.vue';

    const ERR_OK = 0;
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
      	seller:{
      	   type:Object
      	}
      },
      data(){
         return{
         	ratings:[],
       		selectType:ALL,
       		onlyContent:true,
       		desc:{
       			all:'全部',
       			positive:'满意',
       			negative:'不满意'
       		}
         }
      },
	  created(){
	    this.$http.get('/api/ratings').then(function(res){
	      if(res.body.errno===ERR_OK){
	        this.ratings = res.body.data;
	        this.$nextTick(()=>{
	        	this.ratingScroll = new BScroll(this.$refs.dom,{
	        		click:true
	        	});
	        });
	      }
	    })
	  },
	  methods:{
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
      components:{
      	star,
      	split,
      	ratingselect
      }
	}
</script>

<style>
.ratings{
	position: absolute;
	top:174px;
	bottom: 0px;
	width:100%;
	overflow: hidden;
}
.ratings .overview{
	display: flex;
	padding: 18px 0;
}
.ratings .overview .overview-left{
	flex:0 0 137px;
	width:137px;
	border-right: 1px solid rgba(7,17,27,0.1);
	text-align: center;
	padding: 6px 0;
}
.ratings .overview .overview-left .score{
	line-height: 28px;
	font-size: 24px;
	color:rgb(255,153,0);
	margin-bottom: 6px;
}
.ratings .overview .overview-left .title{
    line-height: 12px;
    font-size: 12px;
    color:rgb(7,17,27);
    margin-bottom: 8px;
}
.ratings .overview .overview-left .rank{
	line-height: 10px;
	font-size: 10px;
	color:rgb(147,153,159);
}
.ratings .overview .overview-right{
	flex:1;
	padding:6px 0 6px 24px;

}
.ratings .overview-right .score-wrapper{
	margin-bottom: 8px;
	font-size: 0px;
}
.ratings .overview-right .score-wrapper .title{
	display: inline-block;
	line-height: 18px;
	font-size: 12px;
	color:rgb(7,17,27);
}
.ratings .overview-right .score-wrapper .star{
	display: inline-block;
	vertical-align: top;
	margin:0 12px;
}
.ratings .overview-right .score-wrapper .score{
	display: inline-block;
	line-height: 18px;
	vertical-align: top;
	color:rgb(255,153,0);
	font-size: 12px;
}
.ratings .overview-right .delivery-wrapper{
	font-size: 0;

}
.ratings .overview-right .delivery-wrapper .title{
	line-height: 18px;
	font-size: 12px;
	color:rgb(7,17,27);
}
.ratings .overview-right .delivery-wrapper .delivery{
	font-size: 12px;
	line-height: 18px;
	color:rgb(147,153,159);
	margin-left: 12px;
}
.ratings .rating-wrapper{
	padding:0 18px;
}

.ratings .rating-wrapper .rating-item{
	display: flex;
	position: relative;
	padding:18px 0;
}
.ratings .rating-wrapper .rating-item:after{
  display: block;
  position: absolute;
  width:100%;
  left:0px;
  bottom: 0px;
  border-top: 1px solid rgba(7,17,27,0.1);
  content:'';
}

.ratings .rating-wrapper .rating-item .avatar{
	flex:0 0 28px;
	width:28px;
	margin-right: 12px;
}
.ratings .rating-wrapper .rating-item .avatar img{
	border-radius: 50%;
}

.ratings .rating-wrapper .rating-item .content{
	position: relative;
	flex:1;
}
.ratings .rating-wrapper .rating-item .content .name{
	margin-bottom: 4px;
	line-height: 12px;
	font-size: 10px;
	color:rgb(7,17,27);
}

.ratings .rating-wrapper .rating-item .star-wrapper{
	margin-bottom: 6px;
	font-size: 0;
}
.ratings .rating-wrapper .rating-item .star-wrapper .star{
	display: inline-block;
	margin-right: 6px;
	vertical-align: top;
	line-height: 12px;
}

.ratings .rating-wrapper .rating-item .star-wrapper .delivery{
	display: inline-block;
	margin-right: 6px;
	font-size: 10px;
	color:rgb(147,153,159);
	font-weight: 200;
	line-height: 12px;

}
.ratings .rating-wrapper .rating-item .text{
	margin-bottom: 8px;
    line-height: 18px;
    color: rgb(7, 17, 27);
    font-size: 12px;
}
.ratings .rating-wrapper .rating-item .recommend{
	line-height: 16px;
	font-size: 0;
}
.ratings .rating-wrapper .rating-item .recommend .icon-thumb_up,.item{
    display: inline-block;
    margin: 0 8px 4px 0;
    font-size: 9px;
}
.ratings .rating-wrapper .rating-item .recommend .icon-thumb_up{
	color: rgb(0, 160, 220)
}
.ratings .rating-wrapper .rating-item .recommend .item{
	padding: 0 6px;
	border: 1px solid rgba(7, 17, 27, 0.1);
	border-radius: 1px;
	color: rgb(147, 153, 159);
	background: #fff;
}
.ratings .rating-wrapper .rating-item .time{
	position: absolute;
    top: 0;
    right: 0;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
}
</style>