import React from 'react';
import { EventEmitter, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ListItemProps = {
  name: string;
  symbol: string;
  currentPrice: number;
  priceChangePercentage7d: number;
  logoUrl: string;
  onPress: EventEmitter;
};

const ListItem = ({
  name,
  symbol,
  currentPrice,
  priceChangePercentage7d,
  logoUrl,
  onPress,
}: ListItemProps): JSX.Element => {
  const priceChangeColour = priceChangePercentage7d > 0 ? styles.greenColor : styles.redColor;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemWrapper}>
        {/* Left Side */}
        <View style={styles.leftWrapper}>
          <Image source={{uri: logoUrl}} style={styles.image}/>
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
  redColor: {color: '#FF3B30'},
  greenColor: {color: '#34C759'},
});

export default ListItem;
