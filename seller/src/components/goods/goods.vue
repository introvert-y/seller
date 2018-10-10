<template>
	<div class="goods">
	   <div class="menu-wrapper" ref="menuWrapper">
	      <ul>
	      	<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index)">
	      		<span class="text"><i v-show="item.type>0" class="icon" :class="classMap[item.type]"></i>{{item.name}}</span>
	      	</li>
	      </ul>
	   </div>
	   <div class="foods-wrapper" ref="foodsWrapper">
	   	<ul>
	   		<li v-for="item in goods" class="food-list" ref="foodList">
	   			<h1 class="title">{{item.name}}</h1>
	   			<ul>
	   				<li @click="selectFood(food)" v-for="food in item.foods" class="food-item">
	   					<div class="icon">
	   						<img width="57px" height="57px" :src="food.icon">
	   					</div>
	   					<div class="content">
	   						<h2 class="name">{{food.name}}</h2>
	   						<p class="desc">{{food.description}}</p>
	   						<div class="extra">
	   							<span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span>
	   						</div>
	   						<div class="price">
	   							<span class="now">￥{{food.price}}</span><span class='old' v-show="food.oldPrice">￥{{food.oldPrice}}</span>
	   						</div>
	   						<div class="cartcontrol-warpper">
	   							<cartcontrol v-on:get-dom="getDom" :food="food"></cartcontrol>
	   						</div>
	   					</div>
	   				</li>
	   			</ul>
	   		</li>
	   	</ul>
	   </div>
       <shopcart ref="shopCart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
       <food :food="selectedFood" ref="food" v-on:get-dom="getDom"></food>
	</div>
</template>

<script type="text/javascript">
	import shopcart from '../shopcart/shopcart.vue';
	import cartcontrol from '../cartcontrol/cartcontrol.vue';
    import BScroll from 'better-scroll';
    import food from '../food/food.vue';
	const ERR_OK = 0 ; 
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return {
				goods:[],
				listHeight:[],
				scrollY:0,
				selectedFood:{}
			}
		},
		created(){
		   this.$http.get('/api/goods').then((res)=>{
           if(res.body.errno===ERR_OK){
             this.goods = res.body.data;
             this.$nextTick(()=>{
		   	   this._initScroll();
		   	   this._calculateHeight();		      
		   	 })
            }
		   }),
		   this.classMap = ['decrease','discount','special','invoice','guarantee'];

		   
	    },
	    methods:{
	    	_initScroll(){
               this.menuScroll = new BScroll(this.$refs.menuWrapper,{
               	click:true
               });
               this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
               	  click:true,
               	  probeType:3
               });
               // console.log(this.foodsScroll);
               let _this = this;
               this.foodsScroll.on('scroll',(pos)=>{
                   _this.scrollY = Math.abs(Math.round(pos.y));
                   // console.log(_this.scrollY);测试是否实时获取Y值
               })
                    
	    	},
	    	getDom(target){
              // console.log("我是getDom方法");
              // console.log(target);
              this.$refs.shopCart.getPosition(target);
           //    let _this = this;
	          // setTimeout(function(){
	          //   _this.$refs.shopCart.drop(target);
	          // },100);
		    },
	    	_calculateHeight(){
               let foodList = this.$refs.foodList;
               let height = 0;
               this.listHeight.push(height);
               for(let i = 0; i<foodList.length;i++){
               	 let item = foodList[i];
               	 height+=item.clientHeight;
               	 this.listHeight.push(height);
               }
               // console.log(this.listHeight);测试是否获取每一个DIV的高
	    	},
	    	 selectMenu(index){
	    	 	  // console.log(index);
                   let foodList = this.$refs.foodList;
                   let el = foodList[index];
                   this.foodsScroll.scrollToElement(el,300);
               },
               // 商品详情页的数据传入
               selectFood(food){
               	 this.selectedFood = food;
                 this.$refs.food.show();
               }
	    },
	    components:{
          shopcart,
          cartcontrol,
          food
	    },
	    computed:{
	    	currentIndex(){
	    		for(let i = 0 ; i< this.listHeight.length;i++){
	    		  let height1 = this.listHeight[i];
	    		  let height2 = this.listHeight[i+1];
	    			if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
	    				return i;
	    			}
	    		}
	    		return 0 ;
	    	},
	    	selectFoods(){
	    		let foods = [];
	    		for(let good of this.goods){
	    			for(let food of good.foods){
                        if(food.count){
                        	foods.push(food);
                        }
	    			}
	    		}
                return foods;
	    	}
	    }
	   }
</script>

<style>
.goods{
	display: flex;
	position: absolute;
	top:174px;
	width:100%;
	bottom: 46px;
	overflow: hidden;
}

.goods .menu-wrapper{
	flex:0 0 80px;
	width:80px;
	background: #f3f5f7;
}
.goods .menu-wrapper .menu-item{
	position: relative;
	display:table;
	width:56px;
	height: 54px;
	line-height: 14px;
	padding:0 12px;
}
.goods .menu-wrapper .current{
	position: relative;
	margin-top: -1px;
	z-index:10;
	background: #fff;
	font-weight: bold;
}

.goods .menu-wrapper .menu-item .icon{
	display: inline-block;
	vertical-align: top;
	width:12px;
	height: 12px;
	margin-right: 2px;
} 
/*优惠信息对应的brand*/
.goods .menu-wrapper .menu-item .decrease{
	background:url(decrease_3@2x.png);
	background-size: 12px 12px;
	background-repeat: no-repeat; 
}
.goods .menu-wrapper .menu-item .discount{
	background:url(discount_3@2x.png);
	background-size: 12px 12px;
	background-repeat: no-repeat;
}
.goods .menu-wrapper .menu-item .guarantee{
	background:url(guarantee_3@2x.png);
    background-size: 12px 12px;
	background-repeat: no-repeat;  
}
.goods .menu-wrapper .menu-item .invoice{
	background:url(invoice_3@2x.png);
	background-size: 12px 12px;
	background-repeat: no-repeat;  
}
.goods .menu-wrapper .menu-item .special{
	background:url(special_3@2x.png);
	background-size: 12px 12px;
	background-repeat: no-repeat;  
}

.goods .menu-wrapper .menu-item .text{
	display: table-cell;
	width:56px;
	vertical-align: middle;
	font-size: 12px; 
}
.goods .menu-wrapper .menu-item .text:after{
  display: block;
  position: absolute;
  width:100%;
  left:0px;
  bottom: 0px;
  border-top: 1px solid rgba(7,17,27,0.1);
  content:'';
}

.goods .foods-wrapper{
	
	flex:1;
}

.goods .foods-wrapper .title{
	padding-left: 14px;
	height: 26px;
	line-height: 26px;
	border-left: 2px solid #d9dde1;
	font-size: 12px;
	color:rgb(147,153,159);
	background: #f3f5f7;
}
.goods .foods-wrapper .food-item{
	position: relative;
	display: flex;
	margin:18px;
	padding-bottom: 18px;
}
.goods .foods-wrapper .food-item:after{
  display: block;
  position: absolute;
  width:100%;
  left:0px;
  bottom: 0px;
  border-top: 1px solid rgba(7,17,27,0.1);
  content:'';
}
/*.goods .foods-wrapper .food-item:last-child{
	display: none;
    padding-bottom: 0px;
}*/

.goods .foods-wrapper .food-item .icon{
	flex:0 0 57px;
	margin-right: 10px;
}
.goods .foods-wrapper .food-item .content{
	flex:1;
}
.goods .foods-wrapper .food-item .content .name{
	margin: 2px 0 8px 0;
	height: 14px;
	line-height: 14px;
	font-size: 14px;
	color:rgb(7,17,27);
}
.goods .foods-wrapper .food-item .content .extra{
	margin-bottom: 8px;
	line-height: 10px;
	font-size: 10px;
	color:rgb(147,153,159);
}
.goods .foods-wrapper .food-item .content .desc{
	margin-bottom: 8px;
	line-height: 12px;
	font-size: 10px;
	color:rgb(147,153,159);
}
.goods .foods-wrapper .food-item .content .extra .count{
	margin-right: 12px;
}

.goods .foods-wrapper .food-item .content .price{
	font-weight: 700;
	line-height: 24px;
}

.goods .foods-wrapper .food-item .content .price .now{
	margin-right: 8px;
	font-size: 14px;
	color:rgb(240,20,20);
}

.goods .foods-wrapper .food-item .content .price .old{
	text-decoration: line-through;
	font-size: 10px;
	color:rgb(147,153,159);
}
.goods .foods-wrapper .food-item .content .cartcontrol-warpper{
	position: absolute;
	right:0px;
	bottom:12px;
}
</style>