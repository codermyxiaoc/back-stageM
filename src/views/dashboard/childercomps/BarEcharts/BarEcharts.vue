<template>
  <div class="charts" ref="bar">
    
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'BackStageMBarEcharts',

  data() {
    return {
      
    };
  },

  mounted() {
    var barChart = echarts.init(this.$refs.bar);
    barChart.setOption({
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130, 160, 170],
          type: 'bar'
        }
      ],
      grid: {
        left: 0,
        rigth: 0,
        top: 0,
        bottom: 0
      },
      tooltip: {}
    })
  },

  methods: {
    
  },
};
</script>

<style lang="css" scoped>

.charts{
  width: 100%;
  height: 100%;
}
</style>