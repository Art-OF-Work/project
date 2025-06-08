-- SQL schema for user management in PostgreSQL

-- Enum type for user roles
CREATE TYPE user_role AS ENUM ('patient', 'doctor', 'secretary', 'admin');

-- Users table: stores common information for all users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,  -- Unique ID, auto-incrementing
    username VARCHAR(255) UNIQUE NOT NULL, -- Username, must be unique
    password_hash VARCHAR(255) NOT NULL,    -- Hashed password
    email VARCHAR(255) UNIQUE NOT NULL,     -- Email address, must be unique
    role user_role NOT NULL,                -- Role (patient, doctor, secretary, admin)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Creation timestamp
    last_login_at TIMESTAMP WITH TIME ZONE   -- Last login timestamp
);

-- Patients table: stores patient-specific information
CREATE TABLE patients (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, -- Foreign key linking to users table
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(50),
    phone_number VARCHAR(50),
    address TEXT
);

-- Doctors table: stores doctor-specific information
CREATE TABLE doctors (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, -- Foreign key linking to users table
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    specialization VARCHAR(255),
    phone_number VARCHAR(50),
    address TEXT,
    license_number VARCHAR(255) UNIQUE NOT NULL
);

-- Secretaries table: stores secretary-specific information
CREATE TABLE secretaries (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, -- Foreign key linking to users table
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50),
    address TEXT
);

-- Administrators table: stores administrator-specific information
CREATE TABLE administrators (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, -- Foreign key linking to users table
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50),
    address TEXT
);

-- Indexes for frequently queried columns (optional, but good for performance)
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_patients_last_name ON patients(last_name);
CREATE INDEX idx_doctors_specialization ON doctors(specialization);
CREATE INDEX idx_doctors_last_name ON doctors(last_name);