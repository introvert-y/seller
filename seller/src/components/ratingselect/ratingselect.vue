<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span class="block positive" @click="select(2)" :class="{'positiveActive':selectType===2}">{{desc.all}}<i class="count">{{ratings.length}}</i></span>
			<span class="block positive" @click="select(0)" :class="{'positiveActive':selectType===0}">{{desc.positive}}<i class="count">{{positives}}</i></span>
			<span class="block negative" @click="select(1)" :class="{'negativeActive':selectType===1}">{{desc.negative}}<i class="count">{{negatives}}</i></span>
		</div>
		<div class="switch" @click="toggleContent()" :class="{'heighLight':onlyContent===true}">
			<span class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script type="text/javascript">
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;

	export default{
       props:{
       	 ratings:{
       	 	type:Array,
       	 	default(){
       	 		return [];
       	 	}
       	 },
       	 selectType:{
       	 	type:Number,
       	 	default:ALL
       	 },
       	 onlyContent:{
       	 	type:Boolean,
       	 	default:false
       	 },
       	 desc:{
       	 	type:Object,
       	 	default(){
       	 		return{
       	 		   all:'全部',
       	 		   positive:"满意",
       	 		   negative:"不满意"
       	 		}
       	 	}
       	 }
       },
       methods:{
       	 select(type){
           this.selectType = type;
           this.$emit('rating-type-select',type);
       	 },
       	 toggleContent(){
       	 	this.onlyContent = !this.onlyContent;
       	 	this.$emit('rating-content-toggle',this.onlyContent);
       	 },

       },
       computed:{
         positives(){
       	   let numP = 0;
           for(let i of this.ratings){
           	 if(i.rateType===POSITIVE){
                numP++;
           	 }
           }
           return numP;
       	 },
       	 negatives(){
       	   let numN = 0;
           for(let i of this.ratings){
           	 if(i.rateType===NEGATIVE){
                numN++;
           	 }
           }
           return numN;
       	 }
       }
	}
</script>

<style>
.ratingselect{}
.ratingselect .rating-type{
	position: relative;
	padding: 18px 0;
	margin:18px;
	font-size: 0;
}	
.ratingselect .rating-type:after{
  display: block;
  position: absolute;
  width:100%;
  left:0px;
  bottom: 0px;
  border-top: 1px solid rgba(7,17,27,0.1);
  content:'';
}

.ratingselect .rating-type .block{
	display: inline-block;
	line-height: 16px;
	padding:8px 12px;
    margin-right: 8px;
    border-radius: 1px;
    font-size: 12px;
    color:rgb(77,85,93);
}
.ratingselect .rating-type .block i{
	font-size: 8px;
	margin-left: 2px;
}
.ratingselect .rating-type .positive{background: rgba(0,160,220,0.2)}
.ratingselect .rating-type .negative{background: rgba(7,85,93,0.2)}

.ratingselect .rating-type .positiveActive{
	color:#fff;
	background: rgb(0,160,220);
}
.ratingselect .rating-type .negativeActive{
	color:#fff;
	background: rgb(7,85,93);
}
.ratingselect .switch{
	padding: 12px 18px;
	line-height: 24px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
	color:rgb(147,153,159);
	font-size: 0;
}
.ratingselect .switch .icon-check_circle{
	display: inline-block;
	vertical-align: top;
	margin-right: 4px;
	font-size: 24px;
}

.ratingselect .heighLight .icon-check_circle{
	color:#00c850;
}

.ratingselect .switch .text{
	display: inline-block;
	vertical-align: top;
	font-size: 12px;
}
</style>