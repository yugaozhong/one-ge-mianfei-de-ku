<template>
  <div class="cellCom">
    <mt-cell 
    v-for="item in list" :key="item.rankid" 
    :title="titleName(item)" 
    :to="jumpPath(item)">
      <slot :item="item"></slot>
      <span><img src="../../assets/img/arrow_icon.png" width="8"/></span>
      <img slot="icon" :src="item.imgurl | imgFilter" width="75" height="75" />
    </mt-cell>
  </div>
</template>

<script>
import Vue from "vue";
import { Cell } from "mint-ui";
Vue.component(Cell.name, Cell);
export default {
    props:{
        list:{
            type:Array
        }
    },
    computed:{
        titleName(){
            return function(item){
                return item.rankname || item.specialname
            }
        },
        jumpPath(){
            return function(item){
                let path = '/song/details/'
                if(item.rankid){
                    path += "rank/"+item.rankid
                }else{
                    path += "plist/"+item.specialid
                }
                return path
            }
        }
    }
}
</script>

<style lang="less">
    .cellCom{
        .mint-cell{
            .mint-cell-wrapper{
                .mint-cell-title{
                    &>img{
                        margin: .5rem 0;
                    }

                    .mint-cell-text{
                        float:right;
                        width: 10rem;
                        margin-top: 2rem;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
    }
</style>