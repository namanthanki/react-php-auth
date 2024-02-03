<?php

require_once("../config/headers.php");
require_once("../config/db.php");

function response($status, $message, $data = [])
{
    $response =
        [
            'status' => $status,
            'message' => $message,
            'data' => $data
        ];
    return json_encode($response);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($data) {
        $username = isset($data['username']) ? $data['username'] : '';
        $password = isset($data['password']) ? $data['password'] : '';
        $email = isset($data['email']) ? $data['email'] : '';

        global $connection;
        $query = $connection->prepare("INSERT INTO users (username, email, password) VALUES(:username, :email, :password)");
        $query->bindParam(":username", $username, PDO::PARAM_STR);
        $query->bindParam(":email", $email, PDO::PARAM_STR);
        $query->bindParam(":password", $password, PDO::PARAM_STR);

        $query->execute();

        if ($query) {
            echo response(
                'success',
                'Account registered successfully.',
                [
                    'username' => $username,
                    'email' => $email
                ]
            );
        } else {
            echo response('error', 'Internal Server Error', []);
        }
    } else {
        echo response('error', 'Something Went Wrong!', []);
        exit;
    }
}