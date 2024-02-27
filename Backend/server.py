from flask import Flask, request, jsonify,session,redirect,url_for
from flask_cors import CORS
from proper import *  # Assuming the recommend function is defined in the movie module
from google.auth.transport import requests
from flask_bcrypt import Bcrypt
from google.auth import jwt
from pymongo import MongoClient
import secrets
from aray import *
from otp import *


app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)


app.secret_key='Scout'

df = pd.read_csv('Dataset\\tmdb.csv')

client = MongoClient('mongodb://localhost:27017')
db = client['MovieDB']
collection = db['Users']
def generate_secure_token(length=32):
    return secrets.token_hex(length)

movies = ["Movie1", "Movie2", "Movie3", "AnotherMovie", "MoreMovies"]




@app.route('/autocomplete', methods=['GET'])
def autocomplete():
    term = request.args.get('term', '')
    # Filter movies based on the input term
    suggestions = [movie for movie in movies if term.lower() in movie.lower()]
    return jsonify(suggestions)

@app.route('/')
def index():
    return redirect('/')


@app.route('/user',methods=['GET'])
def watchlist_recom():
    username = request.args.get('username')
    if username:
        user_preferences = db['Users'].find_one({"name": username}, {"_id": 0, "preferences": 1})
        if user_preferences:
            user_preferences = user_preferences.get("preferences", [])
            
            recommendations = recommend_movies_by_genre(user_preferences,df)
            movie_ids = [get_movie_id(movie) for movie in recommendations]
            mov_posters = [fetch_poster(ids) for ids in movie_ids]
            return jsonify({"recommendations": recommendations,"posters":mov_posters}), 200

    return jsonify({"error": "Invalid username"}), 400



@app.route('/signup', methods =['GET','POST'])
def signup():
    if request.method=='POST':
        body = request.form
        fname = body['firstName']
        lname = body['lastName']
        name = fname+' '+lname
        email = body['email']
        password = body['password']
        pw_hash = bcrypt.generate_password_hash(password=password).decode('utf-8')

        chk_mail = db['Users'].find_one({"email":email})
        
        if not chk_mail:
            db['Users'].insert_one({
            "name":name,
            "email":email,
            "password" : pw_hash,

            })
            
            return jsonify({
                'success':True,
                })
        else:
            return jsonify({
                'message':'An account already exists by this email, Try logging in',
                'success':False
            }),201

    if request.method == 'GET':
        allData = db['Users'].find()
        dataJson = []
        for data in allData:
            id = data['_id']
            name = data['name']
            email = data['email']

            dataDict = {
                "id":str(id),
                "name":name,
                "email":email,
            }

            dataJson.append(dataDict)
        return jsonify(dataJson)


@app.route('/login',methods=['GET','POST'])
def login():
    try:
        body = request.json
        name = body.get('name')
        password = body.get('password')

        if not name or not password:
            return jsonify({'message': 'Invalid request. Please provide both name and password.', 'success': False}),400

        user = db['Users'].find_one({"name": name})

        if user and bcrypt.check_password_hash(user['password'], password):
            # Authenticate the user

            # Set a session variable for the user
            session['user'] = {'name': name}

            return jsonify({'message': 'Login successful', 'success': True, 'username': name}),200
        else:
            return jsonify({'message': 'Invalid username or password', 'success': False}),401
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return jsonify({'message': 'Internal Server Error', 'success': False}),500

@app.route("/watchlist", methods=["GET","POST"])
def save_movie():
   
   if request.method=='POST':
        data = request.json
        username = data.get("username")
        title = data.get("title")
        poster = data.get("poster")

        if username and title and poster:
            user = db['Users'].find_one({"name": username})

            if user and title and poster:
            # Update user's movie list
                db['Users'].update_one(
                {"name": username},
                {"$push": {"movies": {"title": title, "poster": poster}}},
                    )
            else:
                pass

            return jsonify({"message": "Movie saved successfully","data":[username,title,poster]}), 200
        else:
            return jsonify({"error": "Missing data"}), 400

    
   if request.method=='GET':
       username = request.args.get('username')

       if username:
            user = db['Users'].find_one({"name": username}, {"_id": 0, "movies": 4})

            if user:
                movies = user.get('movies', [])
                return jsonify({"movies": movies})
            else:
                return jsonify({"movies": []})
       else:
            return jsonify({"error": "Username not provided"})




@app.route('/recom', methods=['GET','POST'])
def recom():
    if request.method == 'POST':
        data = request.json
        if 'movie_name' in data:  # Check if 'movie_name' exists in the request data
            movie_name = data['movie_name']
            movies = recommend(movie_name)
            return jsonify(movies)
        else:
            return jsonify({'error': 'Invalid request. Please provide a valid movie name.'}), 400
    else:
        return jsonify({'error': 'Invalid request method. Use POST to get movie recommendations.'}), 405
    

@app.route('/castdetails', methods=['GET', 'POST'])
def show():
    if request.content_type != 'application/json':
        return jsonify({'error': 'Invalid content type'}), 400
    


    if request.method=='POST':
        data=request.json
        if 'castname' in data:
            cast_name = data['castname']
            details = cast_details(cast_name)
            print(details)
            return jsonify(details)
        

@app.route('/logout', methods=['GET'])
def logout():
    # Remove the 'user' session variable
    session.pop('user', None)
    
    # Clear the remember_token in the database and remove the cookie
    user = db['Users'].find_one({"name": session.get('user', {}).get('name')})
    if user and 'remember_token' in user:
        db['Users'].update_one(
            {"name": session['user']['name']},
            {"$unset": {"remember_token": 1}}
        )
    
    # Redirect to the login page
    return redirect(url_for('login'))



@app.route('/preferences', methods=['POST'])
def preferences():
    try:
        data = request.json
        username = data.get('username')
        selected_options = data.get('selectedOptions')

        if username and selected_options:
            db['Users'].update_one(
                {"name": username},
                {"$set": {"preferences": selected_options}}
            )

            return jsonify({'message': 'Preferences updated successfully', 'options': selected_options}), 200
        else:
            return jsonify({'error': 'Invalid request. Please provide both username and selectedOptions'}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/forgotpass',methods=['GET','POST'])
def forgotpass():
    try:
        data = request.get_json()
        email = data.get('email')
        otp_entered = data.get('otp')
        password = data.get('pass')
        print(password)
        hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
        if not email:
            return jsonify({"error": "Email not provided"}), 400

        if otp_entered:
            # This is the case when the user is trying to validate the entered OTP
            otp_document = db['Users'].find_one({"email": email})
            if otp_document:
                stored_otp = otp_document.get('otp')
                print(stored_otp)  

            if stored_otp and otp_entered == stored_otp:
                db['Users'].update_one({"email": email}, {'$set': {"password": hashed_pw}})
                return jsonify({"Msg": "Password changed"})
            else:
                return jsonify({"error": "Invalid OTP"}), 401
        else:
            otp = send_otp(email)[1] 
            print(otp)
            if otp:
                db['Users'].update_one({"email":email},{'$set':{"otp":str(otp)}})
                return jsonify({"Message": otp}), 200
            else:
                return jsonify({"error": "Failed to send OTP"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True,host='127.0.0.1', port=5000)

