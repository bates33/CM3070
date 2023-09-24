from flask import Flask, render_template, request, jsonify, url_for
from markupsafe import Markup
import pickle
import random  # Import the random module
import csv     # Import the csv module

app = Flask(__name__)

# Load the model and vectorizer
pickle_in = open('pickle/model.pickle', 'rb')
pac = pickle.load(pickle_in)
tfid = open('pickle/tfid.pickle', 'rb')
tfidf_vectorizer = pickle.load(tfid)

# Function to load news data from CSV
def load_news_data():
    with open('news.csv', 'r', encoding='utf-8') as csv_file:
        csv_reader = csv.reader(csv_file)
        news_data = [row[2] for row in csv_reader if row]
    return news_data

# Function to load news data from CSV
def load_headline():
    with open('news.csv', 'r', encoding='utf-8') as csv_file:
        csv_reader = csv.reader(csv_file)
        news_data = [row[1] for row in csv_reader if row]
    return news_data

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/newscheck')
def newscheck():    
    abc = request.args.get('news')    
    input_data = [abc.rstrip()]
    # Transforming input
    tfidf_test = tfidf_vectorizer.transform(input_data)
    # Predicting the input
    y_pred = pac.predict(tfidf_test)
    return jsonify(result=y_pred[0])

@app.route('/get_random_news', methods=['GET'])
def get_random_news():
    news_data = load_news_data()
    random_news = random.choice(news_data)
    return jsonify(random_news=random_news.replace('{', '{{').replace('}', '}}'))
@app.route('/get_headline', methods=['GET'])
def get_headline():
    news_data = load_headline()
    random_news = random.choice(news_data)
    return jsonify(random_news=random_news.replace('{', '{{').replace('}', '}}'))

if __name__ == '__main__':
    app.run(debug=True)