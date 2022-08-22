<template>
  <div class="card">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <card-item title="销售总价" context="￥126560">
            <template slot="charts">
              <span>
                周同比&nbsp;&nbsp;56.67%<svg t="1661171714613" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="2211" width="20" height="20">
                  <path d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z" fill="#1afa29" p-id="2212">
                  </path>
                </svg>
              </span>
              <span>
                日同比&nbsp;&nbsp;56.67%<svg t="1661171854609" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="3341" width="20" height="20">
                  <path d="M512 618.666667L298.666667 405.333333h426.666666L512 618.666667z" fill="#d81e06" p-id="3342">
                  </path>
                </svg>
              </span>
            </template>
            <template slot="bottom">
              日销售额￥12445
            </template>
          </card-item>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <card-item title="访问量" context="88460">
            <template slot="charts">
              <line-echarts></line-echarts>
            </template>
            <template slot="bottom">
              日访问量12445
            </template>
          </card-item>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <card-item title="支付笔数" context="88460">
            <template slot="charts">
              <bar-echarts></bar-echarts>
            </template>
            <template slot="bottom">
              转化率65%
            </template>
          </card-item>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <card-item title="运营活动效果" context="78%">
            <template slot="charts">
              <across-bar-echarts></across-bar-echarts>
            </template>
            <template slot="bottom">
              <span>
                周同比&nbsp;&nbsp;12%<svg t="1661171714613" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="2211" width="20" height="20">
                  <path d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z" fill="#1afa29" p-id="2212">
                  </path>
                </svg>
              </span>
              <span>
                日同比&nbsp;&nbsp;13%<svg t="1661171854609" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="3341" width="20" height="20">
                  <path d="M512 618.666667L298.666667 405.333333h426.666666L512 618.666667z" fill="#d81e06" p-id="3342">
                  </path>
                </svg>
              </span>
            </template>
          </card-item>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineEcharts from '../LineEcharts/LineEcharts.vue'
import BarEcharts from '../BarEcharts/BarEcharts.vue';
import AcrossBarEcharts from '../AcrossBarEcharts/AcrossBarEcharts.vue';
import CardItem from '../CardItem/CardItem.vue';
export default {
  name: 'BackStageMCard',

  data() {
    return {
      
    };
  },

  components: {
    CardItem,
    LineEcharts,
    BarEcharts,
    AcrossBarEcharts 
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="css" scoped>

</style>