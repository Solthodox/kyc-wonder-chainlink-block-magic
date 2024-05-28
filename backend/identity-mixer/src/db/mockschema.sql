DROP TABLE IF EXISTS Clients;
CREATE TABLE IF NOT EXISTS Clients (
    id INTEGER PRIMARY KEY,
    creator TEXT NOT NULL
);

INSERT INTO Clients (creator)
VALUES
    ('0x94aba23b9bbfe7bb62a9eb8b1215d72b5f6f33a1');

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
    submission_id TEXT NOT NULL
);

INSERT INTO Relations (address, provider_id, client_id, submission_id)
VALUES
    ('0x94aba23b9bbfe7bb62a9eb8b1215d72b5f6f33a1', '1', '1', '1gru28lw3jzo1l'),
    ('0x07fd350Bb866d1768b4eEb87B452F1669038FbD0', '1', '1', '1gru28lw3jzo1l'), 
    ('0xAc5b3317D065D0e9cbc8633F336Dc44D90090b25', '2', '1', '22ffr43234crew');

DROP TABLE IF EXISTS MockKYC;
CREATE TABLE IF NOT EXISTS MockKYC (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    yearOfBirth INTEGER NOT NULL,
    country TEXT NOT NULL,
    provider_id INTEGER NOT NULL,
    submission_id TEXT NOT NULL,
    creditScore INTEGER NOT NULL
);
