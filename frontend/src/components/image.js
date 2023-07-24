import React, { useState, useRef } from 'react';
import ml5 from 'ml5';

const ImageClassifier = () => {
  const [prediction, setPrediction] = useState('');
  const fileInputRef = useRef(null);
  const classifierRef = useRef(null);
  const imageModelURL = './model/';

  const setupClassifier = async () => {
    classifierRef.current = await ml5.imageClassifier(imageModelURL + 'model.json');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith('image/')) {
      classifyImage(file);
    } else {
      console.error('Invalid file type. Please upload an image file.');
    }
  };

  const classifyImage = (file) => {
    const imageElement = new Image();
    imageElement.src = URL.createObjectURL(file);
    classifierRef.current.classify(imageElement, gotResult);
  };
}