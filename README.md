#各种弹窗插件

##最近更新
- V1.0.2 ： 增加closeFun方法,用于接口请求成功之后调用关闭弹窗
- V1.0.1 ： 优化confirm点击确定的时候，先关闭该弹窗再运行下个弹窗
- V1.0.0 ： 创建该插件
 
###兼容性
- IE7+(关闭按钮用了css3旋转的，IE7,8不支持，建议更换成图片或者文字X)

###线上地址
- [戳这里](http://whj.fayfox.com/demo/plugIn.dialog/)

###参数说明
<pre>
 * 以下均为必填参数
 * types : string		//弹窗类型，可选择传入：alert/confirm/prompt/loading/moment/closeFun
 * contents : string	//显示内容
 * titles : string		//弹窗标题，types= "confirm ||  prompt" 必填; types=alert || loading || moment 不填
 * time : int			//弹窗关闭倒计时 types=moment时 必填; 其他情况不需要
 *
 * 以下均为可选参数
 * id : string			//给弹窗赋予id值
 * className : string	//给弹窗赋予class值
 * width ： number		//弹窗宽度，不填时默认值200
 * height ：number		//弹窗高度，不填时默认值110
 * ensure : string		//确定按钮的文字，不填时默认为“确定”
 * cancel : string		//取消按钮的文字，不填时默认为“确定”
 * close : string		//右上角关闭按钮的内容，可以传入文字或者图片,默认为“+”,css3旋转45°,不兼容IE8及以下
 * p : string			//传入方法时需要的参数
 * callback : function	//确定时候需要运行的方法，默认null
</pre>

###使用方法
1. html
<pre>&lt;a href="javascript:;" class="btn_alert"&gt;alert&lt;/a&gt;</pre>
2. css - 见index.html页面

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
