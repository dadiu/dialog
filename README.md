#各种弹窗插件

###兼容性
- IE7+(关闭按钮用了css3旋转的，IE7,8不支持，建议更换成图片或者文字X)

###线上地址
- [戳这里](http://whj.fayfox.com/demo/plugIn.dialog/)

###参数说明
<pre>
types : 			//必填  alert/confirm/prompt/loading/moment
id : '',			//可选	给弹窗赋予id值
className :'',		//可选	给弹窗赋予class值
titles : '提示',	//types=confirm ||  prompt 必填; types=alert || loading || moment 不填
contents : '',		//必填	显示内容
width : 200,		//可选	弹窗宽度，不填时默认值200
height : 110,		//可选	弹窗高度，不填时默认值110
ensure : '确定',	//可选	确定按钮的文字，不填时默认为“确定”
cancel : '取消',	//可选	取消按钮的文字，不填时默认为“确定”	
times : 2000,		//types=moment时 必填,必须为int格式; 其他情况不需要,默认为2000
close : '+',		//可选	右上角关闭按钮的内容，可以传入文字或者图片,默认为“+”,css3旋转45°,不兼容IE8及以下
p : '',				//可选	传入方法时需要的参数
callback : null		//可选	确定时候需要运行的方法，默认无

</pre>

###使用方法
1. html
<pre>&lt;a href="javascript:;" class="btn_alert"&gt;alert&lt;/a&gt;</pre>
2. css
<pre>
/* button */
button { border:0; padding:3px 10px; cursor:pointer; border-radius:5px; }
button[type="button"] {
    border:1px solid #ddd;
    background-color:#fff;
    background-image:-moz-linear-gradient(top, #fff, #eee);
    background-image:-webkit-gradient(linear, 0 0, 0 100%, from(#fff), to(#eee));
    background-image:-webkit-linear-gradient(top, #fff, #eee);
    background-image:-o-linear-gradient(top, #fff, #eee);
    background-image:linear-gradient(to bottom, #fff, #eee);
    background-repeat:repeat-x;
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff', endColorstr='#ffeeeeee', GradientType=0);}
button[type="submit"], button[type="reset"] {
    border:1px solid #34a0d3; color:#fff;
    background-color:#38a7dc;
    background-image:-moz-linear-gradient(top, #48c2fc, #38a7dc);
    background-image:-webkit-gradient(linear, 0 0, 0 100%, from(#48c2fc), to(#38a7dc));
    background-image:-webkit-linear-gradient(top, #48c2fc, #38a7dc);
    background-image:-o-linear-gradient(top, #48c2fc, #38a7dc);
    background-image:linear-gradient(to bottom, #48c2fc, #38a7dc);
    background-repeat:repeat-x;
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff48c2fc', endColorstr='#ff38a7dc', GradientType=0);}

/* input */
input[type="text"] { padding:5px; border:1px solid #ddd; box-shadow:0 0 2px 0 #fff; background:#fff; color:#555; }


/* dialog */
.w_bg { position:fixed; left:0; top:0; width:100%; height:100%; background:#000; opacity:0.3; filter:alpha(opacity=30); }
.w_win { position:absolute; left:50%; top:50%; font-size:12px; border-radius:3px; border:1px solid #aaa; background:#fff; }
.w_top { position:relative; padding:10px; border-bottom:1px solid #f0f0f0; font-weight:bold; }
.w_close { 
    position:absolute; right:5px; top:5px; width:20px; height:20px; text-align:center; line-height:20px; color:#333; font-size:20px; font-weight:200; font-family:'arial'; text-decoration:none;
    transform:rotate(45deg);
    -ms-transform:rotate(45deg); /* Internet Explorer */
    -moz-transform:rotate(45deg); /* Firefox */
    -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
    -o-transform:rotate(45deg); /* Opera */
}
.w_close:hover { color:#3aaae0; }
.w_con { padding:20px; }
.w_con p { margin-bottom:10px; }
.w_bot { text-align:right; padding:10px 20px; }
.w_bot button { margin-left:10px; }

.w_prompt input { width:100%; }
</pre>

3. js

3.1 先引入以下3个js
<pre>
jquery-1.8.3.js
jquery.dialog.min.js
</pre>

3.2 最后运行js
<pre>
$(".btn_alert").click(function(){

	$.dialog({
		types : 'alert',
		title : 'alert',
		contents : '点击确定关闭弹窗'
	});

});
</pre>

4. 实例说明

4.1 types=alert提示，确定后关闭提示弹窗
<pre>
$.dialog({
	types : 'alert',
	title : 'alert',
	contents : '点击确定关闭弹窗'
});
</pre>

4.2 types=alert提示，确定后关闭提示弹窗，并且运行一个方法,
<pre>
$.dialog({
	types : 'alert',
	title : 'alert',
	contents : '点击确定执行事件',
	p : [22,33,44],
	callback : funAlert
});

//callback 方法
function funAlert(p){

	$.dialog({
		types : 'alert',
		title : 'alert',
		contents:'输出参数' + p
	});

}
</pre>

4.3 types=confirm提示，带有确定和取消的弹窗，点击确定按钮运行方法，点击取消按钮不运行且关闭弹窗
<pre>
$.dialog({
	types : 'confirm',
	title : 'comfirm',
	contents :'&lt;h3>title&lt;/h3>&lt;p>this is p text&lt;/p>',
	width : 300,
	height : 180,
	p : 'test',
	callback : funConfirm
});

//callback 方法
function funConfirm(p){

	$.dialog({
		types : 'alert',
		contents : '输出参数名' + p
	})

}
</pre>

4.4 types=prompt，带有输入框的提示弹窗，点击确定按钮运行方法，点击取消按钮不运行且关闭弹窗
<pre>
$.dialog({
	types : 'prompt',
	title : 'prompt',
	contents : '&lt;p>请在下面的输入框输入文字:&lt;/p>',
	width : 300,
	height : 180,
	p : 'test',
	callback : funPrompt

});

//callback 方法
function funPrompt(resp, p){	//resp为输入框文字

	if(resp){
		$.dialog({
			types : 'alert',
			contents : '您输入的文字为 ' + resp + p
		})
	} else {
		$.dialog({
			types : 'alert',
			contents : '请先输入文字'
		})
	}

}
</pre>

4.5 types=loading 页面加载的时候运行
<pre>
$.dialog({
	types : 'loading',
	contents : 'loading',
	width : 100,
	height : 50
})
</pre>

4.6 types=moment 短暂的文字提示，出现time毫秒后消失
<pre>
$.dialog({
	types : 'moment',
	contents : '提示语,几秒后消失',
	times : 1000,
	width : 200,
	height : 50
})
</pre>
