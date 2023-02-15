Chatbot with Flask and JavaScript

This gives 2 deployment options:

Deploy within Flask app with jinja2 template.
Deploy on Javascripy, serve only the Flask prediction API.


Install dependencies

$ (venv) pip install Flask torch torchvision nltk
Install nltk package

$ (venv) python
>>> import nltk
>>> nltk.download('punkt')
