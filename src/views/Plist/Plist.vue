<template>
  <cell-com :list="plists">
    <!-- 播放数量显示 -->
    <template #default="{ item }">
      <span class="customSpan"> <img src="../../assets/img/icon_music.png" width="12" alt="">{{item.playcount}}</span>
    </template>
  </cell-com>
</template>

<script>
import cellCom from '../Common/CellCom'
export default {
  components:{
    cellCom
  },
  data(){
    return{
      plists: []
    }
  },
  async created() {
    let {data} = await this.$axios.get('/api/plist/index?json=true')
    this.plists = data.plist.list.info;
  },
}
</script>

<style lang="less">
  .customSpan{
    position: absolute;
    left: 5.3rem;
    top: 3.25rem;
    font-size: .6rem;
    img{
      position: relative;
      top: -0.1rem;
      right: .2rem;
    }
  }
</style>