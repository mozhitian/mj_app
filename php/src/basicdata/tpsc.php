<?php
require('conn.php');
$files=$_POST['img']; //获取base64数据流或本地图片名字数据流
$flag=$_POST['flag'];
//如果只有base64字符串和本地图片都有
if(strpos('"'.$files.'"','base') !== false&&strpos('"'.$files.'"','~**~') !== false){
	$fengeOk=explode('~**~',$files);
	$filesFir=$fengeOk[0];
	$filesTwo=$fengeOk[1];
	$sjc=time();
	$strsShuzu = explode('︴',$filesTwo);
	$length=count($strsShuzu);
	$filenames="";
	for ($i= 1;$i< $length; $i++){
		// $fengeOk=substr($strsShuzu[$i],1);
		$files1 = substr($strsShuzu[$i],22);  //百度一下就可以知道base64前面一段需要清除掉才能用。
		$tmp  = base64_decode($files1);  //解码
		$sjc=time().$i;
		$s=dirname(dirname(__FILE__)); //获的服务器路劲
		$fp=$s."/uploads/".$sjc.".jpg";  //确定图片文件位置及名称
		$filenames=$filenames.$sjc.".jpg"."~*^*~";
		//写文件
		file_put_contents( $fp, $tmp);
			 // echo "'".$fp."'";
	}
	$filenames=$filesFir.$filenames;
}else if(strpos('"'.$files.'"','base') !== false){//如果只有base64字符串的话转化为本地图片
	$sjc=time();
	$strsShuzu = explode('︴',$files);
	$length=count($strsShuzu);
	$filenames="";
	for ($i= 0;$i< $length; $i++){
		// $fengeOk=substr($strsShuzu[$i],1);
		$files1 = substr($strsShuzu[$i],22);  //百度一下就可以知道base64前面一段需要清除掉才能用。
		$tmp  = base64_decode($files1);  //解码
		$sjc=time().$i;
		$s=dirname(dirname(__FILE__)); //获的服务器路劲
		$fp=$s."/uploads/".$sjc.".jpg";  //确定图片文件位置及名称
		$filenames=$filenames.$sjc.".jpg"."~*^*~";
		//写文件
		file_put_contents( $fp, $tmp);
			 // echo "'".$fp."'";
	}
}else{//不是的话直接保存
	$filenames=$files;
}
if($flag=='upDatePictrue'){
	$id=$_POST['id'];
	$sql='update `检测项目表` set 任务附件="'.$filenames.'" where id="'.$id.'"';
	if ($conn -> query($sql) === TRUE) {
			$jsonresult = 'success';
		} else {
			$jsonresult = 'error';
	}
	$json = '{"result":"'.$jsonresult.'"		
			}';
	echo $json;
}else{
	// echo '"'.$filenames.'"';
	require('upState.php');
}



 //  function saveBase64File($img,$name=''){
	//     global $output_file;
 //        $base_img = str_replace('data:image/png;base64,','', $img);
	// 	// echo $base_img;
 //        //  设置文件路径和文件前缀名称
	// 	$s=dirname(dirname(__FILE__));
	// 	
 //        $path = $s."../../../jmjlGitHub/asdasdasd/uploads/";
 //        $prefix='img';
 //        if($name ==''){
 //            $output_file = $prefix.time().rand(100,999).'.jpg';
	// 		
 //        }else{
 //            $output_file = $name;
 //        }
 //        $path = $path.$output_file;
 //        //  创建将数据流文件写入我们创建的文件内容中
 //        $ifp = fopen( $path, "wb" );
 //        fwrite( $ifp, base64_decode( $base_img) );
 //        fclose( $ifp );
 //        // 第二种方式
 //        // file_put_contents($path, base64_decode($base_img));
 //        // 输出文件
 //        // print_r($output_file);
 //        
 //        
 //        // echo $path;
 //    }
	// saveBase64File($img,$name='');
	
	

?>