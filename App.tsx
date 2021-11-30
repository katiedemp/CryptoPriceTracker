import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListItem from './components/ListItem';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.largeTitle as any}>Markets</Text>
      </View>
      <View style={styles.divider} />

      <ListItem
        name={name}
        symbol={symbol}
        currentPrice={current_price}
        priceChangePercentage7d={price_change_percentage_7d_in_currency}
        logoUrl={image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleWrapper: {
    marginTop: 80,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A9ABB1',
    marginHorizontal: 16,
    marginTop: 16,
  },
});
