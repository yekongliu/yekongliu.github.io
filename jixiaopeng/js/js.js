function getPos(obj){
            var l=0;
            var t=0;
            while(obj){
                l+=obj.offsetLeft;
                t+=obj.offsetTop;

                obj=obj.offsetParent;
            }
            return {left: l, top: t};
       }
 function toDouble(n){
            return n<10?'0'+n:''+n;
        }
window.onload = function() {
	        
	  
         (function(){
         	 var oUl=document.getElementById('colock');
            var aImg=oUl.getElementsByTagName('img');

            function clock(){
                var oDate=new Date();
                var str=toDouble(oDate.getHours())+toDouble(oDate.getMinutes())+toDouble(oDate.getSeconds());
                for(var i=0; i<aImg.length; i++){
                    // aImg[i].style.top=-35*str.charAt(i)+'px';
                    move(aImg[i], {top: -35*str.charAt(i)}, {easing: 'linear', duration: 500});
                }
            }
            clock();
            setInterval(clock, 1000); 	
         })();
	//随机变色
	(function() {
		oNav_a = document.getElementById('nav_a');

		var aP = oNav_a.children;
		for (var i = 0; i < aP.length; i++) {
			var r = parseInt(Math.random() * (256 - 0) + 0);
			var g = parseInt(Math.random() * (256 - 0) + 0);
			var b = parseInt(Math.random() * (256 - 0) + 0);

			aP[i].style.background = 'rgb(' + r + ',' + g + ',' + b + ')';

		}
	})();
	//照片墙
	(function() {
		var oUl = document.getElementById('ull');
		var aLi = oUl.children;
		var oBtn = document.getElementById('btn1');
		//随机换位置
		oBtn.onclick = function() {
			aPos.sort(function() {
				return Math.random() - 0.5;
			});
			for (var i = 0; i < aLi.length; i++) {
				move(aLi[i], aPos[aLi[i].index]);
			}
		};

		//布局转换
		var aPos = [];
		var zIndex = 999;
		for (var i = 0; i < aLi.length; i++) {
			aPos[i] = {
				left: aLi[i].offsetLeft,
				top: aLi[i].offsetTop
			};
		}
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].style.position = 'absolute';
			aLi[i].style.left = aPos[i].left + 'px';
			aLi[i].style.top = aPos[i].top + 'px';
			aLi[i].style.margin = 0;
		}
		for (var i = 0; i < aLi.length; i++) {
			drag(aLi[i]);
			aLi[i].index = i;

		}

		//拖拽
		function drag(obj) {
			obj.onmousedown = function(ev) {
				obj.style.zIndex = zIndex++;
				clearInterval(obj.timer);

				var oEvent = ev || event;
				var disx = oEvent.clientX - obj.offsetLeft;
				var disy = oEvent.clientY - obj.offsetTop;
				document.onmousemove = function(ev) {
					var oEvent = ev || event;
					obj.style.left = oEvent.clientX - disx + 'px';
					obj.style.top = oEvent.clientY - disy + 'px';
					//碰撞检测

					for (var i = 0; i < aLi.length; i++) {
						aLi[i].className = '';
					}
					var oNear = findNearest(obj);
					if (oNear) {
						oNear.className = 'active';
					}

				}
				document.onmouseup = function() {
					document.onmousemove = null;
					document.onmouseup = null;
					//两个图片换位置
					var oNear = findNearest(obj);
					if (oNear) {
						move(oNear, aPos[obj.index]);
						move(obj, aPos[oNear.index]);

						oNear.className = '';

						var tmp;
						tmp = oNear.index;
						oNear.index = obj.index;
						obj.index = tmp;
					} else {
						move(obj, aPos[obj.index]);
					}

				}
				return false;
			}
		}
		//碰撞检测
		function collTest(obj, obj2) {
			var l1 = obj.offsetLeft;
			var r1 = obj.offsetWidth + l1;
			var t1 = obj.offsetTop;
			var b1 = obj.offsetHeight + t1;

			var l2 = obj2.offsetLeft;
			var r2 = obj2.offsetWidth + l2;
			var t2 = obj2.offsetTop;
			var b2 = obj2.offsetHeight + t2;

			if (r1 < l2 || b1 < t2 || l1 > r2 || t1 > b2) {
				return false;
			} else {
				return true;
			}
		}

		function getDis(obj, obj2) {
			var l1 = obj.offsetLeft + obj.offsetWidth / 2;
			var t1 = obj.offsetTop + obj.offsetHeight / 2;

			var l2 = obj2.offsetLeft + obj2.offsetWidth / 2;
			var t2 = obj2.offsetTop + obj2.offsetHeight / 2;

			var a = l1 - l2;
			var b = t1 - t2;
			return Math.sqrt(a * a + b * b);
		}

		function findNearest(obj) {
			var iMin = 99999999;
			var iMinIndex = -1;

			for (var i = 0; i < aLi.length; i++) {
				if (obj == aLi[i]) continue;
				if (collTest(obj, aLi[i])) {
					var dis = getDis(obj, aLi[i]);
					if (dis < iMin) {
						iMin = dis;
						iMinIndex = i;
					}
				}
			}
			if (iMinIndex == -1) {
				return null;
			} else {
				return aLi[iMinIndex];
			}
		}
	})();

	(function() {
		var oShou = document.getElementById('shoufengqin');
		var oUl = oShou.children[2];
		var aLi = oUl.children;
		// 布局
		var n = 50;
		oUl.style.width = aLi[0].offsetWidth + (aLi.length - 1) * n + 'px'
		for (var i = 1; i < aLi.length; i++) {
			aLi[i].style.left = aLi[0].offsetWidth + (i - 1) * n + 'px';
		}
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].index = i;
			aLi[i].onmouseover = function() {
				for (var i = 1; i < aLi.length; i++) {
					if (i <= this.index) {
						move(aLi[i], {
							left: i * n
						}, {
							duration: 500
						});
					} else {
						move(aLi[i], {
							left: aLi[0].offsetWidth + (i - 1) * n
						}, {
							duration: 500
						});
					}
				}
			};
		}

	})();

	//轮播图
	(function() {
		var oBox = document.getElementById('box_a');
		var oUl = document.getElementById('ul_a');
		var oOl = document.getElementById('ol1');
		var aLi = oUl.children;
		var aBtn = oOl.children;
		var oLeft = document.getElementById('left');
		var oRight = document.getElementById('right');

		var length = aLi.length;
		// 计算oUl的宽度
		oUl.innerHTML += oUl.innerHTML;
		oUl.style.width = aLi[0].offsetWidth * aLi.length + 'px';

		var width = aLi[0].offsetWidth;
		var iNow = 0;
		var bFlag = false;
		// 右
		oRight.onclick = next;
		// 左
		oLeft.onclick = prev;

		function next() {
			if (bFlag) return;
			bFlag = true;
			iNow++;

			move(oUl, {
				left: -width * iNow
			}, {
				complete: function() {
					bFlag = false;
					// 拉到第一张，运动结束给我拉到第一张
					if (iNow > length - 1) {
						iNow = 0;
						oUl.style.left = 0;
					}
				}
			});

			tab();
		}

		function prev() {
			if (bFlag) return;
			bFlag = true;
			iNow--;

			if (iNow < 0) {
				iNow = length - 1;
				oUl.style.left = -width * (iNow + 1) + 'px';
			}

			move(oUl, {
				left: -width * iNow
			}, {
				complete: function() {
					bFlag = false;
				}
			});
			tab();
		}

		function tab() {
			for (var i = 0; i < aBtn.length; i++) {
				aBtn[i].className = '';
			}
			aBtn[iNow % aBtn.length].className = 'active';
		}
		// 按钮
		for (var i = 0; i < aBtn.length; i++) {
			aBtn[i].index = i;
			aBtn[i].onclick = function() {
				move(oUl, {
					left: -this.index * width
				});
				iNow = this.index;
				tab();
			};
		}
		var timer;
		timer = setInterval(next, 1000);
		oBox.onmouseover = function() {
			clearInterval(timer);
		};
		oBox.onmouseout = function() {
			timer = setInterval(next, 1000);
		};
	})();

	//拉勾移入移出
	(function() {
	/*	function getPos(obj) {
	var l = 0;
	var t = 0;
	while (obj) {
		l += obj.offsetLeft;
		t += obj.offsetTop;

		obj = obj.offsetParent;
	}
	return {
		left: l, top: t};
    }*/
		function hoverDir(obj, ev) {
			//var  left1=getPos(obj).left;
			//var  top1=getPos(obj).top;
			var x = obj.offsetLeft + obj.offsetWidth / 2 - ev.clientX;
			var y = obj.offsetTop+ obj.offsetHeight / 2 - ev.clientY;
			return Math.round((Math.atan2(y, x) * 180 / Math.PI + 180) / 90) % 4;
		}
		var oYiru = document.getElementById('move_into');
		var oUl = oYiru.children[2];
		var aLi = oUl.children;
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].onmouseenter = function(ev) {
				var oEvent = ev || event;
				var n = hoverDir(this, oEvent);
				var oSpan = this.children[1];
				
				switch (n) {
					case 0:
						oSpan.style.left = '225px';
						oSpan.style.top = 0;
						break;
					case 1:
						oSpan.style.left = 0;
						oSpan.style.top = '225px';
						break;
					case 2:
						oSpan.style.left = '-225px';
						oSpan.style.top = 0;
						break;
					case 3:
						oSpan.style.left = 0;
						oSpan.style.top = '-225px';
						break;
				}
				move(oSpan, {
					left: 0,
					top: 0
				});
			};
			aLi[i].onmouseleave = function(ev) {
				var oEvent = ev || event;
				var n = hoverDir(this, oEvent);
				var oSpan = this.children[1];
				switch (n) {
					case 0:
						move(oSpan, {
							left: 225,
							top: 0
						});
						break;
					case 1:
						move(oSpan, {
							left: 0,
							top: 225
						});
						break;
					case 2:
						move(oSpan, {
							left: -225,
							top: 0
						});
						break;
					case 3:
						move(oSpan, {
							left: 0,
							top: -225
						});
						break;
				}
			};
		}
	})();
	//分块运动
	(function(){ 
		    var oBox=document.getElementById('block_move_a');
            var oBtn=document.getElementById('btna');

            // 布局
            var R=4;
            var C=7;
            for(var r=0; r<R; r++){
                for(var c=0; c<C; c++){
                    var oSpan=document.createElement('span');
                    oSpan.style.width=oBox.offsetWidth/C+'px';
                    oSpan.style.height=oBox.offsetHeight/R+'px';

                    oBox.appendChild(oSpan);
                    // 改变位置
                    oSpan.style.left=oSpan.offsetWidth*c+'px';
                    oSpan.style.top=oSpan.offsetHeight*r+'px';
                    oSpan.style.backgroundPosition=-oSpan.offsetWidth*c+'px '+-oSpan.offsetHeight*r+'px';

                    oSpan.r=r;
                    oSpan.c=c;
                }
            }
            var aSpan=oBox.children;
            // 下一页
            var n=0;
            oBtn.onclick=function(){
                n++;
                oBox.style.backgroundImage='url(img/fengkuaiyundong/'+(n-1)%3+'.jpg)';
                for(var i=0; i<aSpan.length; i++){
                    ;(function(i){
                        setTimeout(function(){
                            aSpan[i].style.opacity=0;
                            move(aSpan[i], {opacity: 1});
                            aSpan[i].style.backgroundImage='url(img/fengkuaiyundong/'+n%3+'.jpg)';
                        }, 300*Math.random());
                    })(i);
                }
            };
})();
 
//放大镜
(function(){var oSmall=document.getElementById('small');
            var oBig=document.getElementById('big');
            var oSpan=oSmall.children[1];
            var oImg=oBig.children[0];
            // 移入
            oSmall.onmouseenter=function(){
                oSpan.style.display='block';
                oBig.style.display='block';
            };
            // 移动
            oSmall.onmousemove=function(ev){
                var oEvent=ev || event;
                var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
                var scrollLeft=document.documentElement.scrollLeft || document.body.scrollLeft;
                var l=oEvent.clientX-oSpan.offsetWidth/2-getPos(oSmall).left+scrollLeft;
                var t=oEvent.clientY-oSpan.offsetHeight/2-getPos(oSmall).top+scrollTop;

                if(l<0){
                    l=0;
                }
                if(t<0){
                    t=0;
                }
                if(l>=oSmall.offsetWidth-oSpan.offsetWidth){
                    l=oSmall.offsetWidth-oSpan.offsetWidth;
                }
                if(t>=oSmall.offsetHeight-oSpan.offsetHeight){
                    t=oSmall.offsetHeight-oSpan.offsetHeight;
                }
                oSpan.style.left=l+'px';
                oSpan.style.top=t+'px';

                var l2=-l/(oSmall.offsetWidth-oSpan.offsetWidth)*(oImg.offsetWidth-oBig.offsetWidth);
                var t2=-t/(oSmall.offsetHeight-oSpan.offsetHeight)*(oImg.offsetHeight-oBig.offsetHeight);
                oImg.style.left=l2+'px';
                oImg.style.top=t2+'px';
            };
            // 移出
            oSmall.onmouseleave=function(){
                oSpan.style.display='none';
                oBig.style.display='none';
            };
})();
  (function(){
  	var oPrev = document.getElementById('prev');
				var oNext = document.getElementById('next');
				var oWork_a = document.getElementById('works_a');
				var aLi = oWork_a.children;
				oWork_a.innerHTML += oWork_a.innerHTML;
				oWork_a.style.width = aLi[0].offsetWidth * aLi.length + 'px';
				var left = 0;
				var timer;

				function toleft() {
					clearInterval(timer);
					timer = setInterval(function() {
						left -= 2;
						if (left <= -oWork_a.offsetWidth / 2) {
							left = 0
						}
						oWork_a.style.left = left + 'px';
					}, 30);
				}
				toleft();

				function toright() {
					clearInterval(timer);
					timer = setInterval(function() {
						left += 2;
						if (left >= 0) {
							left = -oWork_a.offsetWidth / 2;

						}
						oWork_a.style.left = left + 'px';
					}, 30);
				}
				oPrev.onclick = function() {
					toleft();
				}
				oNext.onclick = function() {
					toright();
				}

			
  })();
}