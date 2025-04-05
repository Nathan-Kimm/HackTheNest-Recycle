import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np
import os
from tensorflow.keras.preprocessing import image
import matplotlib.pyplot as plt


datasetRecycleCodes = "datasets"
recycleCodeLabels = ['1', '2', '3', '4', '5', '6', '7', '8']

img_height = 180
img_width = 180
batch_size = 32

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/', methods=['POST'])
def submit():
    data = request.get_json()
    # print(data)
    return jsonify({'message': 'Data received successfully'})

if __name__ == '__main__':
    app.run(debug=True)
