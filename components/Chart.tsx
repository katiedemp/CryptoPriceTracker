import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type ChartProps = {
  name: string;
  symbol: string;
  currentPrice: number;
  priceChangePercentage7d: number;
  logoUrl: string;
  sparkline: any;
}

const Chart = ({
  name,
  symbol,
  currentPrice,
  priceChangePercentage7d,
  logoUrl,
  sparkline
}: ChartProps): JSX.Element => {
  const priceChangeColour = priceChangePercentage7d > 0 ? styles.greenColor : styles.redColor;

  return (
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
          <Text style={styles.boldTitle}>${currentPrice.toLocaleString('en-US', {currency: 'USD'})}</Text>
          <Text style={[styles.title, priceChangeColour]}>{priceChangePercentage7d.toFixed(2)}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartWrapper: {
    margin: 16,
  },
  titlesWrapper: {},
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
})

export default Chart;


