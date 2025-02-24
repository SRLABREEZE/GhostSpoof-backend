<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$usernameToDelete = $data["username"];

$users = file("users.txt");
$newUsers = [];

foreach ($users as $user) {
    list($username, $password, $minutes) = explode(",", trim($user));
    if ($username !== $usernameToDelete) {
        $newUsers[] = $user;
    }
}

file_put_contents("users.txt", implode("\n", $newUsers));

echo json_encode(["message" => "User deleted successfully"]);
?>
