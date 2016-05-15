<?php  
	// 跨域访问限制
	//header('Access-Control-Allow-Origin:'.$GLOBALS['config']['wap_domain'] ); // 指定允许其他域名访问
	header('Access-Control-Allow-Origin:*'); // 指定允许其他域名访问
	header('Access-Control-Allow-Credentials:true' );
	header('Access-Control-Allow-Methods','POST,GET,OPTIONS'); // 响应类型
	header('Access-Control-Allow-Headers:x-requested-with,content-type'); // 响应头设置

    //api
 	$appid = "10002597";
	$bucket = "movejs";
	$secret_id = "AKIDz8XZ8tWDZcN950IuVe9DUNE7leTxCvVO";
	$secret_key = "6ZOZCQDVCTCZTil1ksmvQtogWT83tAtl";
	$expired = time() + 60;
	$onceExpired = 0;
	$current = time();
	$rdm = rand();
	$userid = "0";
	$fileid = "/10002597/movejs/music/armenia_mery_my_home-wallpaper-1920x1080.jpg"; //一次请求设置才有效


	$srcStr = 'a='.$appid.'&b='.$bucket.'&k='.$secret_id.'&e='.$expired.'&t='.$current.'&r='.$rdm.'&f=';

	//$srcStrOnce= 'a='.$appid.'&b='.$bucket.'&k='.$secret_id.'&e='.$onceExpired .'&t='.$current.'&r='.$rdm.'&f='.$fileid;
	 
	$signStr = base64_encode(hash_hmac('SHA1', $srcStr, $secret_key, true).$srcStr); 
	//$signStrOnce = base64_encode(hash_hmac('SHA1',$srcStrOnce,$secret_key, true).$srcStrOnce);

	//echo $signStr."\n";  
	//echo '<img width="200" height="200" src="http://img.movecss.com/music/armenia_mery_my_home-wallpaper-1920x1080.jpg?sign='.$signStr.'" alt="">'; 
	//echo '<img width="200" height="200" src="http://img.movecss.com/music/armenia_mery_my_home-wallpaper-1920x1080.jpg?sign='.$signStrOnce.'" alt="">';

	$domain="http://img.movecss.com/music/";
	$sign="?sign=".$signStr;

	$musiclist= array(
			array(
				"mid" => "09451200",
				"title" => "Miaow-07-Bubble",
				"singer" => "Bubble",
				"time" => "04:23",
				"music_url" => "../testmusic/Miaow-07-Bubble.mp3",
				"album" => "liaow-07-Bubble",
				"thumb" => "../image/lib/1419920779118.jpg"
			),
			array(
				"mid" => "09451201",
				"title" => "半壶纱",
				"singer" => "刘珂矣",
				"time" => "04:23",
				"music_url" => "../testmusic/半壶纱.mp3",
				"album" => "",
				"thumb" => "../image/lib/1380442442.jpg"
			),
			array(
				"mid" => "09451202",
				"title" => "护花使者",
				"singer" => "李克勤",
				"time" => "04:23",
				"music_url" => "../testmusic/护花使者.mp3",
				"album" => "宝丽金极品音色", 
				"thumb" => "../image/lib/1367141585.jpg"
			),
			array(
				"mid" => "09451203",
				"title" => "连锁反应",
				"singer" => "林姗姗",
				"time" => "04:23",
				"music_url" => "../testmusic/连锁反应.mp3",
				"album" => "once upon a time…",
				"thumb" => "../image/lib/1392966266.jpg"
			),
			array(
				"mid" => "09451204",
				"title" => "倩女幽魂",
				"singer" => "张国荣",
				"time" => "04:23",
				"music_url" => "../testmusic/倩女幽魂.mp3",
				"album" => "张国荣好精选",
				"thumb" => "../image/lib/1419920779118.jpg"
			),
			array(
				"mid" => "09451205",
				"title" => "曲终人散",
				"singer" => "张宇",
				"time" => "04:23",
				"music_url" => "../testmusic/曲终人散.mp3",
				"album" => "曲终人散",
				"thumb" => "../image/lib/1419920869261.jpg"
			),
			array(
				"mid" => "09451206",
				"title" => "忘尘谷",
				"singer" => "刘珂矣",
				"time" => "04:23",
				"music_url" => "../testmusic/忘尘谷.mp3",
				"album" => "",
				"thumb" => "../image/lib/1419921179220.jpg"
			),
			array(
				"mid" => "09451207",
				"title" => "忘记他",
				"singer" => "邓丽君",
				"time" => "04:23",
				"music_url" => "../testmusic/忘记他.mp3",
				"album" => "邓丽君 4 In 1 珍藏集",
				"thumb" => "../image/lib/1419921332411.jpg"
			),
			array(
				"mid" => "09451208",
				"title" => "雨中的恋人们（Live版）",
				"singer" => "黄凯芹",
				"time" => "04:23",
				"music_url" => "../testmusic/雨中的恋人们（Live版）.mp3",
				"album" => "Unforgettable 演唱会",
				"thumb" => "../image/lib/7748726372.jpg"
			)
	);


	function getData($url) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		//curl_setopt($ch, CURLOPT_REFERER, "http://www.xxx.com/user/index.do?cid=71347675");  
		curl_setopt($ch, CURLOPT_ENCODING, "");
		curl_setopt($ch, CURLOPT_BINARYTRANSFER, true) ; 
		/*curl_setopt($ch, CURLOPT_HTTPHEADER, array(  
				"Cookie:  OTOKEN=835568e3-c362-4557-8171-c75cc2a83e54;", 
				"User-Agent:Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36"
	        ));*/
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1); //设置是否直接输出到页面 0  是  1 否   
		 
		$html= curl_exec($ch );
		curl_close($ch); 
		$json = json_decode($html, true); 
		return $json;
	}





	/*$song_list=getData("http://tingapi.ting.baidu.com/v1/restserver/ting?from=webapp_music&method=baidu.ting.billboard.billList&type=1&size=30&%20offset=0");
	$data=$song_list["song_list"]; 
	$list=array();

  	foreach ($data as $key => $val) {
  		
  		$list[$key]["mid"]=$data[$key]["song_id"];
  		$list[$key]["thumb"]=$data[$key]["pic_big"];
  		$list[$key]["pic_small"]=$data[$key]["pic_small"];
  		$list[$key]["lrclink"]=$data[$key]["lrclink"]; 
  		$song_info=getData("http://tingapi.ting.baidu.com/v1/restserver/ting?from=webapp_music&method=baidu.ting.song.playAAC&songid=".$data[$key]["song_id"]);

  		//echo $song_info["bitrate"]["file_link"];
  

  		$list[$key]["music_url"]="../RemoteFile.php?url=".$song_info["bitrate"]["file_link"];

  		$list[$key]["title"]=$data[$key]["title"];
  		$list[$key]["singer"]=$data[$key]["author"];
  		$list[$key]["album"]=$data[$key]["album_title"];  
  	}*/


	
	$bgimg=array(
		$domain."armenia_mery_my_home-wallpaper-1920x1080.jpg".$sign,  
		$domain."a_kings_demise-wallpaper-1920x1080.jpg".$sign,   
		$domain."beautiful_canyon_river-wallpaper-1920x1080.jpg".$sign,   
		$domain."ghost_nebula-wallpaper-1920x1080.jpg".$sign,   
		$domain."golden_light-wallpaper-1920x1080.jpg".$sign,  
		$domain."grand_canyon_4-wallpaper-1920x1080.jpg".$sign,   
		$domain."green_cat_eyes_in_the_dark-wallpaper-1920x1080.jpg".$sign,  
		$domain."miranda_kerr_2-wallpaper-1920x1080.jpg".$sign,  
		$domain."nebula_by_hubble-wallpaper-1920x1080.jpg".$sign,   
		$domain."never_alone___-wallpaper-1920x1080.jpg".$sign, 
		$domain."outer_space_nebulae-wallpaper-1920x1080.jpg".$sign,  
		$domain."poppy_buds_vintage_art-wallpaper-1920x1080.jpg".$sign,  
		$domain."spring_has_sprung_2-wallpaper-1920x1080.jpg".$sign,  
		$domain."sun_rise_carinthia_austria_egelsee-wallpaper-1920x1080.jpg".$sign,  
		$domain."superbubble-wallpaper-1920x1080.jpg".$sign,   
		$domain."the_thick_forest-wallpaper-1920x1080.jpg".$sign,   
		$domain."the_tree_of_life_tsavo_national_park_east_kenya-wallpaper-1920x1080.jpg".$sign,   
		$domain."vintage_world_map-wallpaper-1920x1080.jpg" .$sign
	);

	$msg=array(
		"code" =>'200',
		"data" => array(
			"musiclist" => $musiclist,
			"imglist" => $bgimg
		)
	);
	echo json_encode($msg);
	  
?>