DROP TABLE IF EXISTS Clients;
CREATE TABLE IF NOT EXISTS Clients (
    id INTEGER PRIMARY KEY,
    creator TEXT NOT NULL
);

DROP TABLE IF EXISTS Providers;
CREATE TABLE IF NOT EXISTS Providers (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

INSERT INTO Providers (name)
VALUES
    ('Argos Identity');

DROP TABLE IF EXISTS Relations;
CREATE TABLE IF NOT EXISTS Relations (
    id INTEGER PRIMARY KEY,
    address TEXT NOT NULL UNIQUE,
    provider_id INTEGER NOT NULL,
    client_id INTEGER NOT NULL,
    submission_id TEXT NOT NULL,
    yearOfBirth INTEGER NOT NULL,
    countryCode INTEGER NOT NULL,
    isAdult INTEGER NOT NULL,
    creditScore INTEGER NOT NULL
);

DROP TABLE IF EXISTS MockKyc;
CREATE TABLE IF NOT EXISTS MockKyc (
    id INTEGER PRIMARY KEY,
    address TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    yearOfBirth INTEGER NOT NULL,
    country TEXT NOT NULL,
    provider_id INTEGER NOT NULL,
    submission_id TEXT NOT NULL,
    annual_Income NUMBER NOT NULL,
    monthly_Inhand_Salary NUMBER NOT NULL,
    num_Bank_Accounts INTEGER NOT NULL,
    num_Credit_Cards INTEGER NOT NULL,
    interest_Rate INTEGER NOT NULL,
    num_Loans NUMBER NOT NULL,
    delay_From_Due_Date INTEGER NOT NULL,
    num_Delayed_Payments NUMBER NOT NULL,
    credit_Mix INTEGER NOT NULL,
    outstanding_Debt NUMBER NOT NULL,
    credit_History_Year INTEGER NOT NULL,
    monthly_Balance NUMBER NOT NULL
);

