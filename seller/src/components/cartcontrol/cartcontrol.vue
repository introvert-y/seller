<template>
	<div class="cartcontrol">
        <transition name="slide">
			<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCount">	
			</div>
	    </transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCount" ref="ball"></div>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default{
		props:{
			food:{
				type:Object
			}
		},
		created(){
			// console.log(this.food)
		},
		methods:{
			addCount(){
				if(!this.food.count){
					Vue.set(this.food,'count',1);
				}else{
					this.food.count++;
				}
				// console.log("我是addCount方法");
				// console.log(event.target);
				this.$emit('get-dom',event.target);
				//event.target返回触发此事件的元素
			},
			decreaseCount(){
                if(this.food.count>0){
                	this.food.count--;
                }
			}
		}
	}
</script>

<style>	
.cartcontrol{font-size: 0px;}
.cartcontrol .slide-leave-active,.slide-enter-active {
  transition: all 0.5s linear;
}
.cartcontrol .slide-leave-to{
  transform: translate3d(30PX,0,0);
  transform: rotate(180deg);
  opacity: 0;
}
.cartcontrol .slide-enter{
	opacity: 0;
	transform: translate3d(30px,0,0);
	transform: rotate(180deg);

}
.cartcontrol .cart-decrease{
	display: inline-block;
	padding:6px;
	line-height: 24px;
	font-size: 24px;
	color:rgb(0,160,220);

}

.cartcontrol .cart-count{
	display: inline-block;
	vertical-align: top;
	width:12px;
	padding-top: 6px;
	line-height: 24px;
	text-align: center;
	font-size: 10px;
	color:rgb(147,153,159);
}
.cartcontrol .cart-add{
	display: inline-block;
	padding:6px;
	line-height: 24px;
	font-size: 24px;
	color:rgb(0,160,220);
}
</style>