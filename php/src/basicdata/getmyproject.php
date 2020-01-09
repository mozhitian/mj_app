<?php
require('conn.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Content-Type,Access-Token");
$i=0;
$sql="SELECT `工程名称`,`时间戳` FROM `工程项目表`";
$result=$conn->query($sql);
if($result->num_rows>0){
	while($row=$result->fetch_assoc()){
		$data[$i]['gcmc']=$row['工程名称'];
		$data[$i]['sjc']=$row['时间戳'];
		$i++;
	}
		$json = json_encode($data);
        echo $json;
}

?>