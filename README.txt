PROMPTCRAFT - AI PROMPT IMPROVER
================================

FILES
-----
index.html          Main webpage
assets/style.css    Website design and responsive layout
assets/script.js    Prompt improvement rules and browser interactions
config.php          PHP connection to MySQL
api.php             PHP endpoints to save, list and delete prompts
database.sql        Creates the database and prompts table

IMPORTANT PROJECT NOTE
----------------------
This is an AI-inspired, rule-based prompt enhancement project. It does NOT
call a trained AI model or an external AI API. JavaScript applies prompt
engineering templates to structure the user's text.

HOW TO RUN USING XAMPP
----------------------
1. Install and open XAMPP.
2. Start Apache and MySQL.
3. Extract the promptcraft folder into C:\\xampp\\htdocs\\
4. Open http://localhost/phpmyadmin in your browser.
5. Select Import, choose database.sql, and click Import/Go.
6. Open http://localhost/promptcraft/ in your browser.

DATABASE SETTINGS
-----------------
Default settings in config.php:
Host: localhost
Database: promptcraft_db
Username: root
Password: (blank)

If your MySQL username or password is different, edit config.php.

TEST
----
1. Enter: Explain cloud computing to a beginner.
2. Choose Education and Clear & simple.
3. Click Improve my prompt.
4. Click Copy prompt.
5. Click Save prompt.
6. Open Prompt History and test Delete.

NOTE
----
Open the website through localhost (XAMPP), not by double-clicking index.html.
The HTML interface can load directly, but PHP and database features require
a PHP server and MySQL.
