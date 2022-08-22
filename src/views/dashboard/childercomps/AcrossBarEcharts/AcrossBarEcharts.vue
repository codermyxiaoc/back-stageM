<template>
  <div class="charts" ref="bar">

  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'BackStageMAcrossBarEcharts',

  data() {
    return {
      
    };
  },

  mounted() {
    var myChart = echarts.init(this.$refs.bar);
    myChart.setOption({
      xAxis: {
        show: false,
        min: 0,
        max: 100
      },
      yAxis: {
        show: false,
        type: 'category'
      },
      series: [
        {
          data: [78],
          type: 'bar',
          barWidth: 10,
          showBackground: true,
          label: {
            show: true,
            formatter: '|',
            position: 'right'
          }
        },
        
      ],
      grid: {
        left: 0,
        rigth: 0,
        top: 0,
        bottom: 0
      },
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