import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useFacts } from '../hooks/useFacts';
import DatePickerButton from '../components/DatePickerButton';
import FactsList from '../components/FactsList';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/color';

export default function HomeScreen() {
  const { facts, loading, error, selectedDate, setSelectedDate } = useFacts();
  const { theme } = useTheme();
  const palette = colors[theme];

  if (!selectedDate) {
    return (
      <View style={[styles.centered, { backgroundColor: palette.background }]}>
        <Text style={{ color: palette.text }}>Initializing...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.background }}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: palette.card,
            borderColor: palette.border,
          },
        ]}
      >
        <Text style={[styles.headerDate, { color: palette.text }]}>
          {selectedDate.toDateString()}
        </Text>
        <DatePickerButton date={selectedDate} onDateChange={setSelectedDate} />
      </View>

      <FactsList facts={facts} loading={loading} error={error} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  headerDate: {
    fontSize: 18,
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

