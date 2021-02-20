import React from 'react'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsMore from 'highcharts/highcharts-more'

import SummeryWidget from './SummeryWidget'

import axios from 'axios'
HighchartsMore(Highcharts)
const Widget = ({
  widgetType,
  chartType,
  semester,
  grade,
  subject,
  student,
  year,
}) => {
  const [chartData, setChartData] = useState([])
  const subjectList = useSelector((state) => state.subjectList)

  // calculate median
  const setMedian = (values) => {
    if (values.length === 0) return 0

    values.sort(function (a, b) {
      return a - b
    })

    var half = Math.floor(values.length / 2)

    if (values.length % 2) return values[half]

    return (values[half - 1] + values[half]) / 2.0
  }

  // filter values
  const filterNumbers = (values, median, type) => {
    if (type == 'greater') {
      var predicate = (x) => x <= median
    } else if (type == 'lesser') {
      var predicate = (x) => x >= median
    }
    var output = values.filter(predicate)
    return values.filter((x) => !predicate(x))
  }

  useEffect(() => {
    getChartsData()
  }, [])

  const getChartsData = async () => {
    const widgetData = await fetchWidgetData()

    const { subjects } = subjectList

    const subjectsArr = subjects.map((subject) => {
      return subject.name
    })

    if (chartType == 1) {
      const avg = widgetData.map((wd) => {
        return wd.avg
      })

      const sum = widgetData.map((wd) => {
        return wd.sum
      })

      setChartData({
        chart: {
          zoomType: 'xy',
        },
        title: {
          text: 'Marks for Subjects',
        },
        xAxis: [
          {
            categories: subjectsArr,
            crosshair: true,
          },
        ],
        yAxis: [
          {
            // Primary yAxis
            labels: {
              format: '{value}',
              style: {
                color: Highcharts.getOptions().colors[1],
              },
            },
            title: {
              text: 'Average',
              style: {
                color: Highcharts.getOptions().colors[1],
              },
            },
          },
          {
            // Secondary yAxis
            title: {
              text: 'Marks',
              style: {
                color: Highcharts.getOptions().colors[0],
              },
            },
            labels: {
              format: '{value}',
              style: {
                color: Highcharts.getOptions().colors[0],
              },
            },
            opposite: true,
          },
        ],
        tooltip: {
          shared: true,
        },
        legend: {
          layout: 'vertical',
          align: 'left',
          x: 120,
          verticalAlign: 'top',
          y: 100,
          floating: true,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || // theme
            'rgba(255,255,255,0.25)',
        },
        series: [
          {
            name: 'Marks',
            type: 'column',
            yAxis: 1,
            data: sum,
            tooltip: {
              valueSuffix: ' ',
            },
          },
          {
            name: 'Average',
            type: 'spline',
            data: avg,
            tooltip: {
              valueSuffix: '',
            },
          },
        ],
      })
    } else if (chartType == 2) {
      setChartData({
        chart: {
          type: 'boxplot',
        },

        title: {
          text: 'Marks for Different Subjects',
        },

        legend: {
          enabled: false,
        },

        xAxis: {
          categories: student,
          title: {
            text: 'Student ID',
          },
        },

        yAxis: {
          title: {
            text: 'Observations',
          },
          plotLines: [
            {
              value: 932,
              color: 'red',
              width: 1,
              label: {
                text: 'Theoretical mean: 932',
                align: 'center',
                style: {
                  color: 'gray',
                },
              },
            },
          ],
        },

        series: [
          {
            name: 'Observations',
            data: widgetData,
            tooltip: {
              headerFormat: '<em>Experiment No {point.key}</em><br/>',
            },
          },
          {
            name: 'Outliers',
            color: Highcharts.getOptions().colors[0],
            type: 'scatter',
            data: [
              // x, y positions where 0 is the first category
              [0, 644],
              [4, 718],
              [4, 951],
              [4, 969],
            ],
            marker: {
              fillColor: 'white',
              lineWidth: 1,
              lineColor: Highcharts.getOptions().colors[0],
            },
            tooltip: {
              pointFormat: 'Observation: {point.y}',
            },
          },
        ],
      })
    } else if (chartType == 3) {
      setChartData({
        chart: {
          type: 'column',
        },
        title: {
          text: 'Marks for Subjects',
        },
        xAxis: {
          categories: subjectsArr,
          // crosshair: true,
        },
        yAxis: {
          min: 0,
          max: 100,
          title: {
            text: 'Marks',
          },
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series._id}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        series: [widgetData],
      })
    } else if (widgetType == 2) {
      setChartData(widgetData)
    }
  }

  // Fetch data from the api
  const fetchWidgetData = async () => {
    if (chartType == 1) {
      const { data } = await axios.get('/api/data/chart1', {
        params: {
          year: year,
          semester: semester,
          grade: grade,
        },
      })

      return data
    } else if (chartType == 2) {
      const { data } = await axios.get('/api/data/chart2', {
        params: {
          year: year,
          semester: semester,
          grade: grade,
          student: student,
          subject: subject,
        },
      })

      let formatData = data.map((d) => {
        let median = setMedian(d.data)

        let min = Math.min(...d.data)
        let max = Math.max(...d.data)

        let lowerValues = filterNumbers(d.data, median, 'lesser')
        let lesserMedian = setMedian(lowerValues)

        let higherValues = filterNumbers(d.data, median, 'greater')
        let higherMedian = setMedian(higherValues)

        return [min, lesserMedian, median, higherMedian, max]
      })

      return formatData
    } else if (chartType == 3) {
      const { data } = await axios.get('/api/data/chart3', {
        params: {
          student: student,
        },
      })
      return data
    } else if (widgetType == 2) {
      const { data } = await axios.get('/api/data/summery', {
        params: {
          year: year,
          semester: semester,
          grade: grade,
          student: student,
          subject: subject,
        },
      })
      return data
    }
  }

  return (
    <div>
      {widgetType == 1 ? (
        <HighchartsReact highcharts={Highcharts} options={chartData} />
      ) : widgetType == 2 && subject && student ? (
        <SummeryWidget
          options={chartData}
          subject={subject}
          student={student}
        />
      ) : (
        ''
      )}
    </div>
  )
}

export default Widget
