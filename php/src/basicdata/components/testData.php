<?php
require('../conn.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Content-Type,Access-Token");
$id=$_POST['id'];
$sql='SELECT 试验对应参数 from `委托单信息` WHERE id="'.$id.'"';
$result=$conn->query($sql);
if($result->num_rows>0){
	while($row=$result->fetch_assoc()){
		$data['sydycs']=explode('&&',$row['试验对应参数']);
    }
}
for($i=0;$i<count($data['sydycs']);$i++){
	if($i==0){
		$fengeOk=explode('|',$data['sydycs'][$i]);
		for($j=0;$j<count($fengeOk);$j++){
			$sql1='SELECT 检测参数字段,提示文字 from `检测参数字段信息表` WHERE id="'.$fengeOk[$j].'"';
			$result1=$conn->query($sql1);
			if($result1->num_rows>0){
				while($row1=$result1->fetch_assoc()){
					$title=$row1['检测参数字段'];
					$placeholder=$row1['提示文字'];
					$data['jbcs'][$j]='{"title":"'.$title.'","content":"","placeholder":"'.$placeholder.'"}';
				}
			}
		}
	}else if($i==1){
		$fengeOk=explode('|',$data['sydycs'][$i]);
		for($j=0;$j<count($fengeOk);$j++){
			$sql2='SELECT 检测参数字段,提示文字 from `检测参数字段信息表` WHERE id="'.$fengeOk[$j].'"';
			$result2=$conn->query($sql2);
			if($result2->num_rows>0){
				while($row2=$result2->fetch_assoc()){
					$title=$row2['检测参数字段'];
					$placeholder=$row2['提示文字'];
					$data['cfcs'][$j]='{"title":"'.$title.'","content":"","placeholder":"'.$placeholder.'"}';
				}
			}
		}
	}else if($i==2){
		$fengeOk=explode('|',$data['sydycs'][$i]);
		for($j=0;$j<count($fengeOk);$j++){
			$sql3='SELECT 检测参数字段,提示文字 from `检测参数字段信息表` WHERE id="'.$fengeOk[$j].'"';
			$result3=$conn->query($sql3);
			if($result3->num_rows>0){
				while($row3=$result3->fetch_assoc()){
					$title=$row3['检测参数字段'];
					$placeholder=$row3['提示文字'];
					$data['zdcs'][$j]='{"title":"'.$title.'","content":"","placeholder":"'.$placeholder.'"}';
				}
			}
		}
	}
}
$json = json_encode($data);
echo $json;


?>