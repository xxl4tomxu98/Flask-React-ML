import React, { useState } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
    const [isLoading, setIsloading] = useState(false);
    const [formData, setFormData] = useState({
        sepalLength: 4,
        sepalWidth: 2,
        petalLength: 1,
        petalWidth: 0
    });
    const [result, setResult] = useState("");


    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        let inputData = {...formData};
        inputData[name]=value;
        setFormData(inputData);
    }

    const handlePredictClick = (event) => {
        //const proxyurl = "https://salty-reaches-05509.herokuapp.com/";
        const url = "http://127.0.0.1:5000/prediction/";
        setIsloading(true);
        fetch(url,
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(formData)
        })  //https://salty-reaches-05509.herokuapp.com/http://127.0.0.1:5000/prediction
        .then(response => response.json())
        .then(response => {
            setResult(response.result);
            setIsloading(false);
        });
    }

    const handleCancelClick = (event) => {
        setResult("");
    }


    let sepalLengths = [];
    for (let i = 4; i <= 7; i = +(i + 0.1).toFixed(1)) {
        sepalLengths.push(<option key = {i} value = {i}>{i}</option>);
    }
    let sepalWidths = [];
    for (let i = 2; i <= 4; i = +(i + 0.1).toFixed(1)) {
        sepalWidths.push(<option key = {i} value = {i}>{i}</option>);
    }
    let petalLengths = [];
    for (let i = 1; i <= 6; i = +(i + 0.1).toFixed(1)){
        petalLengths.push(<option key = {i} value = {i}>{i}</option>);
    }
    let petalWidths = [];
    for (let i = 0.1; i <= 3; i = +(i + 0.1).toFixed(1)) {
        petalWidths.push(<option key = {i} value = {i}>{i}</option>);
    }

    return (
        <Container>
            <div>
                <h1 className="title">Iris Plant Classifier</h1>
            </div>
            <div className="content">
            <Form>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Sepal Length</Form.Label>
                        <Form.Control
                            as="select"
                            value={formData.sepalLength}
                            name="sepalLength"
                            onChange={handleChange}>
                            {sepalLengths}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Sepal Width</Form.Label>
                        <Form.Control
                            as="select"
                            value={formData.sepalWidth}
                            name="sepalWidth"
                            onChange={handleChange}>
                            {sepalWidths}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Petal Length</Form.Label>
                        <Form.Control
                            as="select"
                            value={formData.petalLength}
                            name="petalLength"
                            onChange={handleChange}>
                            {petalLengths}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Petal Width</Form.Label>
                        <Form.Control
                            as="select"
                            value={formData.petalWidth}
                            name="petalWidth"
                            onChange={handleChange}>
                            {petalWidths}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Row>
                    <Col>
                        <Button
                            block
                            variant="success"
                            disabled={isLoading}
                            onClick={!isLoading ? handlePredictClick : null}>
                            { isLoading ? 'Making prediction' : 'Predict' }
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            block
                            variant="danger"
                            disabled={isLoading}
                            onClick={handleCancelClick}>
                            Reset prediction
                        </Button>
                    </Col>
                </Row>
            </Form>
            {result === "" ? null :
                (<Row>
                    <Col className="result-container">
                        <h5 id="result">{result}</h5>
                    </Col>
                </Row>)
            }
            </div>
        </Container>
    );

}

export default App;
