const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const aws = require('aws-sdk');

const app = express();
const port = 3000;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/health", function (req, res) {
    const dateNow = new Date().toString();
    const responsePayload = {
        service: 'apprunner application run',
        status: 'alive',
        timestamp: dateNow
    };
    res.json(responsePayload);
});

app.post('/createstatemachine', async(req, res) => {
    const eventDetails = req.body;
    try {
        let def = eventDetails.StateMachineFormat;
        let params = {
            name: eventDetails.StateMachineName,
            definition: JSON.stringify(def),
            roleArn: 'arn:aws:iam::213822933768:role/service-role/StepFunctions-MyStateMachine123-role-5a15b39b',
            type: 'STANDARD'
        };
        let stepfunctions = new aws.StepFunctions({region:'us-east-1'});
        const data = await stepfunctions.createStateMachine(params).promise();
        console.log(data,"My Response data");
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error);
        // Do something with the error
    }
    
});
//Request Body
/* {
  "StateMachineFormat": {
    "Comment": "A Hello World example of the Amazon States Language using an AWS Lambda Function",
    "StartAt": "HelloWorld",
    "States": {
      "HelloWorld": {
        "Type": "Task",
        "Resource": "arn:aws:lambda:us-east-1:213822933768:function:simplehelloworld",
        "End": true
      }
    }
  },
  "StateMachineName": "Mynewcreatestepfunction5"
} */
app.post('/updatestatemachine', async(req, res) => {
    const eventDetails = req.body;
    try {
        let def = eventDetails.StateMachineFormat;
        let params = {
            stateMachineArn: "arn:aws:states:us-east-1:213822933768:stateMachine:Mynewcreatestepfunction5",
            definition: JSON.stringify(def),
            roleArn: 'arn:aws:iam::213822933768:role/service-role/StepFunctions-MyStateMachine123-role-5a15b39b'
        };
        let stepfunctions = new aws.StepFunctions({region:'us-east-1'});
        const data = await stepfunctions.updateStateMachine(params).promise();
        console.log(data,"My Response data");
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error);
        // Do something with the error
    }
    
});

//Request Body
/* 
{
  "StateMachineFormat": {
    "Comment": "A Hello World example of the Amazon States Language using an AWS Lambda Function",
    "StartAt": "simplehelloworld",
    "States": {
      "simplehelloworld": {
        "Type": "Task",
        "Resource": "arn:aws:lambda:us-east-1:213822933768:function:simplehelloworld1",
        "End": true
      }
    }
  }
}
*/
app.post('/deletestatemachine', async(req, res) => {
    const eventDetails = req.body;
    try {
        let params = eventDetails;
        let stepfunctions = new aws.StepFunctions({region:'us-east-1'});
        const data = await stepfunctions.deleteStateMachine(params).promise();
        console.log(data,"My Response data");
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error);
        // Do something with the error
    }
    
});
// Request body
/*
{
    "stateMachineArn": "arn:aws:states:us-east-1:213822933768:stateMachine:Mynewcreatestepfunction5"
}
*/
app.listen(port, () => console.log(`Listening on port ${port}!`));