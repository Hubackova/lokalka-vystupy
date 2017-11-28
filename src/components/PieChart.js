import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Doughnut, Chart} from 'react-chartjs-2'

const PieChart = ({data, hasLegend}) => {
  const labels = ['Bouldery', 'Skalní jednodélky', 'Skalní vícedélky', 'Písky', 'Skalní horské výstupy', 'Mixové výstupy v horách', 'Ledy']
  const getCategory = (data) => {
    const categories = data.map(i => i.category)
    const finalValues = labels.map(j => categories.filter(i => i === j).length)
    return finalValues
  }
  const backgroundColors = ['#a6cee3', '#6a3d9a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#1f78b4']
  // '#a6cee3', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#1f78b4', '#ff7f00', '#cab2d6', '#6a3d9a', '#8c510a', '#dfc27d', '#bababa', '#4d4d4d'
  const originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw
  Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
    draw: function() {
      originalDoughnutDraw.apply(this, arguments)

      const chart = this.chart
      const width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx
      const fontSize = (height / 114).toFixed(2)
      ctx.font = fontSize + 'em sans-serif'
      ctx.textBaseline = 'middle'

      let sum = 0
      for (let i = 0; i < chart.config.data.datasets[0].data.length; i++) {
        sum += chart.config.data.datasets[0].data[i]
      }

      var text = sum,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2

      ctx.fillText(text, textX, textY)
    }
  })


  const pieData = {
    labels: labels,
    datasets: [{
      data: getCategory(data),
      backgroundColor: backgroundColors
    }],
  }

  return (
    <Doughnut
      data={pieData}
      height= {3}
      legend={{
        display: false,
        position: 'left'
      }}
      options={{
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 10,
            bottom: 10
          }
        }
      }}
      width= {7}
    />
  )
}

export default PieChart
