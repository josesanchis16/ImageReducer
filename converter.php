<?php


$files = $_FILES;
$filesCount = count($files);

$error = false;

if ($filesCount > 0) {

    $response = array();
    $destPath = "./convertedImages/";

    foreach ($files as $index => $file) {
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $name = $file['tmp_name'];
        $new_name = "image_$index" . "_" . time() . '.' . $extension;

        try {
            $newImage;
            switch ($extension) {
                case 'jpg':
                    $newImage = imagecreatefromjpeg($name);  //read a jpg file
                    break;
                case 'png':
                    $newImage = imagecreatefrompng($name); //read a jpg file
                    break;
                default:
                    $error = 'Image type is not valid';

            }

            if (!$error) {
                imageavif($newImage, "$destPath$new_name.avif");  //save an avif file
            }

        } catch (Exception $e) {
            $error = $e->getMessage();
            break;
        }

    }

    if ($error)
        $response = [
            "status" => false,
            "message" => $error
        ];
    else
        $response = [
            "status" => true
        ];
    echo json_encode($response);
}
