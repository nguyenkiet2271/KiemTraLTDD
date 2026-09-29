import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export interface Movie {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
}

export interface MovieCardProps {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  layout = 'row', 
  onSelect,
}) => {
  const isTile = layout === 'tile';
  const formattedRating = `⭐ ${Number(movie.rating).toFixed(1)}`;

  return (
    <TouchableOpacity
      onPress={() => onSelect(movie.id)}
      style={[styles.card, isTile && styles.cardTile]}
    >
      <View style={isTile && styles.posterWrapTile}>
        <Image
          source={{ uri: movie.poster }}
          style={[styles.poster, isTile && styles.posterTile]}
        />
        {isTile && (
          <Text style={styles.tileBadge}>{formattedRating}</Text>
        )}
      </View>

      <View style={isTile && styles.infoTile}>
        <Text numberOfLines={isTile ? 1 : undefined} style={{ fontWeight: 'bold' }}>
          {movie.title}
        </Text>
        {!isTile && (
          <>
            <Text>{movie.genre} • {movie.year}</Text>
            <Text>{formattedRating}</Text>
          </>
        )}
        <Text>{movie.isShowing ? '✅' : '❌'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 5,
  },
  poster: {
    width: 70,
    height: 100,
  },

  cardTile: {
    flexDirection: 'column',
    width: '48%',
  },
  posterWrapTile: {
    width: '100%',
    aspectRatio: 2 / 3,
  },
  posterTile: {
    width: '100%',
    height: '100%',
  },
  tileBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: '#fff',
  },
  infoTile: {
    width: '100%',
  },
});

export default React.memo(MovieCard);