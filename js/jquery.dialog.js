/**
 * @url     https://github.com/dadiu/dialog
 * @data    2015.08.05
 * @author  wuhaijing
 * @mail    1004609378@qq.com
 * @version V1.0.0
 */
/********************* 传参说明 *********************/
/**
 * 以下均为必填参数
 * types : string		//弹窗类型，可选择传入：alert/confirm/prompt/loading/moment
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
 */
/******************** 开始 ********************/
(function($){

	$.dialog = function(options){

		var defaults = {
			types : '',
			id : '',
			className :'',
			titles : '提示',
			contents : '',
			width : 200,
			height : 110,
			ensure : '确定',
			cancel : '取消',
			times : 2000,
			close : '+',
			p : '',
			callback : null
		},

		options = $.extend(defaults, options),

		objs = {
			win : $('<div>').addClass('w_win'),
			tops : $('<div>').addClass('w_top').html(options.titles),
			con : $('<div>').addClass('w_con').html(options.contents),
			bot : $('<div>').addClass('w_bot'),
			inp : $('<input>').attr('type','text').addClass('w_prompt'),
			ensure : $('<button>').attr({'href':'javascript:;', 'type':'submit'}).addClass('w_ensure').html(options.ensure),
			cancel : $('<button>').attr({'href':'javascript:;', 'type':'button'}).addClass('w_cancel').html(options.cancel),
			close : $('<a>').attr('href','javascript:;').addClass('w_close').html(options.close),
			bg : $('<div>').addClass('w_bg')
		},

		dfunc = {

			init : function(){

				var _t = this, DOM = '';

				objs.tops.append(objs.close);

				if (options.types == 'alert'){

					objs.win.addClass('w_alert');
					objs.win.append(objs.con);
					objs.win.append(objs.bot);
					objs.bot.append(objs.ensure);

					objs.ensure.click(function(){
						if(options.callback){
							options.callback(options.p);		//如果有事件 则先运行事件
						}
						_t.wClose(objs);
					});

				} else if (options.types == 'confirm'){

					objs.win.addClass('w_confirm');
					objs.win.append(objs.tops);
					objs.win.append(objs.con);
					objs.win.append(objs.bot);
					objs.bot.append(objs.ensure);
					objs.bot.append(objs.cancel);

					objs.ensure.click(function(){
						if(options.callback){
							options.callback(options.p);	//如果有事件 则运行事件
						} else {
							_t.wClose(objs);	//如果没有事件，则关闭弹窗
						};
					});


				} else if (options.types == 'prompt'){

					objs.win.addClass('w_prompt');
					objs.win.append(objs.tops);
					objs.win.append(objs.con);
					objs.win.append(objs.bot);
					objs.con.append(objs.inp);
					objs.bot.append(objs.ensure);
					objs.bot.append(objs.cancel);

					objs.ensure.click(function(){
						if(options.callback){
							options.callback(objs.inp.val(), options.p);
						}
					});


				} else if (options.types == 'loading'){
					
					objs.win.append(objs.con);

					objs.con.html(options.contents);

					function t(i){

						setTimeout(function(){
							objs.con.append('.');
							i++;

							if(i < 4){
								t(i);
							} else {
								objs.con.html(options.contents);
								t(0);
							}

						},500);
						
					};
					
					t(0);
				} else if(options.types == 'moment'){

					objs.win.append(objs.con);
					objs.con.html(options.contents);
					setTimeout(function(){
						_t.wClose(objs);
					},options.times);
				};

				objs.close.click(function(){
					_t.wClose(objs);
				});

				objs.cancel.click(function(){
					_t.wClose(objs);
				});

			},

			even : function(){

				//添加样式
				objs.win.css({
					'width' : options.width,
					'height' : options.height,
					'margin-top' : -options.width/2,
					'margin-left' : -options.height/2
				})

				//判断是否加了id
				if(options.id){
					objs.win.attr('id', options.id);
				};

				//判断是否加了className
				if(options.className){
					objs.win.attr('className', options.className);
				};

				$('body').append(objs.bg);
				$('body').append(objs.win);
				
			},

			wClose : function(){
				objs.win.remove();
				objs.bg.remove();
			}
		};

		dfunc.init(options, objs);
		dfunc.even(options, objs);

	};

})(jQuery);