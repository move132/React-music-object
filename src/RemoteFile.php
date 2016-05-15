<?php 
	$url=$_GET["url"];
	//http://play.baidu.com/
	function getRemoteFile($url, $refer = '') { 
	    $option = array( 
	            'http' => array( 
	                'header' => "Referer:http://play.baidu.com/") 
	            ); 
	    $context = stream_context_create($option); 
	    return file_get_contents($url, false, $context); 
	}
	echo getRemoteFile($url,"http://play.baidu.com/");
?>