<?php
if (mysqli_connect_errno()){
    printf("Connect failed: %s\n",mysqli_connect_error());
    exit();
}
//return read file as string
$contents = file_get_contents("php://input");
$contents = utf8_encode($contents);
//true returns an associative array
$res = json_decode($contents, true);

$id = $res['id'];

if (!ctype_digit($id)) {
    $output['errors'][] = "Please specify a student id";
    return;
}

if (empty($id)) {
    $output['errors'][] = 'Missing ID';
    return;
}
else {

    $query = "UPDATE `student_data` SET ";
    foreach ($res as $externalField => $internalField) {
        // if the fields are not empty, append the information to the query string
        if(!empty($res[$externalField])) {
            $slashedInput = addslashes($res[$externalField]);
            $query .= "`$externalField` = '{$slashedInput}',";
        } else {
            $output['errors'][] = "Missing ".$externalField;
        }
    }
    $query = substr($query, 0, -1);
    $query .= " WHERE `id`=$id";

    if(count($output['errors']) === 0) {
        $result = mysqli_query($conn, $query);
        if (empty($result)) {
            $output['errors'][] = 'database error';
        } else {
            //if the entry is updated with new values
            if (mysqli_affected_rows($conn) === 1) {
                $output['success'] = true;
                //if the entry is submitted with same old values
            } else if(mysqli_affected_rows($conn)===0){
                $output['success'] = true;
            } else {
                $output['errors'][] = 'update error';
            }
        }
    }
}

?>
