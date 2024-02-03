<?php

require_once("../config/headers.php");
require_once("../config/db.php");

function response($status, $message, $data = []) {
    $response = [
        'status' => $status,
        'message' => $message,
        'data' => $data,
    ];

    return json_encode($response);
}

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    if($data) {
        $email = isset($data['email']) ? $data['email'] : '';
        $password = isset($data['password']) ? $data['password'] : '';

        if (!$data || empty($data['email']) || empty($data['password'])) 
        {
            echo response('error', 'Missing required fields.', []);
            exit;
        }

        $email = $data['email'];
        $password = $data['password'];
       
        $sql = "SELECT * FROM users WHERE email = '$email'";
        $query = $connection->prepare($sql);
        $query->execute();
        $row = $query->fetch(PDO::FETCH_ASSOC);
        
        $match_password = $row['password'];
        if($password == $match_password)
        {
            session_start();
            $_SESSION['username'] = $row['username'];
            $username = $_SESSION['username'];
            echo response('success', 'Logged in Successfully.', ['username' => $_SESSION['username']]);
        }
        else 
        {
            echo response('error', "Invalid Credentials", []);
            exit;
        }
    }
}


