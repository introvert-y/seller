<template>
	<div class="shopcart">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{highLight:totalCount>0}" ref="logoCart">
						<span class="icon-shopping_cart"></span>
					</div>
					<div class="number" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{highLight:totalPrice>0}">￥{{totalPrice}}元</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
      <!-- click.stop.prevent阻止其他点击事件 -->
			<div class="content-right" @click.stop.prevent="pay">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
		</div>
    <div class="ball-container">
      <transition-group v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter='afterEnter'>
        <div class="ball" v-for="(ball,index) in balls" v-show="ball.show" :key="index">    
        </div>
      </transition-group>
    </div>
    <transition name="slide">
    <div class="shopcart-list" v-show="listShow">
       <div class="list-header">
         <h1 class="title">购物车</h1>
         <span class="empty" @click="empty">清空</span>
       </div>
       <div class="list-content" ref="listContent">
          <ul>
             <li class="food" v-for="food in selectFoods">
               <span class="name">{{food.name}}</span>
               <div class="price">
                 <span>￥{{food.price*food.count}}</span>
               </div>
               <div class="cartcontrol-wrapper">
                 <cartcontrol :food="food" v-on:get-dom="getPosition"></cartcontrol>
               </div>
             </li>
          </ul>
       </div>
    </div>
    </transition> 
    <transition name="fade">
    <div class="list-mask" v-show="listShow" @click="fold=true"></div>
	  </transition>
  </div>
  
</template>

<script type="text/javascript">
  import cartcontrol from "../cartcontrol/cartcontrol.vue";
  import BScroll from 'better-scroll';
	export default{
      props:{
      	selectFoods:{
      		type:Array,
      		default(){
      			return [
                 {
                 	// price:0,
                 	// count:0
                 }
      			];
      		}
      	},
      	deliveryPrice:{
      		type:Number,
      		default:0
      	},
      	minPrice:{
      		type:Number,
      		default:0
      	}
      },
      data(){
         return{
            domLeft:0,
            domTop:0,
            fold:true,
            balls:[
               {
                 show:false
               },
               {
                 show:false
               },
               {
                 show:false
               },
               {
                 show:false
               },
               {
                 show:false
               }
            ],
         }
      },
      computed:{
      	totalPrice(){
      	    let total = 0;
      		for(let i of this.selectFoods){
      			total += i.price*i.count;
      		}
      		return total;
      	},
      	totalCount(){
      		let count = 0;
      		for(let i of this.selectFoods){
      			count += i.count; 
      		}
      		return count;
      	},
      	payDesc(){
      		if(this.totalPrice===0){
               return `￥${this.minPrice}元起送`;
      		}else if(this.totalPrice<this.minPrice){
               let diff = this.minPrice - this.totalPrice;
               return `还差${diff}元起送`;
      		}else{
      			return '去结算';
      		}
      	},
      	payClass(){
      		if(this.totalPrice<this.minPrice){
      			return 'not-enough';
      		}else{
      			return 'enough';
      		}
      	},
        listShow(){
           if(!this.totalCount){
              this.fold = true;
              return false;
           }
           let show = !this.fold;
           if(show){
              this.$nextTick(()=>{
                if(!this.scroll){
                  this.scroll = new BScroll(this.$refs.listContent,{
                  click:true
                  })
                }else{
                  this.scroll.refresh();
                }
                
              })
           }
           return show;
        }
      },
      methods:{
        getPosition(target){
          // console.log("我是shopcart的getPosition方法");
          // console.log(target);
            this.domLeft = target.getBoundingClientRect().left+12;
            this.domTop = target.getBoundingClientRect().top+12;
            // console.log(this.domLeft);
            // console.log(this.domTop);
            //设置小球
             for (let i = 0; i < this.balls.length; i++) {
              let ball = this.balls[i];
              if (!ball.show) {
                ball.show = true;
                return;
              }
            }     
        },
        beforeEnter(el){
           // console.log('我是beforeEnter');
           el.style.left = this.domLeft+'px'; 
           el.style.top = this.domTop+'px';
           // console.log('nextTick下小球的left:'+el.style.left);
           // console.log('nextTick下小球的top:'+el.style.top);
        },
        enter(el){
          // console.log('我是Enter');
          let totalLeft = this.$refs.logoCart.getBoundingClientRect().left;
          let totalTop = this.$refs.logoCart.getBoundingClientRect().top;      
          setTimeout(function(){
            el.style.left = totalLeft+12+'px'; 
            el.style.top = totalTop+12+'px';
            el.style.transition = 'all 0.4s';
          },200);
        },
        afterEnter(el){
            // console.log('我是afterEnter');
            let _this = this;
            setTimeout(function(){                        
            for (let i = 0; i < _this.balls.length; i++) {
            let ball = _this.balls[i]
            if (ball) {
              ball.show = false;
              el.style.display = 'none';
              }
            }
           },600);
        },
        toggleList(){
          if(!this.totalCount){
            return;
          }
          this.fold = !this.fold;
        },
        empty(){
          for(let i of this.selectFoods){
            i.count = 0;
          }
        },
        pay(){
          if(this.totalPrice<this.minPrice){
            return;
          }
          window.alert(`支付${this.totalPrice+this.deliveryPrice}元`)
        }
      },
      components:{
        cartcontrol
      }
	}
</script>

<style>

.shopcart{
	position: fixed;
	left:0;
	bottom: 0px;
	z-index: 50;
	width:100%;
	height: 48px;
}
.shopcart .content{
	display: flex;
	background: #141d27;
	font-size: 0px;
}
.shopcart .content .content-left{flex: 1;}
.shopcart .content .content-left .logo-wrapper{
    display: inline-block;
    position: relative;
    top:-10px;
    margin: 0 12px;
    padding:6px;
    width:56px;
    height: 56px;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%;
    background:#141d27;
}
.shopcart .content .content-left .logo-wrapper .logo{
	width:100%;
	height: 100%;
	border-radius: 50px;
	background: #2b343c;
	text-align:center;
}
.shopcart .content .content-left .logo-wrapper  .highLight{
	background: rgb(0,160,220);
}
.shopcart .content .content-left .logo-wrapper  .highLight span.icon-shopping_cart{color:#fff;}
.shopcart .content .content-left .logo-wrapper .number{
	position: absolute;
	top:0;
	right: 0;
	width: 24px;
	height: 16px;
	line-height: 16px;
	text-align: center;
	border-radius: 16px;
	font-size: 9px;
	font-weight: 700;
	color:#fff;
	background: rgb(240,20,20);
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
}
.shopcart .content .content-left .logo-wrapper .logo .icon-shopping_cart{
	line-height: 44px;
	font-size: 24px;
	color:#80858a;
}
.shopcart .content .content-left .price{
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin-top: 12px;
    box-sizing: border-box;
    padding-right: 12px;
    border-right:1px solid rgba(255,255,255,0.1);
    font-size: 16px;
    font-weight: 700;
    color: rgba(255,255,255,0.4);
}
.shopcart .content .content-left .highLight{color:#fff;}
.shopcart .content .content-left .desc{
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin: 12px 0 0 12px;
    font-size: 10px;
    color: rgba(255,255,255,0.4);
}
.shopcart .content .content-right{
   flex:0 0 105px;
   width:105px;
}
.shopcart .content .content-right .pay{
	height:48px;
	line-height: 48px;
	text-align: center;
	font-size: 12px;
	color:rgba(255,255,255,0.4);
	font-weight: 700;
	background: #2b333b;
}
.shopcart .content .content-right .not-enough{
	background: #2b333b;
}
.shopcart .content .content-right .enough{
	background: #00b43c;
	color:#fff;
}

.shopcart .ball-container .ball{
  position: fixed;
  width:16px;
  height: 16px;
  border-radius: 50%;
  background: rgb(0,160,220);
  z-index: 200;
}
.shopcart .shopcart-list{
  position: absolute;
  bottom:0;
  left:0;
  z-index:-1;
  width:100%;
}
.shopcart .shopcart-list .list-header{
  height:40px;
  line-height: 40px;
  padding:0 18px;
  background: #f3f5f7;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.shopcart .shopcart-list .list-header .title{
  float: left;
  font-size: 14px;
  color:rgb(7,17,27);
}
.shopcart .shopcart-list .list-header .empty{
  float: right;
  font-size: 12px;
  color:rgb(0,160,220);
}
.shopcart .shopcart-list .list-content{
  padding: 0 18px;
  max-height: 217px;
  overflow: hidden;
  background: #fff;
}

.shopcart .shopcart-list .list-content .food{
   position: relative;
   padding:12px 0;
   box-sizing: border-box;
}
.shopcart .shopcart-list .list-content .food:after{
  display: block; 
  position: absolute;
  left:0;
  bottom: 0;
  width:100%;
  border-top: 1px solid rgba(7,17,27,0.1);
  content:" ";
 }
.shopcart .shopcart-list .list-content .food .name{
  line-height: 24px;
  font-size: 14px;
  color:rgb(7,17,27);
}
.shopcart .shopcart-list .list-content .food .price{
  position: absolute;
  right:90px;
  bottom: 12px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 700;
  color:rgb(240,20,20);
}
.shopcart .shopcart-list .list-content .food .cartcontrol-wrapper{
  position: absolute;
  right:0;
  bottom: 6px;
}
.slide-leave-active,.slide-enter-active {
  transition: all 0.5s;
}
.slide-leave-to,.slide-enter{
  transform:translateY(100%);
  opacity: 0;
}
.fade-leave-active,.fade-enter-active {
  transition: all 0.5s;
}
.fade-leave-to,.fade-enter{
  opacity: 0;
}
.shopcart .list-mask{
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background:rgba(7,17,27,0.6);
}
</style>