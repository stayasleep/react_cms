<?php
if (mysqli_connect_errno()){
    printf("Connect failed: %s\n",mysqli_connect_error());
    exit();
}
$contents = file_get_contents("php://input");
$contents = utf8_encode($contents);
$res = json_decode($contents);
$id = $res->{'id'};

if (!ctype_digit($id)) {
    $output['errors'][] = "Please specify a student id";
    return;
}
$student = $res->{'name'};
$course = $res->{'course_name'};
$grade  = $res->{'grade'};

if (ctype_space($student) || ctype_space($course) || ctype_space($grade)) {
    $output['errors'][] = 'No empty fields allowed';
    return;
}


$updateFields = [
    'name' => 'name',
    'course_name' => 'course_name',
    'grade' => 'grade'
];

if (empty($id)) {
    $output['errors'][] = 'Missing ID';
    return;
}
else {

    $query = "UPDATE `student_data` SET ";
    foreach ($updateFields as $externalField => $internalField) {
        // if the fields are not empty, append the information to the query string
        if (!empty($res->{$externalField})) {
            $slashedInput = addslashes($res->{$externalField});
            $query .= "`$internalField` = '{$slashedInput}',";
        } else {
            $output['errors'][] = "Missing ".$externalField;
        }
    }
    $query = substr($query, 0, -1);
    $query .= " WHERE `id`=$id";
    if (count($output['errors']) === 0) {
        $result = mysqli_query($conn, $query);
        if (empty($result)) {
            $output['errors'][] = 'database error';
        } else {
            if (mysqli_affected_rows($conn) === 1) {
                $output['success'] = true;
            } else if(mysqli_affected_rows($conn)===0){
                $output['success'] = true; //orly
            } else {
                $output['errors'][] = 'update error';
            }
        }
    }
}

?>
