from flask import Flask, render_template, request, jsonify
import tensorflow as tf
from tensorflow.python.keras import layers, models
import numpy as np
import os
from keras._tf_keras.keras.preprocessing import image
import matplotlib.pyplot as plt


def train_recycle_codes():
    datasetRecycleCodesPath = "datasets"

    img_height = 180
    img_width = 180
    batch_size = 32

    fullDataset = tf.keras.preprocessing.image_dataset_from_directory(
        datasetRecycleCodesPath,
        image_size=(img_height, img_width),
        batch_size=batch_size,
        shuffle=True
    )

    AUTOTUNE = tf.data.AUTOTUNE
    fullDataset = fullDataset.cache().shuffle(1000).prefetch(buffer_size=AUTOTUNE)

    recycleLabels = ['1', '2', '3', '4', '5', '6', '7', '8']

    model = tf.keras.models.Sequential([
        tf.keras.layers.Rescaling(1./255, input_shape=(img_height, img_width, 3)),
        tf.keras.layers.Conv2D(32, 3, activation='relu'),
        tf.keras.layers.MaxPooling2D(),
        tf.keras.layers.Conv2D(64, 3, activation='relu'),
        tf.keras.layers.MaxPooling2D(),
        tf.keras.layers.Conv2D(128, 3, activation='relu'),
        tf.keras.layers.MaxPooling2D(),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dense(len(recycleLabels))
    ])

    model.compile(optimizer='adam',
        loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
        metrics=['accuracy'])

    model.fit(fullDataset, epochs=1)

train_recycle_codes()

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/scan')
def scan():
    return render_template('scan.html')

@app.route('/report')
def report():
    return render_template('report.html')

@app.route('/map')
def map():
    return render_template('map.html')

@app.route('/', methods=['POST'])
def submit():
    data = request.get_json()
    base64_image = data['image'].split(',')[1]
    print(base64_image)
    return jsonify({'message': 'Data received successfully'})
    
if __name__ == '__main__':
    app.run(debug=True)
