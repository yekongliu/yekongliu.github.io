window.onload=function(){
	// 吸顶条
	(function() {
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
		var oNav = document.getElementById('nav_nav');
		var oHead = document.getElementById('head_hide');
		var top = getPos(oNav).top;
		window.onscroll = function() {
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			if (scrollTop > top) {
				oNav.style.position = 'fixed';
				oNav.style.left = 0;
				oNav.style.top = 0;
				oHead.style.display = 'block';
				oNav.style.background = 'red';
				oNav.style.zIndex = '99';
			} else {
				oHead.style.display = 'none';
				oNav.style.position = '';
				oNav.style.background = '';

			}
		}

	})();
}
