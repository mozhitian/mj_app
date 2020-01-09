<?php
require('conn.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Content-Type,Access-Token");
$i=0;
$sjc=$_POST['sjc'];
$flag=$_POST['flag'];
$sql="SELECT * FROM `委托单信息` where 时间戳='".$sjc."'";
$result=$conn->query($sql);
if($result->num_rows>0){
	while($row=$result->fetch_assoc()){
		$data[$i]['id']=$row['id'];
		$data[$i]['jclx']=$row['检测类型'];
		$data[$i]['jcxm']=$row['检测项目'];
		$data[$i]['state']=$row['所处状态'];
		if($flag=='delegate'){
			$data[$i]['wtbh']=$row['委托编号'];
			$data[$i]['wtrq']=$row['委托日期'];
			$data[$i]['wtdw']=$row['委托单位'];
			$data[$i]['jbr']=$row['经办人'];
			$data[$i]['syksrq']=$row['试验开始日期'];
			$data[$i]['sywcrq']=$row['试验完成日期'];
			$data[$i]['jcfy']=$row['检测费用'];
		}else if($flag=='received'){
			$wtrq=$_POST['wtrq'];
			$all='all';
			//日历模式
			if($wtrq!=$all&&$wtrq==$row['委托日期']){
				$data[$i]['jhksrq']=$row['计划开始日期'];
				$data[$i]['jhwcrq']=$row['计划完成日期'];
				$data[$i]['rwzt']=$row['任务状态'];
			}else if($wtrq==$all){//清单模式
				$data[$i]['jhksrq']=$row['计划开始日期'];
				$data[$i]['jhwcrq']=$row['计划完成日期'];
				$data[$i]['rwzt']=$row['任务状态'];
			}
		}else if($flag=='test'){
			$wtrq=$_POST['wtrq'];
			$all='all';
			//日历模式
			if($wtrq!=$all&&$wtrq==$row['委托日期']){
				$data[$i]['syksrq']=$row['试验开始日期'];
				$data[$i]['sywcrq']=$row['试验完成日期'];
				$data[$i]['syjl']=$row['试验结论'];
			}else if($wtrq==$all){//清单模式
				$data[$i]['syksrq']=$row['试验开始日期'];
				$data[$i]['sywcrq']=$row['试验完成日期'];
				$data[$i]['syjl']=$row['试验结论'];
			}
		}else if($flag=='report'){
			$data[$i]['bgbh']=$row['报告编号'];
			$data[$i]['bzrq']=$row['编制日期'];
			$data[$i]['bzr']=$row['编制人'];
		}else if($flag=='settlement'){
			$data[$i]['wtdw']=$row['委托单位'];
			$data[$i]['syksrq']=$row['试验开始日期'];
			$data[$i]['sywcrq']=$row['试验完成日期'];
			$data[$i]['jcfy']=$row['检测费用'];
		}
		$i++;
	}
		$json = json_encode($data);
        echo $json;
}

?>