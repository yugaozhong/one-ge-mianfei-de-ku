<template>
  <div>
    <mt-cell 
    v-for="item in singers" :key="item.singerid"
    @touchstart.native="gotoSingerInfo(item.singerid)"
     :title="item.singername">
      <img slot="icon" :src="item.imgurl | imgFilter" width="47"/>
    </mt-cell>
  </div>
</template>

<script>
export default {
    data(){
        return{
            singers:[]
        }
    },
    async created() {
        let {data} = await this.$axios.get('/api/singer/list/'+this.$route.params.singerId +'?json=true')
        this.singers = data.singers.list.info;
        console.log(this);
        this.$store.commit('changeTitle',{title:data.classname})
    },
    methods: {
        // 变动hash值 并传参
        gotoSingerInfo(id){
            this.$router.push({name: "SingerInfo",params:{infoId: id}});
        }
    },
};
</script>

<style scoped>
    .mint-cell img {
        margin: .5rem;
    }
</style>