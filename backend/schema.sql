-- Job application tracker database schema
-- Run this once against your MySQL server to create the database and table.

CREATE DATABASE IF NOT EXISTS job_tracker
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE job_tracker;

CREATE TABLE IF NOT EXISTS job_applications (
    id                INT AUTO_INCREMENT PRIMARY KEY,
    company_name      VARCHAR(255)   NOT NULL,
    position_title    VARCHAR(255)   NOT NULL,
    job_url           VARCHAR(500),
    location          VARCHAR(255),
    status            ENUM('applied', 'interview', 'offer', 'rejected', 'withdrawn')
                       NOT NULL DEFAULT 'applied',
    employment_type   VARCHAR(50),  -- e.g. Praktikum, Teilzeit, Vollzeit                   
    application_date  DATE,
    source            VARCHAR(100),  -- e.g. LinkedIn, company website, referral
    contact_person    VARCHAR(255),
    contact_email     VARCHAR(255),
    salary_range      VARCHAR(100),
    notes             TEXT,
    follow_up_date    DATE,
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Optional: an index to speed up filtering/sorting by status and date
CREATE INDEX idx_status ON job_applications (status);
CREATE INDEX idx_application_date ON job_applications (application_date);
