<template>
  <cell-com :list="ranklists"></cell-com>
</template>

<script>
import cellCom from '../Common/CellCom'
export default {
  data(){
    return {
      ranklists: []
    }
  },
  components:{
    cellCom
  },
  async created(){
    let {data} = await this.$axios.get('/api/rank/list?json=true')
    this.ranklists = data.rank.list;
  }
}
</script>

<style>

</style>