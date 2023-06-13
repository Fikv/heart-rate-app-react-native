import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserContext } from './UserContext';


const ResultScreen = () => {
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [xAxisValues, setXAxisValues] = useState([]);
  const [values, setValues] = useState([]);
  const { login } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const requestBody = {
        userName: login,
        startDate: "2023-06-12",
        endDate: "2023-06-14",
      };

      const response = await fetch('http://192.168.0.12:8080/results/getFromDates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      const chartData = {
        labels: [],
        datasets: [
          {
            data: [],
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            strokeWidth: 2,
          },
        ],
      };

      const values = data.map(item => ({
        dateOfMeasurement: item.dateOfMeasurement,
        systolic: item.systolic,
        diastolic: item.diastolic,
        heartRate: item.heartRate,
      }));

      const xAxisValues = Object.keys(values[0]).filter(key => key !== 'dateOfMeasurement');

      values.forEach((item) => {
        chartData.labels.push(item.dateOfMeasurement);
        chartData.datasets[0].data.push(item[xAxisValues[currentIndex]]);
      });
  
      setChartData(chartData);
      setXAxisValues(xAxisValues);
      setValues(values);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date) => {
    if (date) {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    }
    return '';
  };

  const handlePrevValue = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      updateChartData();
    }
  };

  const handleNextValue = () => {
    if (currentIndex < xAxisValues.length - 1) {
      setCurrentIndex(currentIndex + 1);
      updateChartData();
    }
  };

  const updateChartData = () => {
    const updatedChartData = {
      labels: [],
      datasets: [
        {
          data: [],
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
  
    values.forEach((item) => {
      updatedChartData.labels.push(item.dateOfMeasurement);
      updatedChartData.datasets[0].data.push(item[xAxisValues[currentIndex]]);
    });
  
    setChartData(updatedChartData);
  };

  const showDatePickerFrom = () => {
    setShowDatePicker(true);
  };

  const showDatePickerTo = () => {
    setShowDatePicker(true);
  };

  const handleDateChangeFrom = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateFrom(selectedDate);
    }
  };

  const handleDateChangeTo = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateTo(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>From:</Text>
        <TouchableOpacity style={styles.datePicker} onPress={showDatePickerFrom}>
          <Text>{formatDate(dateFrom)}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dateFrom}
            mode="date"
            display="default"
            onChange={handleDateChangeFrom}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>To:</Text>
        <TouchableOpacity style={styles.datePicker} onPress={showDatePickerTo}>
          <Text>{formatDate(dateTo)}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dateTo}
            mode="date"
            display="default"
            onChange={handleDateChangeTo}
          />
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={fetchData}>
        <Text style={styles.buttonText}>Fetch Data</Text>
      </TouchableOpacity>
      <View style={styles.chartContainer}>
        {chartData ? (
          <LineChart
            data={chartData}
            width={350}
            height={300}
            chartConfig={{
              backgroundColor: '#FFFFFF',
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#000000',
              },
            }}
            bezier
            style={styles.chart}
          />
        ) : (
          <Text>Loading chart data...</Text>
        )}
      </View>
      <View style={styles.dataContainer}>
        <TouchableOpacity
          style={[styles.arrowButton, currentIndex === 0 && styles.disabledArrow]}
          onPress={handlePrevValue}
          disabled={currentIndex === 0}
        >
          <Text style={styles.arrowButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.xAxisValue}>{xAxisValues[currentIndex]}</Text>
        <TouchableOpacity
          style={[styles.arrowButton, currentIndex === xAxisValues.length - 1 && styles.disabledArrow]}
          onPress={handleNextValue}
          disabled={currentIndex === xAxisValues.length - 1}
        >
          <Text style={styles.arrowButtonText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10

  },
  label: {
    marginRight: 5,
    flex: 1
  },
  datePicker: {
    width: 300,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
  },
  button: {
    backgroundColor: '#3498DB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  arrowButton: {
    backgroundColor: '#CCCCCC',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
  disabledArrow: {
    opacity: 0.5,
  },
  arrowButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  xAxisValue: {
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default ResultScreen;
