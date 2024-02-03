<?php

//Call API header
require_once '../config/headers.php';

unset($_SESSION['username']);
unset($_SESSION['loggedIn']);

session_destroy();

exit;