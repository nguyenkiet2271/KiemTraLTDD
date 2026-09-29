import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Switch,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MovieCard, { Movie } from './components/MovieCard';

const API_URL = 'https://6abb5fabb2118ed7abb86697.mockapi.io/movies';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const [isGrid, setIsGrid] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: Movie[]) => {
        setMovies(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSelect = (id: string) => {
    const selected = movies.find((m) => String(m.id) === String(id));
    if (selected) {
      Alert.alert('Thông báo', selected.title);
    }
  };

  const numColumns = isGrid ? 2 : 1;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Movie App</Text>
          <View style={styles.switchBox}>
            <Text>Dạng lưới</Text>
            <Switch value={isGrid} onValueChange={setIsGrid} />
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            key={String(numColumns)}
            data={movies}
            keyExtractor={(item) => String(item.id)}
            numColumns={numColumns}
            columnWrapperStyle={isGrid ? styles.columnWrapper : undefined}
            renderItem={({ item }) => (
              <MovieCard
                movie={item}
                layout={isGrid ? 'tile' : 'row'}
                onSelect={handleSelect}
              />
            )}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  switchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
});