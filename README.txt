# ✨ PROMPTCRAFT – AI Prompt Improver

**Transform simple ideas into clear, structured and effective prompts.**

🌐 **Live Website:** http://promptcraft-demo.infy.click/  
💻 **GitHub Repository:** https://github.com/aryankindarley1906-commits/PROMPTCRAFT

---

## 📌 Project Overview

PROMPTCRAFT is an AI-inspired prompt improvement web application that converts basic user instructions into more detailed, structured and effective prompts.

It applies rule-based prompt engineering techniques to improve the clarity, context, tone and structure of user prompts.

**Important:** This project uses JavaScript-based rules and templates. It does not use a trained AI model or an external AI API.

## 🎯 Objectives

- Improve the quality and clarity of basic prompts.
- Help users write more effective instructions.
- Provide category-based and tone-based prompt improvement.
- Allow users to save, view and delete their prompt history.

## 🚀 Features

1. **Prompt Improvement:** Converts simple prompts into structured instructions.
2. **Category Selection:** Supports General, Education, Coding, Writing, Business and Creative categories.
3. **Tone Selection:** Offers Clear and Simple, Professional, Creative, Technical and Friendly tones.
4. **Copy Prompt:** Allows users to copy the improved prompt.
5. **Save Prompt:** Stores prompts in a MySQL database.
6. **Prompt History:** Displays previously saved prompts.
7. **Delete Prompt:** Allows users to remove saved prompts.
8. **Responsive Interface:** Provides a dark-themed interface that adapts to different screen sizes.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML | Webpage structure |
| CSS | Styling and responsive design |
| JavaScript | Prompt improvement and user interactions |
| PHP | Backend processing and database operations |
| MySQL | Storing prompt history |
| XAMPP | Local development environment |
| InfinityFree | Free PHP and MySQL web hosting |
| GitHub | Source code management |

## 📁 Project Structure

```text
PROMPTCRAFT/
│
├── index.html
├── index.php
├── api.php
├── config.example.php
├── database.sql
├── .gitignore
├── README.md
│
└── assets/
    ├── style.css
    └── script.js
```

**Note:** The actual `config.php` contains private database credentials. It is kept out of the public GitHub repository.

## ⚙️ How to Run Locally Using XAMPP

1. Install and open XAMPP.
2. Start Apache and MySQL.
3. Extract the project folder into `C:\xampp\htdocs\`.
4. Open `http://localhost/phpmyadmin`.
5. Import the `database.sql` file.
6. Configure the database connection in `config.php`.
7. Open the website:

   `http://localhost/promptcraft/`

## 🌐 Online Deployment

PROMPTCRAFT is deployed using InfinityFree hosting.

**Live Website:** http://promptcraft-demo.infy.click/

The online deployment uses:
- PHP hosting for backend operations.
- MySQL for database storage.
- A hosting-specific database configuration.
- Uploaded website files through the hosting File Manager.

## 🧪 Testing

The following functionalities can be tested:

1. Enter a basic prompt such as: "Explain cloud computing to a beginner."
2. Select the Education category.
3. Choose the Clear and Simple tone.
4. Click Improve My Prompt.
5. Copy the generated prompt.
6. Save the prompt.
7. Open Prompt History.
8. Refresh the page and verify that the saved prompt remains.
9. Delete the saved prompt and verify its removal.

## 🔐 Security

- Database credentials are not published in the public repository.
- `config.example.php` provides placeholder database settings.
- `.gitignore` excludes the private `config.php` file.
- PHP uses prepared statements for database operations.

## 📚 Learning Outcomes

Through this project, we learned:

- Frontend website development using HTML, CSS and JavaScript.
- Backend development using PHP.
- Database creation and integration using MySQL.
- Basic prompt engineering techniques.
- Testing and debugging web applications.
- Hosting and deploying a PHP-based web application.
- Managing project source code using GitHub.

## 👨‍💻 Project Information

**Project Name:** PROMPTCRAFT – AI Prompt Improver  
**Project Domain:** Artificial Intelligence  
**Project Type:** Web Technology Mini Project  
**Development Stack:** HTML, CSS, JavaScript, PHP and MySQL

---

**PROMPTCRAFT – Make Every Prompt Count! ✨**
