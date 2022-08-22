<template>
  <div ref="line" class="charts">

    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'BackStageMLineEcharts',

  data() {
    return {
      
    };
  },

  mounted() {
    let lineChart = echarts.init(this.$refs.line);
    lineChart.setOption({
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series:[
        {
          data: [50, 20, 30,9, 24, 16, 30, 25],
          type: 'line',
          itemStyle: {
            opacity: 0
          },
          lineStyle: {
            color: 'purple'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'purple' // 0% 处的颜色
              }, {
                offset: 1, color: '#fff' // 100% 处的颜色
              }],
              global: false
            }
          },
          smooth: true
        }
      ],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    })
  },

  methods: {
    
  },
};
</script>

<style lang="css" scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>