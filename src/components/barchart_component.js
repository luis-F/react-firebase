import React from 'react';
import {
  BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label,
  ResponsiveContainer
} from 'recharts';

function GraficoBarChart({data, graficoValue}){
  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          minWidth={500}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
         >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
            <Label value={graficoValue} offset={0} position="insideBottomLeft"/>
          </XAxis>
          <YAxis label={{ value: 'votantes', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend verticalAlign="top" align="right" height={36}/>
          <Bar dataKey="val" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficoBarChart;
