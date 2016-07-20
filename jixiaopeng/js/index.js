/*jixiaopeng*/ ;
(function(window) {
	var left = 0;
	var iSpeed = 0; // 速度
	var timer;
	window.elastic = function(obj, iTarget) {
		clearInterval(timer);
		timer = setInterval(function() {
			iSpeed += (iTarget - left) / 6;
			iSpeed *= 0.8;
			left += iSpeed;

			obj.style.left = Math.round(left) + 'px';
			// 关闭定时器
			if (Math.abs(iSpeed) < 1 && Math.round(left) == iTarget) {
				clearInterval(timer);
			}
		}, 30);
	}
})(window);

function toDouble(n) {
	return n < 10 ? '0' + n : '' + n;
}

function getPos(obj) {
	var l = 0;
	var t = 0;
	while (obj) {
		l += obj.offsetLeft;
		t += obj.offsetTop;
		obj = obj.offsetParent;
	}

	return {
		left: l,
		top: t
	}
}
// 回到顶部
function toDouble(n) {
	return n < 10 ? '0' + n : '' + n;
}

window.onload = function() {

	(function() {
		var oUl = document.getElementById('colock');
		var aImg = oUl.getElementsByTagName('img');

		function clock() {
			var oDate = new Date();
			var timer1
			var str = toDouble(oDate.getHours()) + toDouble(oDate.getMinutes()) + toDouble(oDate.getSeconds());
			for (var i = 0; i < aImg.length; i++) {
				// aImg[i].style.top=-35*str.charAt(i)+'px';
				move(aImg[i], {
					top: -35 * str.charAt(i)
				}, {
					easing: 'linear',
					duration: 500
				});
			}
		}
		clock();
		timer1=setInterval(clock, 1000);
	})();

	(function() {
		var oNav = document.getElementById('nav_nav');
		var oHead = document.getElementById('head_hide');
		var top = getPos(oNav).top;
		var oIcon = document.getElementById('icon');
		var aP=document.querySelectorAll('#about_meaa p');
		window.onscroll = function() {
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                  
			if (scrollTop > 700) {
				oIcon.style.display = 'block';
			} else {
				oIcon.style.display = 'none';
			}

			if (scrollTop > top) {
				oNav.style.position = 'fixed';
				oNav.style.left = 0;
				oNav.style.top = 0;
				oHead.style.display = 'block';
				oNav.style.background = '#fff';
				oNav.style.zIndex = '99';
			} else {
				oHead.style.display = 'none';
				oNav.style.position = '';
				oNav.style.background = '';

			}
		if(scrollTop>1020){
			
			 
				for(var i=0; i<aP.length; i++){
				aP[i].classList.add('animated');
				aP[i].classList.add('fadeInRight');
			}
			 
			 
			
		}
	
		}
		var timer;
		oIcon.onclick = function() {
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			var start = scrollTop;
			var dis = 0 - start;
			var count = Math.floor(1000 / 30);
			var n = 0;
			clearInterval(timer);
			timer = setInterval(function() {
				n++;
				var a = n / count;
				var cur = start + dis * a;
				document.documentElement.scrollTop = document.body.scrollTop = cur;
				if (n == count) {
					clearInterval(timer);

				}
			}, 30)
		}
	})();

	//nav_heads的弹性运动
	(function() {
		var oNav = document.getElementById('nav_heads');
		var aLi = oNav.children;
		var oBlock = aLi[aLi.length - 1];

		for (var i = 0; i < aLi.length - 1; i++) {
			aLi[i].onmouseover = function() {
				elastic(oBlock, this.offsetLeft)
			}
			aLi[i].onmouseout = function() {
				elastic(oBlock, 0);

			}
		}
	})();
	(function() {
		var oWelcome = document.getElementById('welcome');
		var oDiv = document.getElementById('weehools');
		var oBox = document.getElementById('box_content');
		var n = 0;
		var timer;

		clearInterval(timer);

		timer = setInterval(function() {
			n += 5;
			oDiv.style.width = n + '%';
			if (n >= 100) {
				n = 100;

				oWelcome.style.display = 'none';
				oBox.style.display = 'block';
			}

		}, 100)

	})();
}