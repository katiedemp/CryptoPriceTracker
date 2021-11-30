import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ListItem from './components/ListItem';
import { BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import Chart from "./components/Chart";
import { getMarketdata } from "./services/cryptoService";

type selectedCoinDataType = {
  current_price: number;
  image: string;
  name: string;
  symbol: string;
  price_change_percentage_7d_in_currency: number;
  sparkline_in_7d: { price: string };
}

const ListHeader = () => (
  <>
    <View style={styles.titleWrapper}>
      <Text style={styles.largeTitle as any}>Markets</Text>
    </View>
    <View style={styles.divider}/>
  </>
)

export default function App() {
  const [data, setData] = useState<any>([]);
  const [selectedCoinData, setSelectedCoinData] = useState<selectedCoinDataType>();

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketdata();
      setData(marketData);
    }

    fetchMarketData()
  }, []);


  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['45%'], []);

  const openModal = (item: any): void => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current?.present();
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        {/* Render list items */}
        <FlatList keyExtractor={(item) => item.id} data={data} renderItem={({item}) => (
          <ListItem
            name={item.name}
            symbol={item.symbol}
            currentPrice={item.current_price}
            priceChangePercentage7d={
              item.price_change_percentage_7d_in_currency
            }
            logoUrl={item.image}
            onPress={() => openModal(item)}
          />
        )}
                  ListHeaderComponent={<ListHeader/>}
        />
      </SafeAreaView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      >
        <View style={styles.contentContainer}>
          {selectedCoinData &&
          <Chart
              currentPrice={selectedCoinData?.current_price}
              logoUrl={selectedCoinData?.image}
              name={selectedCoinData?.name}
              symbol={selectedCoinData?.symbol}
              priceChangePercentage7d={selectedCoinData?.price_change_percentage_7d_in_currency}
              sparkline={selectedCoinData?.sparkline_in_7d.price}
          />
          }
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
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
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {},
});
