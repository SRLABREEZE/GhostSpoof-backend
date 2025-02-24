<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
    $freeMinutes = 5;

    $file = fopen("users.txt", "a");
    fwrite($file, "$username,$password,$freeMinutes\n");
    fclose($file);

    $_SESSION["username"] = $username;
    $_SESSION["minutes"] = $freeMinutes;

    echo "Signup successful! You received 5 free minutes. <a href='../public/dashboard.html'>Go to Dashboard</a>";
}
?>
