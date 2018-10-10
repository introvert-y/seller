<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
	</div>
</template>

<script type="text/javascript">
    const LENGTH = 5;

	export default{
       props:{
	       	size:{
	       		type:Number
	       	},
	       	score:{
	       		type:Number
	       	}
       },
       computed:{
          starType(){
             return  'star-'+this.size;
       	  },
       	  itemClasses(){
             let result = [];
             // 向下取整
             let score = Math.floor(this.score*2)/2;
             let hasDecimal = (score%1!==0);
             let integer = Math.floor(score);
             for(let i=0;i<integer;i++){
             	result.push('on')
             }
             if(hasDecimal){
             	result.push('half')
             }
             while(result.length<LENGTH) {
             	result.push('off')
             }
             return result;
       	  }
       }
	}
</script>

<style>
.star{font-size: 0px;}
.star .star-item{
	display: inline-block;
	background-repeat: no-repeat;
}
.star-48 .star-item{
	width:20px;
	height: 20px;
	margin-right: 22px;	
} 
.star-48 .star-item:last-child{margin-right: 0px;}
.star-48 .on{
	background: url(star48_on@2x.png);
	background-size: 20px 20px;	
}
.star-48 .half{
	background: url(star48_half@2x.png);
	background-size: 20px 20px;	
}
.star-48 .off{
	background: url(star48_off@2x.png);
	background-size: 20px 20px;
}

.star-36 .star-item{
	width:15px;
	height: 15px;
	margin-right: 6px;
}
.star-36 .star-item:last-child{margin-right: 0px;}
.star-36 .on{
	background: url(star36_on@2x.png);
	background-size: 15px 15px;
}
.star-36 .half{
	background: url(star36_half@2x.png);
    background-size: 15px 15px;
}
.star-36 .off{
	background: url(star36_off@2x.png);
    background-size: 15px 15px;
}

.star-24 .star-item{
	width:10px;
	height: 10px;
	margin-right: 3px;
	/*background-size: 10px 10px;*/
}
.star-24 .star-item:last-child{margin-right: 0px;}
.star-24 .on{
	background: url(star24_on@2x.png);
	background-size: 10px 10px;
}
.star-24 .half{
	background: url(star24_half@2x.png);
	background-size: 10px 10px;
}
.star-24 .off{
	background: url(star24_off@2x.png);
	background-size: 10px 10px;
}

</style>