import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import ListItem from './components/ListItem';
import { SAMPLE_DATA } from './assets/data/sampleData.js';

const ListHeader = () => (
    <>
        <View style={styles.titleWrapper}>
            <Text style={styles.largeTitle as any}>Markets</Text>
        </View>
        <View style={styles.divider} />
    </>
)

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        {/* Render list items */}
        <FlatList keyExtractor={(item) => item.id} data={SAMPLE_DATA} renderItem={({item}) => (
            <ListItem
                name={item.name}
                symbol={item.symbol}
                currentPrice={item.current_price}
                priceChangePercentage7d={
                    item.price_change_percentage_7d_in_currency
                }
                logoUrl={item.image}
            />
        )}
        ListHeaderComponent={<ListHeader />}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleWrapper: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#A9ABB1',
    marginHorizontal: 16,
    marginTop: 16,
  },
});
