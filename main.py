from flask import Flask, render_template, jsonify
import pandas as pd
from sklearn.cluster import KMeans

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/api/clusters")
#Sätter upp en ny route för att hantera clusters.
def get_clusters():
    #Bygger en funktionen get_clusters och börjar med att läsa in csv filen
    df = pd.read_csv("static/data/school_locations.csv")
    #Döper om kolumnerna till lat och lon för enkelheten.
    df = df.rename(columns={"ycoord": "lat", "xcoord": "lon"})
    #Ser till att spara ner kordinaterna i variabeln coords och hämtar informantion från datamängden
    coords = df[["lat", "lon"]]
    #Använder kmeans för klustra skolorna och delar upp de i 3 grupper. 
    kmeans = KMeans(n_clusters=3, random_state=42).fit(coords)
    #Lägger till en kolumnen i dataframen som heter cluster för att kunna se deras klustertillhörighet. 
    df["cluster"] = kmeans.labels_
    #Retunerar hela dataframen som en JSON-array och varje skola en klustertillhörighet. 
    return jsonify(df.to_dict(orient="records"))

if __name__ == '__main__':
    app.run(debug=True)