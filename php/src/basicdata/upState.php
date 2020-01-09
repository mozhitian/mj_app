<?php
require('conn.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Content-Type,Access-Token");
$flag=$_POST['flag'];
$id=$_POST['id'];
if($flag=='a1&b'){
	$state='a2&b';
	$sql='UPDATE `检测项目表` SET 所处状态="'.$state.'",委托签名="'.$filenames.'" WHERE id="'.$id.'"';
}else if($flag=='a2&b'){
	$flage=$_POST['flage'];
	if($flage=='1'){
		$state='a3&g';
		$rwzt='试验';
	}else{
		$state='a4&b';
		$rwzt='延期';
	}
	$sql='UPDATE `检测项目表` SET 所处状态="'.$state.'",任务状态="'.$rwzt.'" WHERE id="'.$id.'"';
}
else if($flag=='a3&g'){
	$flage=$_POST['flage'];
	if($flage==1){
		$state='';
	}else{
		$state='a5&g';
	}
	$sql='UPDATE `检测项目表` SET 所处状态="'.$state.'",检测签名="'.$filenames.'" WHERE id="'.$id.'"';
	
}else if($flag=='a3&b'){
	$flage=$_POST['flage'];
	if($flage==1){
		$state='';
	}else{
		$state='a5&b';
	}
	$sql='UPDATE `检测项目表` SET 所处状态="'.$state.'",检测签名="'.$filenames.'" WHERE id="'.$id.'"';
	
}else if($flag=='a4&b'){
	$flage=$_POST['flage'];
	if($flage=='1'){
		$state='a3&g';
		$rwzt='试验';
	}else{
		$state='a4&r';
		$rwzt='二次延期';
	}
	$sql='UPDATE `检测项目表` SET 所处状态="'.$state.'",任务状态="'.$rwzt.'" WHERE id="'.$id.'"';
}else if($flag=='a4&r'){
	$state='a3&g';
	$rwzt='试验';
	$sql='UPDATE `检测项目表` SET 所处状态="'.$state.'",任务状态="'.$rwzt.'" WHERE id="'.$id.'"';
}else if($flag=='a5&g'){
	$flage=$_POST['flage'];
	if($flage==1){
		$state='a3&g';
	}else{
		$state='a5&g';
	}
	$sql='UPDATE `检测项目表` SET 所处状态="'.$state.'",记录签名="'.$filenames.'" WHERE id="'.$id.'"';
}else if($flag=='a5&b'){
	$flage=$_POST['flage'];
	if($flage==1){
		$state='a3&r';
	}else{
		$state='a6&b';
	}
	$sql='UPDATE `检测项目表` SET 所处状态="'.$state.'",记录签名="'.$filenames.'" WHERE id="'.$id.'"';
	
}else if($flag=='a6&b'){
	$flage=$_POST['flage'];
	if($flage==1){
		$state='a5&r';
	}else{
		$state='a7&b';
	}
	$sql='UPDATE `检测项目表` SET 所处状态="'.$state.'",复核签名="'.$filenames.'" WHERE id="'.$id.'"';
}else if($flag=='a7&b'){
	$state='a8&b';
	$sql='UPDATE `检测项目表` SET 所处状态="'.$state.'" WHERE id="'.$id.'"';
}else if($flag=='a8&b'){
	$flage=$_POST['flage'];
	if($flage==1){
		$state='a7&r';
	}else{
		$state='a9&b';
	}
	$sql='UPDATE `检测项目表` SET 所处状态="'.$state.'",审核签名="'.$filenames.'" WHERE id="'.$id.'"';
}else if($flag=='a9&b'){
	$flage=$_POST['flage'];
	if($flage==1){
		$state='a7&r';
	}else{
		$state='a10&b';
	}
	$sql='UPDATE `检测项目表` SET 所处状态="'.$state.'",批准签名="'.$filenames.'" WHERE id="'.$id.'"';
}else if($flag=='a10&b'){
	$state='a11&b';
	$sql='UPDATE `检测项目表` SET 所处状态="'.$state.'" WHERE id="'.$id.'"';
}else if($flag=='a11&b'){
	$state='a12&b';
	$sql='UPDATE `检测项目表` SET 所处状态="'.$state.'" WHERE id="'.$id.'"';
}else if($flag=='a12&b'){
	$state='a12&l';
	$sql='UPDATE `检测项目表` SET 所处状态="'.$state.'" WHERE id="'.$id.'"';
}
if ($conn -> query($sql) === TRUE){
		$jsonresult = 'success';
	} else {
		$jsonresult = 'error';
	}
$json = '{"result":"'.$jsonresult.'"}';
echo $json;
?>