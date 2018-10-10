<template>
  <div class="seller" ref="seller">
  	<div class="seller-content">
  	  <div class="overview">
  	  	 <h1 class="title">{{seller.name}}</h1>
  	  	 <div class="desc">
  	  		<star class="star" :size="36" :score="seller.score"></star>
  	  		<span class="text">({{seller.ratingCount}})</span>
  	  		<span class="text">月售{{seller.sellCount}}单</span>
  	  	 </div>
  	  	 <ul class="remark">
  	  		<li class="block">
  	  			<h2>起送价</h2>
  	  			<div class="content">
  	  				<span class="stress">{{seller.minPrice}}</span>元
  	  			</div>
  	  		</li>
  	  		<li class="block">
  	  			<h2>商家配送</h2>
  	  			<div class="content">
  	  				<span class="stress">{{seller.deliveryPrice}}</span>元 	  				
  	  			</div>
  	  		</li>
  	  		<li class="block">
  	  			<h2>平均配送时间</h2>
  	  			<div class="content">
  	  				<span class="stress">{{seller.deliveryTime}}</span>分钟  				
  	  			</div>
  	  		</li>
  	     </ul>
         <div class="favorite">
         	<span @click="changeFavorite" class="icon-favorite" :class="{active:favorite}"></span>
         	<span class="text">{{favoriteText}}</span>
         </div>
  	  </div>
  	  <split></split>
  	  <div class="bulletin">
  	  	<h1 class="title">公告与活动</h1>
  	  	<div class="content-wrapper">
  	  		<p class="content">{{seller.bulletin}}</p>
	    </div>
		<ul v-if="seller.supports" class="supports">
			<li class="support-item" v-for="(item,index) in seller.supports">
				<span class="icon" :class="classMap[seller.supports[index].type]"></span>
				<span class="text">{{seller.supports[index].description}}</span>
			</li>
		</ul>
  	  </div>
  	  <split></split>
  	  <div class="pics">
  	  	<h1 class="title">商家实景</h1>
  	  	<div class="pic-wrapper" ref="picWrapper">
  	  	   <ul class="pic-list" ref="picList">
  	  	   	 <li class="pic-item" v-for="pic in seller.pics">
  	  	   	 	<img :src="pic" width="120" height="90">
  	  	   	 </li>
  	  	   </ul>
  	  	</div>
  	  </div>
  	  <div class="seller-info">
  	  	<h1 class="title">商家信息</h1>
  	  	<ul>
  	  		<li class="info-item" v-for="info in seller.infos">{{info}}</li>
  	  	</ul>
  	  </div>
  	</div>
  </div>
</template>

<script type="text/javascript">
	import star from '../star/star.vue';
	import split from '../split/split.vue';
	import BScroll from "better-scroll";

	export default{
       props:{
       	 seller:{
       		type:Object
       	 }
       },
       data(){
          return{
          	favorite:false
          }
       },  	
       created(){
  		this.classMap = ['decrease','discount','special','invoice','guarantee'];
  	   },
  	   mounted(){
         this.scroll = new BScroll(this.$refs.seller,{
          	click:true
         });    
         this._initPics();     
  	   },
  	   methods:{
          _initPics(){
          	console.log("初始化_initPics()方法");
            if(this.seller.pics){
             console.log("获取到值了");
          	 let picWidth = 120;
          	 let marginRight = 6;
          	 let width = (picWidth+marginRight)*this.seller.pics.length-marginRight;
             this.$refs.picList.style.width = width+'px';
             if(!this.picScroll){
             	this.$nextTick(()=>{
             	  this.picScroll = new BScroll(this.$refs.picWrapper,{
         	        scrollX:true,
                    eventPassthrough:"vertical"
                  });   
                });   
             }else{
             	this.picScroll.refresh();
             }
                    	     
           }
          },
          changeFavorite(){
          	 this.favorite = !this.favorite;
          }
  	   },
  	   computed:{
          favoriteText(){
          	return this.favorite?'已收藏':'收藏';
          }
  	   },
       components:{
       	 star,
         split
       },
       watch:{
       	//检测是否获取到seller对象的值
       	//逻辑关系是先建立横向滚动条，再通过watch观察到seller对象的更新，
       	//再动态的改变content的宽度。
        seller(){
        	console.log("我是watch属性");
       		this._initPics();
       	}
       }
	}
</script>

<style>
.seller{
	position: absolute;
	top:174px;
	bottom: 0px;
	width:100%;
	overflow: hidden;	
}

.seller .overview{
	position: relative;
	padding: 18px;
}

.seller .overview .title{
	margin-bottom: 8px;
	line-height: 14px;
	color:rgb(7,17,27);
	font-size: 14px;
}
.seller .overview .desc{
	position: relative;
	padding-bottom: 18px;
	font-size: 0;
}
.seller .overview .desc:after{
  display: block;
  position: absolute;
  width:100%;
  left:0px;
  bottom: 0px;
  border-top: 1px solid rgba(7,17,27,0.1);
  content:'';
}

.seller .overview .desc .star{
	display: inline-block;
	margin-right: 8px;
	vertical-align: top; 
}
.seller .overview .desc .text{
    display: inline-block;
    line-height: 18px;
	margin-right: 12px;
	vertical-align: top;
	font-size: 10px;
	color:rgb(77,82,93);
}
.seller .overview .remark{
   display: flex;
   padding-top: 18px;
}

.seller .overview .remark .block{
	flex: 1;
	text-align: center;
	border-right: 1px solid rgba(7,17,27,0.1); 
}
.seller .overview .remark .block:last-child{
	border:none;
}
.seller .overview .remark .block h2{
	margin-bottom: 4px;
	line-height: 10px;
	font-size: 10px;
	color:rgb(147,153,159);
}

.seller .overview .remark .block .content{
	line-height: 24px;
	font-size: 10px;
	color:rgb(7,17,27);
}
.seller .overview .remark .block .content .stress{
	font-size: 24px;
}
.seller .overview .favorite{
	position: absolute;
	right: 11px;
	top:18px;
	width:50px;
	text-align: center;
}
.seller .overview .favorite .icon-favorite{
	display: block;
	color:#d4d6d9;
	line-height: 24px;
	font-size: 24px;
	margin-bottom: 4px;
}
.seller .overview .favorite .active{
	color:rgb(240,20,20);
}

.seller .overview .favorite .text{
	line-height: 10px;
	font-size: 10px;
	color:rgb(77,85,93);
}

.seller .bulletin{
	padding:18px 18px 0 18px;
}
.seller .bulletin .title{
	margin-bottom: 8px;
	line-height: 14px;
	color:rgb(7,17,27);
	font-size: 14px;
}
.seller .bulletin .content-wrapper{
	position: relative;
	padding:0 12px 16px 12px;
}
.seller .bulletin .content-wrapper:after{
  display: block;
  position: absolute;
  width:100%;
  left:0px;
  bottom: 0px;
  border-top: 1px solid rgba(7,17,27,0.1);
  content:'';
}
.seller .bulletin .content-wrapper .content{
	line-height: 24px;
	font-size: 12px;
	color:rgb(240,20,20);
}
.seller .bulletin .supports{

}

.seller .bulletin .supports .support-item{
	position: relative;
	padding:16px 12px;
	font-size: 0;
}
.seller .bulletin .supports .support-item:after{
  display: block;
  position: absolute;
  width:100%;
  left:0px;
  bottom: 0px;
  border-top: 1px solid rgba(7,17,27,0.1);
  content:'';
}
.seller .bulletin .supports .support-item:last-child{
	border:none;
}
.seller .bulletin .supports .support-item .icon{
	display: inline-block;
	vertical-align: top;
	width:16px;
	height: 16px;
	margin-right: 6px;
} 
/*优惠信息对应的brand*/
.seller .bulletin .supports .support-item .decrease{
	background:url(decrease_4@2x.png);
	background-size: 16px 16px;
	background-repeat: no-repeat; 
}
.seller .bulletin .supports .support-item .discount{
	background:url(discount_4@2x.png);
	background-size: 16px 16px;
	background-repeat: no-repeat;
}
.seller .bulletin .supports .support-item .guarantee{
	background:url(guarantee_4@2x.png);
    background-size: 16px 16px;
	background-repeat: no-repeat;  
}
.seller .bulletin .supports .support-item .invoice{
	background:url(invoice_4@2x.png);
	background-size: 16px 16px;
	background-repeat: no-repeat;  
}
.seller .bulletin .supports .support-item .special{
	background:url(special_4@2x.png);
	background-size: 16px 16px;
	background-repeat: no-repeat;  
}

.seller .bulletin .supports .support-item .text{
	line-height: 16px;
	font-size: 12px;
	color:rgb(7,17,27);
}
.seller .pics{
	padding:18px;
}
.seller .pics .title{
	margin-bottom: 12px;
	line-height: 14px;
	color:rgb(7,17,27);
	font-size: 14px;
}
.seller .pics .pic-wrapper{
	width: 100%;
	overflow: hidden;
	white-space: nowrap;
}
.seller .pics .pic-wrapper .pic-list{
	font-size: 0;
}
.seller .pics .pic-wrapper .pic-list .pic-item{
	display: inline-block;
	margin-right: 6px;
	width:120px;
	height: 90px;
}
.seller .pics .pic-wrapper .pic-list .pic-item:last-child{
	margin:0;
}
.seller .seller-info{
	padding: 18px 18px 0 18px;
	color:rgb(7,17,27);
}
.seller .seller-info .title{
	position: relative;
	padding-bottom: 12px;
	line-height: 14px;
	font-size: 14px;
}
.seller .seller-info .title:after{
  display: block;
  position: absolute;
  width:100%;
  left:0px;
  bottom: 0px;
  border-top: 1px solid rgba(7,17,27,0.1);
  content:'';
}
.seller .seller-info .info-item{
	position: relative;
	padding:16px 12px;
	line-height: 16px;
	font-size: 12px;
}
.seller .seller-info .info-item:after{
  display: block;
  position: absolute;
  width:100%;
  left:0px;
  bottom: 0px;
  border-top: 1px solid rgba(7,17,27,0.1);
  content:'';
}
.seller .seller-info .info-item:last-child{
	border:none;
}
</style>