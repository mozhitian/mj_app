<?php
require('conn.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Content-Type,Access-Token");
    $flag=$_POST['flag'];
    //获取检测方法选项
    if($flag=='getJcffs'){
        $jcxm=$_POST['jcxm'];//选择的检测项目
        $jcff=[];//用于存储检测方法字符切割后的数组
        for($i=0;$i<count($jcxm);$i++){
            $sql="SELECT 检测方法 FROM `设计参数数据表` WHERE `检测参项目字段`='".$jcxm[$i]."'";
            $result=$conn->query($sql);
            if($result->num_rows>0){
                while($row = $result->fetch_assoc()){
					$row['检测方法']=substr($row['检测方法'],2);
                    if(strpos('"'.$row['检测方法'].'"','||')){
                        $jcff=explode("||",$row['检测方法'] );
                        $dataArray[$i]['检测方法1'] = $jcff[0];
                        $dataArray[$i]['检测方法2'] = $jcff[1];
                        
                    }else{
                        $dataArray[$i]['检测方法1']=$row['检测方法'];
                        $dataArray[$i]['检测方法3'] = true;
                    }  
                    $dataArray[$i]['检测参项目字段'] = $jcxm[$i];
                    $dataArray[$i]['id'] = $i;
                }
            }
        }
        $json = json_encode($dataArray);
        echo $json;
        
    }else if($flag=='getCanShu'){
        $jclx=$_POST['jclx'];
        $sql="SELECT 对应参数 FROM `工程字段表` WHERE `检测类型`='".$jclx."'";
        $result=$conn->query($sql);
        if($result->num_rows>0){
            while($row = $result->fetch_assoc()){
                $jclx=explode("||",$row['对应参数'] );
                for($i=0;$i<count($jclx);$i++){
                    $sql1="SELECT 检测参项目字段 FROM `设计参数数据表` WHERE `id`='".$jclx[$i]."'";
                    $result1=$conn->query($sql1);
                    if($result1->num_rows>0){
                        while($row1 = $result1->fetch_assoc()){
                            $data[$i]['检测参项目字段']=$row1['检测参项目字段'];
                            // echo "'".$row1['检测参项目字段']."'";
                        }    
                    }
                }
            }   
        }
        $json = json_encode($data);
	    echo $json;
    }else if($flag=='save'){
        $formData=$_POST['formData'];
        $timeStamp=$_POST['timeStamp'];
		$formData['startTime']=substr($formData['startTime'],0,5).substr($formData['startTime'],6,4);
        // $jcStrFirst=explode(",",$jcxmcs );//将获取到的数据初次切割，数据格式如“压实度:钻芯法,上表层厚度:钻芯法”
   //      for($i=0;$i<count($jcStrFirst);$i++){
   //          $jcStrSecond=explode(":",$jcStrFirst[$i]);
   //          $jcxm=$jcStrSecond[0];
   //          $jcff=$jcStrSecond[1];
			// $rwzt='收样';
			// $sczt='a1&b';
   //          $sql1="INSERT INTO `检测项目表` (`检测项目`,`检测方法`,`时间戳`,`任务状态`,`计划开始日期`,`所处状态`) VALUES('".$jcxm."','".$jcff."','".$timeStamp."','".$rwzt."','$formData[startTime]','".$sczt."')";
   //          $result1=$conn->query($sql1);
   //      }
        $sql="INSERT INTO `工程项目表` (`甲方`,`乙方`,`工程编号`,`联系电话`,`工程名称`,`委托日期`,`委托单位`,`见证单位`,`监督单位`,`时间戳`) VALUES('$formData[jiaName]','$formData[yiName]','$formData[gcnum]','$formData[phone]','$formData[gcname]','$formData[startTime]','$formData[wtdw]','$formData[jzdw]','$formData[jddw]','".$timeStamp."')";
        $result=$conn->query($sql);
        if ($result) echo 'success';
        

       

    }
    
?>