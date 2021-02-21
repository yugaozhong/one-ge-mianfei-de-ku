<template>
  <div class="singer">
    <mt-cell 
    v-for="(item,i) in singerlists" :key="item.classid"
    :class="{margin1:!styleFn(item.classname,i),margin2:styleFn(item.classname,i)}"
    @touchstart.native="goToSingerFn(item.classid)"
     :title="item.classname">
      <span><img src="../../assets/img/arrow_icon.png" width="8"/></span>
    </mt-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      singerlists: [],
    };
  },
  async created() {
    let { data } = await this.$axios.get("/api/singer/class?json=true");
    this.singerlists = data.list;
  },
  methods: {
    styleFn(name,i){
      if(i>0&&this.singerlists[i-1].classname.includes(name.substring(0,2))){
        return true
      }else{
        return false;
      }
    },
    //改变路由 并传参
    goToSingerFn(id){
      this.$router.push({name:"SingerList", params:{ singerId:id}})
    }
  },
};
</script>

<style lang="less">
.singer {
  margin-top: 5rem;
  .mint-cell {
    border: 1px solid rgb(218, 217, 217);
    background-color: #f1f1f1;
    border-radius: 0.25rem;
    width: 15rem;
  }
  .margin1 {
    margin: 0.5rem 0.5rem 0;
  }
  .margin2 {
    margin: 0 0.5rem;
    border-top: none;
  }
}
</style>