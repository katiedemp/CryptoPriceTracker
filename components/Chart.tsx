import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { ChartDot, ChartPath, ChartPathProvider, ChartYLabel } from '@rainbow-me/animated-charts'
import { useSharedValue } from "react-native-reanimated";

type ChartProps = {
  name: string;
  symbol: string;
  currentPrice: number;
  priceChangePercentage7d: number;
  logoUrl: string;
  sparkline: any;
}

export const {width: SIZE} = Dimensions.get('window');

const Chart = ({
  name,
  symbol,
  currentPrice,
  priceChangePercentage7d,
  logoUrl,
  sparkline
}: ChartProps): JSX.Element => {
  const latestCurrentPrice = useSharedValue(currentPrice);
  const [chartReady, setChartReady] = useState(false);
  const priceChangeColour = priceChangePercentage7d > 0 ? styles.greenColor : styles.redColor;

  useEffect(() => {
    latestCurrentPrice.value = currentPrice;

    setTimeout(() => {
      setChartReady(true);
    }, 0)

  }, [currentPrice]);


  const formatUSD = (value: string) => {
    'worklet';
    if (value === '') {
      return `$${latestCurrentPrice.value.toLocaleString('en-US', {currency: 'USD'})}`;
    }

    return `$${parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  };

  return (
    <ChartPathProvider data={{points: sparkline, smoothingStrategy: 'bezier'}}>
      <View style={styles.chartWrapper}>

        {/* Titles */}
        <View style={styles.titlesWrapper}>
          <View style={styles.upperTitles}>
            <View style={styles.upperLeftTitle}>
              <Image source={{uri: logoUrl}} style={styles.image}/>
              <Text style={styles.subtitle}>{name} ({symbol.toUpperCase()})</Text>
            </View>

            <Text style={styles.subtitle}>7d</Text>
          </View>

          <View style={styles.lowerTitles}>
            <ChartYLabel
              format={formatUSD}
              style={styles.boldTitle}
            />
            <Text style={[styles.title, priceChangeColour]}>{priceChangePercentage7d.toFixed(2)}%</Text>
          </View>
        </View>
      </View>

      {/* Chart */}
      {chartReady &&
      <View style={styles.chartLineWrapper}>
          <ChartPath height={SIZE / 2} stroke="black" width={SIZE}/>
          <ChartDot style={{backgroundColor: 'black'}}/>
      </View>
      }
    </ChartPathProvider>
  );
}

const styles = StyleSheet.create({
  chartWrapper: {
    marginTop: 10,
  },
  titlesWrapper: {
    marginHorizontal: 16,
  },
  upperTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upperLeftTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  lowerTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  title: {
    fontSize: 18,
  },
  boldTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#A9ABB1'
  },
  redColor: {color: '#FF3B30'},
  greenColor: {color: '#34C759'},
  chartLineWrapper: {
    marginTop: 40,
  }
})

export default Chart;


