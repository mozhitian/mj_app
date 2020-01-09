<?php
require('conn.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Content-Type,Access-Token");
$flag=$_POST['flag'];
//获取检测类型组
if($flag=='getDelegate'){
	$flage=$_POST['flage'];
	//获取送检委托单数据
	if($flage=='getJclxzu'){
		$id=$_POST['id'];
		$sql='SELECT 检测项目,检测方法,委托编号,委托单位,经办人,委托日期,扩展字段参数,设计要求,扩展字段值,检测类体,联系电话 FROM `委托单信息` WHERE id="'.$id.'"';
		$result=$conn->query($sql);
		$i=0;
		if($result->num_rows>0){
			while($row=$result->fetch_assoc()){
				$data['jcxm']=$row['检测项目'];
				$data['jcff']=$row['检测方法'];
				$data['wtbh']=$row['委托编号'];
				$data['wtdw']=$row['委托单位'];
				$data['jbr']=$row['经办人'];
				$data['sjyq']=$row['设计要求'];
				$data['jclt']=$row['检测类体'];
				$data['lxdh']=$row['联系电话'];
				$data['wtrq']=$row['委托日期'];
				$data['dycsz']=$row['扩展字段值'];
				$ziduan=explode("||",$row['扩展字段参数'] );//用||切割工程对应参数
				for($i=0;$i<count($ziduan);$i++){
					$sql1='SELECT 检测参项目字段,提示文字  FROM `设计参数数据表` WHERE id="'.$ziduan[$i].'"';//切割出来的数据用来作为索引查找数据
					$result1=$conn->query($sql1);
					if($result1->num_rows>0){
						while($row1=$result1->fetch_assoc()){
							$data['ziduan'][$i]=$row1['检测参项目字段'];//索引出的数据存进一个$data['ziduan']数组里面,前端对应title
							$data['tswz'][$i]=$row1['提示文字'];//索引出的数据存进一个$data['tswz']数组里面,前端对应placehodler
						}
					}		
				}		
			}
		}
	}
	$jclx=$_POST['jclx'];
	$sql2='SELECT 对应参数 FROM `检测类型数据表` WHERE 检测类型字段="'.$jclx.'"';
	$result2=$conn->query($sql2);
	while($row2=$result2->fetch_assoc()){
		$jcxmcs=explode('||',$row2['对应参数']);//用||切割对应参数
		for($i=0;$i<count($jcxmcs);$i++){
			$sql3='select 检测参项目字段,检测方法 from `设计参数数据表` where id="'.$jcxmcs[$i].'"';//切割出来的数据用来作为索引查找数据
			$result3=$conn->query($sql3);
			if($result3->num_rows>0){
				while($row3=$result3->fetch_assoc()){
					$data['jclxzu'][$i]='{"jcxm":"'.$row3["检测参项目字段"].'","jcff":"'.$row3["检测方法"].'"}';//索引出的数据存进一个$data['jclxzu']数组里面
				}
			}
		}
	}
	$json = json_encode($data);
	echo $json;	
}else if($flag=='upDateDelegate'){
	//更改送检委托单数据5条
	$content=$_POST['content'];
	$id=$_POST['id'];
	$str=explode("/",$content);
	$sql1="UPDATE `检测项目表` SET `检测项目` = '".$str[0]."',`检测方法` = '".$str[1]."',`委托编号` = '".$str[2]."',`经办人` = '".$str[3]."',`设计要求` = '".$str[4]."',`检测类体` = '".$str[5]."' where id='".$id."'";
	if ($conn -> query($sql1) === TRUE) {
			$jsonresult = 'success';
		} else {
			$jsonresult = 'error';
	}
	$json = '{"result":"'.$jsonresult.'"		
			}';
	echo $json;
}else if($flag=='insertJcxm'){
	//新建委托单数据
	$content=$_POST['content'];
	$sjc=$_POST['sjc'];
	$jhksrq=$_POST['wtrq'];
	$str=explode("/",$content);
	$zt='a1&b';
	$rwzt='收样';
	$sql='INSERT INTO `检测项目表` (检测项目,检测方法,委托编号,经办人,设计要求,检测类体,所处状态,时间戳,任务状态,计划开始日期) VALUES ("'.$str[0].'","'.$str[1].'","'.$str[2].'","'.$str[3].'","'.$str[4].'","'.$str[5].'","'.$zt.'","'.$sjc.'","'.$rwzt.'","'.$jhksrq.'")';
	if ($conn -> query($sql) === TRUE) {
			$jsonresult = 'success';
		} else {
			$jsonresult = 'error';
	}
	$json = '{"result":"'.$jsonresult.'"		
			}';
	echo $json;
	
}else if($flag=='getReceived'){
	$id=$_POST['id'];
	$sql='SELECT 检测类型,计划开始日期,计划完成日期,任务状态,检测费用,任务描述,收样责任人,任务附件 FROM `委托单信息` WHERE id="'.$id.'"';
	$result=$conn->query($sql);
	$i=0;
	if($result->num_rows>0){
		while($row=$result->fetch_assoc()){
			$data['jclx']=$row['检测类型'];
			$data['jhksrq']=$row['计划开始日期'];
			$data['jhwcrq']=$row['计划完成日期'];
			$data['rwzt']=$row['任务状态'];
			$data['jcfy']=$row['检测费用'];
			$data['rwms']=$row['任务描述'];
			$data['syzrr']=$row['收样责任人'];
		}
    }
	$json = json_encode($data);
	echo $json;
}else if($flag=='upDateReceived'){
	//更改单数据8条
	$content=$_POST['content'];
	$id=$_POST['id'];
	$str=explode("/",$content);
	$sql1="UPDATE `检测项目表` SET `计划开始日期` = '".$str[1]."',`计划完成日期` = '".$str[2]."',`任务状态` = '".$str[3]."',`检测费用` = '".$str[4]."',`任务描述` = '".$str[5]."',`责任人` = '".$str[6]."' where id='".$id."'";
	if ($conn -> query($sql1) === TRUE) {
			$jsonresult = 'success';
		} else {
			$jsonresult = 'error';
	}
	$json = '{"result":"'.$jsonresult.'"		
			}';
	echo $json;
}else if($flag=='getPictrue'){
	$id=$_POST['id'];
	$sql='select 任务附件 from `委托单信息` where id="'.$id.'"';
	$result=$conn->query($sql);
	while($row=$result->fetch_assoc()){
		$data['rwfj']=$row['任务附件'];
	}
	$json = json_encode($data);
	echo $json;
}else if($flag=='getTest'){
	$id=$_POST['id'];
	$sql='SELECT 检测类型,试验开始日期,试验完成日期,试验过程记录,试验描述,试验责任人 FROM `委托单信息` where id="'.$id.'"';
	$result=$conn->query($sql);
	while($row=$result->fetch_assoc()){
		$data['jclx']=$row['检测类型'];
		$data['syksrq']=$row['试验开始日期'];
		$data['sywcrq']=$row['试验完成日期'];
		$data['sygcjl']=$row['试验过程记录'];
		$data['syms']=$row['试验描述'];
		$data['syzrr']=$row['试验责任人'];
	}
	$json = json_encode($data);
	echo $json;
}else if($flag=='upDateTest'){
	$id=$_POST['id'];
	$content=$_POST['content'];
	$str=explode("/",$content);
	$sql1="UPDATE `检测项目表` SET `试验开始日期` = '".$str[1]."',`试验完成日期` = '".$str[2]."',`试验过程记录` = '".$str[3]."',`试验描述` = '".$str[4]."',`试验责任人` = '".$str[5]."' where id='".$id."'";
	if ($conn -> query($sql1) === TRUE) {
			$jsonresult = 'success';
		} else {
			$jsonresult = 'error';
	}
	$json = '{"result":"'.$jsonresult.'"		
			}';
	echo $json;
}else if($flag=='getReport'){
	$id=$_POST['id'];
	$sql='SELECT 报告编号,编制日期,编制人 FROM `委托单信息` where id="'.$id.'"';
	$result=$conn->query($sql);
	while($row=$result->fetch_assoc()){
		$data['bgbh']=$row['报告编号'];
		$data['bzrq']=$row['编制日期'];
		$data['bzr']=$row['编制人'];
	}
	$json = json_encode($data);
	echo $json;
}else if($flag=='upDateReport'){
	$id=$_POST['id'];
	$content=$_POST['content'];
	$str=explode("/",$content);
	$sql1="UPDATE `检测项目表` SET `报告编号` = '".$str[0]."',`编制日期` = '".$str[1]."',`编制人` = '".$str[2]."' where id='".$id."'";
	if ($conn -> query($sql1) === TRUE) {
			$jsonresult = 'success';
		} else {
			$jsonresult = 'error';
	}
	$json = '{"result":"'.$jsonresult.'"		
			}';
	echo $json;
}

?>