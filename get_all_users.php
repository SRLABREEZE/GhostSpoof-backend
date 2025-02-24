<?php
header("Content-Type: application/json");

$users = file("users.txt");
$userArray = [];

foreach ($users as $user) {
    list($username, $password, $minutes) = explode(",", trim($user));
    $userArray[] = ["username" => $username, "minutes" => $minutes];
}

echo json_encode($userArray);
?>
