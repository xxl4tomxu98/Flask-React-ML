# ML-React-Flask
It's a template on which we can build a React app and call endpoints to make predictions. It was originally forked from
"https://github.com/kb22/ML-React-App-Template".

## Technologies
- Back End
  - Flask
- Front End
  - React

### Usage
The complete guide to use this repository: https://towardsdatascience.com/create-a-complete-machine-learning-web-application-using-react-and-flask-859340bddb33

# Revised Preparation
Create-react-app to create a basic React app to begin with. Next, bootstrap is loaded which allows us to create responsive websites for each screen size. In the App.js file a form with dropdowns and Predict and Reset Prediction buttons are added. Each form property is added to state and on pressing the Predict button, the data is sent to the Flask backend. The App.css file to add style to the page.

The Flask app has a POST endpoint /prediction. It accepts the input values as a json, converts it into an array and make prediction using the classifier stored in classifier.joblib and return the prediction result as json.

Clone the repo to your computer and go inside it and open two terminals here.

In the first terminal, go inside the ui folder using cd ui. Do

    ```bash
      $ npm install
    ```
To run the UI on server, we will use serve. We will begin by installing the serve globally, post which, we’ll build our application and then finally run the UI using serve on port 3000.

    ```bash
      npm install -g serve
      npm run build
      serve -s build -l 3000
    ```
You can now go to localhost:3000 to see that the UI is up and running. But it won’t interact with the Flask service which is still not up. So, Preparing the service on the second terminal, move inside the service folder using cd service. We begin by creating a virtual environment and install dependencies using pipenv and Python 3.8.6. Finally, we’ll run the Flask app.

    ```bash
      pipenv install -r requirements.txt
      pipenv shell
      flask run
    ```
This will start up the service on 127.0.0.1:5000 backend. One can go to the localhost to test the backend via the server.


The DecisionTreeClassifier on the iris dataset which requires 4 features — Sepal Length, Sepal Width, Petal Length and Petal Width. The model is pickled to classifier.joblib using joblib.dump(). The classifier can now be used to predict on new data. In the file app.py the line classifier = joblib.load(‘classifier.joblib’) is used so that the variable classifier now holds the trained model.
