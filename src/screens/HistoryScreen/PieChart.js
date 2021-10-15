import React from 'react';
import {
    PieChart as ChartKitPieChart,
} from 'react-native-chart-kit'
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
    }
}
  
const graphStyle = {
    marginVertical: 8,
    ...chartConfig.style
}

const height = 220;

export function PieChart({data, accessor}) {
    return (
        <ChartKitPieChart
        data={data}
        height={height}
        width={screenWidth}
        chartConfig={chartConfig}
        accessor={accessor}
        style={graphStyle}
        />
    )
}