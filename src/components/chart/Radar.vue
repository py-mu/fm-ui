<template>
    <v-chart :forceFit="true" height="400" :data="data" :padding="[20, 20, 95, 20]" :scale="scale">
      <v-tooltip  />
      <v-axis :dataKey="axis1Opts.dataKey" :line="axis1Opts.line" :tickLine="axis1Opts.tickLine" :grid="axis1Opts.grid" />
      <v-axis :dataKey="axis2Opts.dataKey" :line="axis2Opts.line" :tickLine="axis2Opts.tickLine" :grid="axis2Opts.grid" />
      <v-legend dataKey="user" marker="circle" :offset="30" />
      <v-coord type="polar" radius="0.8" />
      <v-line position="item*score" color="user" :size="2" />
      <v-point position="item*score" color="user" :size="4" shape="circle" />
    </v-chart>
</template>

<script>
const DataSet = require('@antv/data-set')

const sourceData = [
  {item: 'GET', admin: 70, b: 30, c: 40},
  {item: 'POST', admin: 60, b: 70, c: 40},
  {item: 'PUT', admin: 50, b: 60, c: 40},
  {item: 'PATCH', admin: 40, b: 50, c: 40},
  {item: 'DELETE', admin: 60, b: 70, c: 40},
  // {item: '引用', a: 70, b: 50, c: 40}
]

const dv = new DataSet.View().source(sourceData)
dv.transform({
  type: 'fold',
  fields: ['admin', 'guest', 'user1'],
  key: 'user',
  value: 'score'
})

const scale = [{
  dataKey: 'score',
  min: 0,
  max: 80
}]

const data = dv.rows

const axis1Opts = {
  dataKey: 'item',
  line: null,
  tickLine: null,
  grid: {
    lineStyle: {
      lineDash: null
    },
    hideFirstLine: false
  }
}
const axis2Opts = {
  dataKey: 'score',
  line: null,
  tickLine: null,
  grid: {
    type: 'polygon',
    lineStyle: {
      lineDash: null
    }
  }
}

/**
 * 雷达图
 */
export default {
  name: 'RadarView',
  data () {
    return {
      sourceData,
      data,
      axis1Opts,
      axis2Opts,
      scale
    }
  }
}
</script>

<style scoped>

</style>
