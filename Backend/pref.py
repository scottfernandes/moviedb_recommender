def map_preferences_to_genres(preferences):
    # Map user preferences to movie genres
    # Adjust this logic based on your mapping requirements
    genre_mapping = {
        "Imaginative": "Fantasy",
        "Analytical": "Mystery",
        "Introverted": "Drama",
        "Extroverted": "Comedy",
        "Adventure Seeker": "Adventure",
        "Prefer Comfort Zone": "Drama",
        "Comfortable with and interested in new technologies.": "Science Fiction",
        "Prefers traditional or less tech-dependent approaches.": "Drama"
    }

    genres = [genre_mapping.get(preference, "Unknown") for preference in preferences]
    return list(set(genres))  # Remove duplicates if any



def recommend_movies_by_genres(genres):
    # Adjust this logic based on how you want to recommend movies by genres
    # This is just a placeholder logic
    recommended_movies = []

    for genre in genres:
        genre_movies = get_movies_by_genre(genre)
        recommended_movies.extend(genre_movies)

    return recommended_movies


def get_movies_by_genre(genre):
    # Implement logic to fetch movies by genre from your dataset or API
    # Placeholder logic - just returning some sample movies
    movies_by_genre = [
        {"title": "Movie1", "poster": "poster1.jpg"},
        {"title": "Movie2", "poster": "poster2.jpg"},
        # Add more movies as needed
    ]

    return movies_by_genre

