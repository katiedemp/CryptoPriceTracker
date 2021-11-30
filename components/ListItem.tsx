import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

type ListItemProps = {
  name: string;
  symbol: string;
  currentPrice: number;
  priceChangePercentage7d: number;
  logoUrl: string;
};

const ListItem = ({
  name,
  symbol,
  currentPrice,
  priceChangePercentage7d,
  logoUrl,
}: ListItemProps): JSX.Element => {
  const priceChangeColour = priceChangePercentage7d > 0 ? styles.greenColor : styles.redColor;
  return (
    <TouchableOpacity>
      <View style={styles.itemWrapper}>
        {/* Left Side */}
        <View style={styles.leftWrapper}>
          <Image style={styles.image} source={{ logoUrl }} />
          <View style={styles.titlesWrapper}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{symbol.toUpperCase()}</Text>
          </View>
        </View>

        {/* Right Side */}
        <View style={styles.rightWrapper}>
          <Text style={styles.title}>${currentPrice.toLocaleString('en-US', {currency: 'USD'})}</Text>
          <Text style={[styles.subtitle, priceChangeColour]}>
            {priceChangePercentage7d.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    paddingHorizontal: 16,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 48,
    width: 48,
  },
  titlesWrapper: {
    marginLeft: 8,
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#A9ABB1',
  },
  rightWrapper: {
    alignItems: 'flex-end',
  },
  redColor: { color: '#FF3B30' },
  greenColor: { color: '#34C759'},
});

export default ListItem;
