<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $users = file("users.txt");
    foreach ($users as $user) {
        list($storedUsername, $storedPassword, $storedMinutes) = explode(",", trim($user));

        if ($username == $storedUsername && password_verify($password, $storedPassword)) {
            $_SESSION["username"] = $username;
            $_SESSION["minutes"] = $storedMinutes;
            echo "Login successful! You have $storedMinutes minutes remaining. <a href='../public/dashboard.html'>Go to Dashboard</a>";
            exit;
        }
    }

    echo "Invalid username or password. <a href='../public/login.html'>Try again</a>";
}
?>
