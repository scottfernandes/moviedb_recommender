import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import requests
import pickle
from bs4 import BeautifulSoup
from flask import request

df = pd.read_csv('Dataset\\tmdb.csv')
main_features = df[['title','genres','overview','crew','keywords','cast']]
main_features.isnull().sum()
main_features.dropna(inplace=True)
main_features.isnull().sum()
sentiment = pickle.load(open('Dataset\\nlp.pkl','rb'))
vectorizer = pickle.load(open('Dataset\\transform.pkl','rb'))

df['genres']=df['genres'].apply(lambda x : x.replace("'",''))
df['genres']=df['genres'].apply(lambda x : x.replace('Science Fiction','Sci-Fi'))
df['keywords']=df['keywords'].apply(lambda x : x.replace("'",''))
df['cast']=df['cast'].apply(lambda x : x.replace("'",''))
df['cast']=df['cast'].apply(lambda x:x.replace(' ',''))
df['crew']=df['crew'].apply(lambda x:x.replace(' ',''))
df['cast']=df['cast'].apply(lambda x:x.strip('[]'))
df['genres']=df['genres'].apply(lambda x:x.strip('[]'))
df['keywords']=df['keywords'].apply(lambda x:x.strip('[]'))


df['tags']=df['overview'] + df['genres'] + df['keywords'] + df['cast'] + df['crew']


new_df = df[['id','title','tags']]

from nltk import PorterStemmer
ps = PorterStemmer()
def stem(x):
    if pd.notna(x):
        L = []
        for i in x.split():
            L.append(ps.stem(i))
        return " ".join(L)
    else:
        return x 

new_df['tags'] = new_df['tags'].apply(stem)


from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer(max_features=5000, stop_words='english')

new_df['tags'].fillna('', inplace=True)  

vectors = cv.fit_transform(new_df['tags']).toarray()

similarity = cosine_similarity(vectors)

sorted(list(enumerate(similarity[0])),reverse=True,key = lambda x:x[1])[1:12]


def get_movie_details(movie):
    genre = (df.loc[df['title']==movie]).to_string(header=False,index=False,columns=['genres'])
    overview = (main_features.loc[main_features['title']==movie]).to_string(header=False,index=False,columns=['overview']).replace(",","")
    overview  = overview.strip('[]')
    status = (df.loc[df['title']==movie]).to_string(header=False,index=False,columns=['release_date'])

    return genre,overview,status

def backdrop_poster(movie_id):
    response= requests.get('https://api.themoviedb.org/3/movie/{}?api_key=75d6f4d358afd80023fc135735da8af5&language=en-US'.format(movie_id))
    data = response.json()
    path =  "https://image.tmdb.org/t/p/w1280"+data['backdrop_path']
    return path
      
my_headers = {"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36", "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"}

def get_reviews(movie_id):
    reviews = []
    # Search for the movie
    details_url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key=75d6f4d358afd80023fc135735da8af5'
    details_response = requests.get(details_url)
    details_data = details_response.json()
    if 'imdb_id' in details_data:
        
        imdb_id = details_data['imdb_id']
        webpage =  requests.get(f'https://www.imdb.com/title/{imdb_id}/reviews?ref_=tt_urv', headers=my_headers).text
        soup = BeautifulSoup(webpage,'lxml')
        for i in range(0,10):
            reviews.append(soup.find_all(class_='text show-more__control')[i].text)
            rev = np.array(reviews)
        n = vectorizer.transform(rev)
        sent = sentiment.predict(n)
        new_sent = sent.tolist()
        for i in range(0,len(new_sent)):
            if new_sent[i]==0:
                new_sent[i] = 'Negative'
            else:
                new_sent[i] ='Positive'
        return reviews, new_sent
    else:
        print('Not found')


def recommend_movies_by_genre(preferences, df):
    # Map preferences to genres
    genre_mapping = {
        "Imaginative": "Fantasy",
        "Analytical": "Mystery",
        "Introverted": "Drama",
        "Extroverted": "Comedy",
        "Adventure Seeker": "Adventure",
        "Prefer Comfort Zone": "Drama",
        "Comfortable with and interested in new technologies.": "Science Fiction",
        "Prefers traditional or less tech-dependent approaches.": "Drama",
        "Dining Out": "Comedy",  
        "Cooking at Home": "Drama",
        "Morning Person": "Drama",  
        "Night Owl": "Thriller"
    }

    selected_genres = [genre_mapping.get(preference, "Unknown") for preference in preferences]
    
    # Filter movies based on selected genres
    recommended_movies = []
    for genre in selected_genres:
        genre_movies = df[df['genres'].str.contains(genre, case=False)]
        
        if not genre_movies.empty:
            # Sample 3 movies from each genre if the DataFrame is not empty
            recommended_movies.extend(genre_movies['title'].sample(n=min(2, len(genre_movies))).tolist())
           
    return recommended_movies
    

def fetch_poster(movie_id):
    response= requests.get('https://api.themoviedb.org/3/movie/{}?api_key=75d6f4d358afd80023fc135735da8af5&language=en-US'.format(movie_id))
    data = response.json()
    try:
        path = 'https://image.tmdb.org/t/p/w500'+data['poster_path']
        return path
    except:
        return 'https://img.pikbest.com/backgrounds/20200428/film-and-television-festival-retro-film-poster_2824252.jpg!f305cw'

def get_castcrew(movie_id):
    response = requests.get('http://api.themoviedb.org/3/movie/{}?api_key=75d6f4d358afd80023fc135735da8af5&append_to_response=credits'.format(movie_id))
    data = response.json()
    dets =  data['credits']['cast'][0:10]
    ids = [i['id'] for i in dets]
    details= []
    character = [i['character'] for i in dets]
    poster = [i['profile_path'] for i in dets]
    for i in ids:
        response2 = requests.get('https://api.themoviedb.org/3/person/{}?api_key=75d6f4d358afd80023fc135735da8af5'.format(i))
        data2 = response2.json()
        details.append(data2)
    name = [i['name'] for i in details]
    posters =[]
    for i in poster:
        if i:
            posters.append("https://image.tmdb.org/t/p/original"+i)
        else:
            posters.append('https://cdn.create.vista.com/api/media/small/377784052/stock-vector-hand-drawn-modern-man-avatar-profile-icon-portrait-icon-user')
    dets = {"name":name,"poster":posters,"character":character}
    return dets

def get_trailer(movie_id):
    response = requests.get('http://api.themoviedb.org/3/movie/{}?api_key=75d6f4d358afd80023fc135735da8af5&append_to_response=videos'.format(movie_id))
    data = response.json()
    try:
        key = data['videos']['results']
        return key
    except:
        return 'https://images.wondershare.com/recoverit/article/2020/03/Video_unavailable_Img_1.jpg'



def recommend(movie):
    movie_index = new_df[new_df['title']==movie].index[0]
    distances = similarity[movie_index]
    movie_list = sorted(list(enumerate(distances)),reverse=True,key = lambda x:x[1])[1:15]
    titles= [movie]
    ip_id = (new_df.loc[new_df['title']==movie]).to_string(header=False,index=False,columns=['id'])
    posters =[fetch_poster(ip_id)]
    backdrop = backdrop_poster(ip_id)
    trailer  = get_trailer(ip_id)
    details = get_movie_details(movie)
    creds = get_castcrew(ip_id)
    reviews = get_reviews(ip_id)
    for i in movie_list:
        title = new_df.iloc[i[0]].title
        movie_id = new_df.iloc[i[0]].id
        titles.append(title)
        posters.append(fetch_poster(movie_id))
    
    return titles,posters,backdrop,details,trailer,creds,reviews

import re


def cast_details(cast):
    
    response = requests.get('https://api.themoviedb.org/3/search/person?api_key=75d6f4d358afd80023fc135735da8af5&query={}'.format(cast))
    data = response.json()
    cast_id = data['results'][0]['id']
    response2 = requests.get('https://api.themoviedb.org/3/person/{}?api_key=75d6f4d358afd80023fc135735da8af5'.format(cast_id))
    data2 = response2.json()
    name = data2['name']
    bio = data2['biography']
    pob = data2['place_of_birth']
    poster ='https://image.tmdb.org/t/p/original'+data2['profile_path']
    dob = data2['birthday']    
    
    movies_with_actor = main_features[main_features['cast'].apply(lambda x: cast in x)]
    movies=movies_with_actor['title']
    movie_names = [re.sub(r'^\d+\s+', '', movie) for movie in movies]
    posters=[]
    for movie in movie_names:
        ip_id = (new_df.loc[new_df['title']==movie]).to_string(header=False,index=False,columns=['id'])
        posters.append(fetch_poster(ip_id))
    detailjson ={"name":name,"actor_poster":poster,"bio":bio,"pob":pob,"dob":dob,"movies":movie_names,"movie_poster":posters}
    return detailjson

def get_movie_id(movie):

    base_url = 'https://api.themoviedb.org/3/search/movie'


    params = {
        'api_key': '75d6f4d358afd80023fc135735da8af5',
        'query': movie
    }

# Make the API request
    response = requests.get(base_url, params=params)
    data = response.json()

# Extract movie ID from the response
    if 'results' in data and data['results']:
        movie_id = data['results'][0]['id']
        return movie_id
    else:
        print(f"No results found for '{movie}'")
