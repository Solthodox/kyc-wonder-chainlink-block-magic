# Credit Score Prediction API

This repository contains a Python API that utilizes a machine learning model to predict a credit score based on various financial and credit-related inputs. The API is built using FastAPI, and it leverages a pre-trained machine learning model to generate credit score predictions.

## Table of Contents

- [Credit Score Prediction API](#credit-score-prediction-api)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Instructions](#instructions)
  - [Build](#build)
  - [Run in loop](#run-in-loop)
  - [See container list](#see-container-list)
  - [Watch logs](#watch-logs)
  - [Kill container](#kill-container)
  - [Usage](#usage)
  - [API Endpoint](#api-endpoint)
    - [`/credit` (POST)](#credit-post)
      - [Parameters](#parameters)
      - [Response](#response)
  - [Example Request](#example-request)
  - [Credits](#credits)
  - [License](#license)

## Introduction

The Credit Score Prediction API allows users to predict their credit score by providing relevant financial and credit-related data. This can be particularly useful for financial institutions, credit agencies, or individuals who want to estimate their creditworthiness. The API uses a machine learning model trained on historical credit data to provide accurate credit score predictions.

## Features

- **Easy to Use**: Simple API endpoint to predict credit scores.
- **Fast and Efficient**: Built with FastAPI for high performance.
- **Machine Learning Powered**: Utilizes a pre-trained machine learning model for predictions.

## Prerequisites

- Python 3.7 or higher
- FastAPI
- pandas
- joblib
- scikit-learn (for model training and joblib compatibility)

## Instructions

## Build

```
sudo docker build . -t ml-model-api
```

## Run in loop

```
sudo docker run -d -t --name ml-model-container -p 8080:8080 ml-model-api
```

## See container list

```
sudo docker ps
```

## Watch logs

```
docker logs -f ml-model-container
```

## Kill container

```
docker kill ml-model-container
```

## Usage

To use the API, send a POST request to the `/credit` endpoint with the required financial and credit-related data. The API will return the predicted credit score.

## API Endpoint

### `/credit` (POST)

#### Parameters

- `Annual_Income` (float): The annual income of the individual.
- `Monthly_Inhand_Salary` (float): The monthly in-hand salary of the individual.
- `Num_Bank_Accounts` (int): The number of bank accounts the individual holds.
- `Num_Credit_Card` (int): The number of credit cards the individual holds.
- `Interest_Rate` (int): The interest rate on loans or credits.
- `Num_of_Loan` (float): The number of loans the individual has.
- `Delay_from_due_date` (int): The delay from the due date in days.
- `Num_of_Delayed_Payment` (float): The number of delayed payments.
- `Credit_Mix` (int): The credit mix score.
- `Outstanding_Debt` (float): The outstanding debt amount.
- `Credit_History_Year` (int): The number of years of credit history.
- `Monthly_Balance` (float): The monthly balance amount.

#### Response

- `credit_Score` (int): The predicted credit score.

## Example Request

You can use `curl`, Postman, or any HTTP client to send a POST request to the API. Here is an example using `curl`:

```bash
curl -X POST "http://127.0.0.1:8080/credit" \
     -H "accept: application/json" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "Annual_Income=70000&Monthly_Inhand_Salary=5000&Num_Bank_Accounts=3&Num_Credit_Card=2&Interest_Rate=5&Num_of_Loan=1&Delay_from_due_date=2&Num_of_Delayed_Payment=1&Credit_Mix=1&Outstanding_Debt=10000&Credit_History_Year=5&Monthly_Balance=3000"
```

## Credits

This project is heavily inspired by and uses the work from the [Credit Score Classification](https://github.com/Prem07a/Credit-Score-Classification) repository by [Prem07a](https://github.com/Prem07a). The original repository provided the dataset and initial model training that forms the basis of this API.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
