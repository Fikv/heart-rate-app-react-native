import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const ResultScreen = () => {
  const [dateFrom, setDateFrom] = React.useState('');
  const [dateTo, setDateTo] = React.useState('');

  const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        data: [4, 5, 6, 7, 8, 9],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [2, 3, 4, 5, 6, 7],
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [1, 2, 3, 4, 5, 6],
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>From:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDateFrom}
          value={dateFrom}
          placeholder="Enter start date"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>To:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDateTo}
          value={dateTo}
          placeholder="Enter end date"
        />
      </View>
      <LineChart
        data={data}
        width={350}
        height={220}
        yAxisSuffix=" bpm"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  chart: {
    marginTop: 20,
    marginLeft: -20,
  },
});

export default ResultScreen;