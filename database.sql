CREATE DATABASE IF NOT EXISTS promptcraft_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE promptcraft_db;

CREATE TABLE IF NOT EXISTS prompts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_token VARCHAR(64) NOT NULL,
  original_prompt TEXT NOT NULL,
  improved_prompt MEDIUMTEXT NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'General',
  tone VARCHAR(50) NOT NULL DEFAULT 'Clear and simple',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_session_token (session_token)
);
