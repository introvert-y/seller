<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评论</router-link>
      <router-link to="seller" class="tab-item">商家</router-link>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
    
  </div>
</template>

<script>
  import header from './components/header/header.vue'
  const ERR_OK = 0;

  export default{
    data(){
      return{
        seller:{}
      }
    },
    created(){
       this.$http.get('/api/seller').then((res)=>{
           if(res.body.errno===ERR_OK){
             this.seller = res.body.data;
             }
       })
    },
    components:{
      'v-header':header,
    }
  }
</script>

<style>
#app .tab{
  position: relative;
  display: flex;
  width:100%;
  height: 40px;
  line-height: 40px;
}
#app .tab .tab-item{
  flex: 1;
  text-align: center;
}
#app .tab>a{
  display: block;
  font-size: 14px;
  color:rgb(77,85,93);
}
#app .tab a.active{
  color:rgb(240,20,20);
}
#app .tab:after{
  display: block;
  position: absolute;
  width:100%;
  left:0px;
  bottom: 0px;
  border-top: 1px solid rgba(7,17,27,0.1);
  content:'';
}
</style>
