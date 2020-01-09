<?php
require('conn.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Content-Type,Access-Token");
$sjc=$_POST['sjc'];
$j=0;
$state=['a2&b','a2&r','a3&b','a3&g','a3&r','a4&b','a4&r','a5&b','a5&g','a6&b'];
for($i=0;$i<count($state);$i++){
	$sql="SELECT 委托日期 FROM `委托单信息` where 时间戳='".$sjc."' and 所处状态='".$state[$i]."'";
	$result=$conn->query($sql);
	if($result->num_rows>0){
			while($row=$result->fetch_assoc()){
				$data[$j]=$row['委托日期'];
				$j++;
			}
	}
}
$json = json_encode($data);
echo $json;


?>