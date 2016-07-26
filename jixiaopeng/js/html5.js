function rnd(n, m) {
	return parseInt(Math.random() * (m - n)) + n;
}
window.onload = function() {
	//图片预览
	(function() {
		var oBtna = document.querySelector('#preview');
		var aLi = document.querySelectorAll('#preview_z li');
		//布局转化
		var aPos = [];
		for(var i = 0; i < aLi.length; i++) {
			aPos[i] = {
				left: aLi[i].offsetLeft,
				top: aLi[i].offsetTop
			}
		}
		for(var i = 0; i < aLi.length; i++) {
			aLi[i].style.position = 'absolute';
			aLi[i].style.left = aPos[i].left + 'px';
			aLi[i].style.top = aPos[i].top + 'px';
			var oC = document.querySelector('#c1');

			var gd = oC.getContext('2d');

			oC.onmousedown = function(ev) {
				gd.moveTo(ev.clientX, ev.clientY);

				oC.onmousemove = function(ev) {
					gd.lineTo(ev.clientX, ev.clientY);
					gd.stroke();
				};
				oC.onmouseup = function() {
					oC.onmousemove = null;
					oC.onmouseup = null;
				};
				return false;
			};
		}
		var timera;
		var bFlag = false;
		oBtna.onclick = function() {
			if(bFlag) return;
			bFlag = true;
			var iNow = 0;
			timera = setInterval(function() {
				(function(index) {
					move(aLi[iNow], {
						left: 50,
						top: 50,
						width: 0,
						height: 0,
						opacity: 0
					}, {
						complete: function() {
							if(index == aLi.length - 1) {
								iNow = index;
								timer = setInterval(function() {
									move(aLi[iNow], {
										left: aPos[iNow].left,
										top: aPos[iNow].top,
										width: 100,
										height: 100,
										opacity: 1
									});
									iNow--;

									// 关闭定时器
									if(iNow == -1) {
										clearInterval(timer);
										setTimeout(function() {
											bFlag = false;
										}, 500);
									}
								}, 100);
							}
						}
					});

				})(iNow);
				iNow++;
				//关定时器
				if(iNow == aLi.length) {
					clearInterval(timera);

				}
			}, 100)

		}
	})();

	/*3d图片环*/
	(function() {
		var oUl = document.querySelector('#ull_a');
		var N = 11;
		for(var i = 0; i < N; i++) {
			var oLi = document.createElement('li');
			oLi.style.backgroundImage = 'url(img/html5/img2/' + (i + 1) + '.jpg)';
			oUl.appendChild(oLi);
			oLi.style.transition = '1s all ease ' + 200 * (N - i) + 'ms';
			(function(oLi, i) {
				setTimeout(function() {
					oLi.style.transform = 'perspective(1200px)  rotateY(' + 360 / 11 * i + 'deg) translateZ(340px)'
				}, 0)
			})(oLi, i);
		}

		var aLi = oUl.children;
		var y = 0;
		var x = -15;
		var iSpeedX = 0;
		var iSpeedY = 0;
		var lastX = 0;
		var lastY = 0;
		var timer;
		var bFlag = false;
		// 关灯
		aLi[0].addEventListener('transitionend', function() {
			turn(-x, y);
			bFlag = true;
		}, false);
		document.onmousedown = function(ev) {
			if(bFlag == false) return;
			clearInterval(timer);
			var oEvent = ev || event;
			var disX = oEvent.clientX - y;
			var disY = oEvent.clientY - x;
			for(var i = 0; i < aLi.length; i++) {
				aLi[i].style.transition = 'none';
			}
			document.onmousemove = function(ev) {
				var oEvent = ev || event;

				x = oEvent.clientY - disY;
				y = oEvent.clientX - disX;
				turn(x / 3, y / 3);
				iSpeedX = oEvent.clientX - lastX;
				iSpeedY = oEvent.clientY - lastY;

				lastX = oEvent.clientX;
				lastY = oEvent.clientY;
			};
			document.onmouseup = function() {
				document.onmousemove = null;
				document.onmouseup = null;
				timer = setInterval(function() {
					y += iSpeedX;
					x += iSpeedY;

					iSpeedX *= 0.95;
					iSpeedY *= 0.95;

					turn(x / 3, y / 3);
				}, 30);
			};
			return false;
		};

		function turn(x, y) {
			for(var i = 0; i < aLi.length; i++) {
				aLi[i].style.transform = 'perspective(1200px) rotateY(' + (360 / 11 * i + y) + 'deg) translateZ(340px)';
				oUl.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(' + -x + 'deg)';

				// 角度
				var scale = Math.abs(Math.abs((360 / 11 * i + y) % 360) - 180) / 180;
				scale < 0.3 && (scale = 0.3);
				aLi[i].style.opacity = scale;
			}
		}
	})();
	/*翻页效果*/
	(function() {
		var oBox = document.querySelector('#box');
		var oPage = document.querySelector('#box .page');
		var oFront = document.querySelector('#box .front');
		var oBack = document.querySelector('#box .back');
		var oPage2 = document.querySelector('#box .page2');
		var iNow = 0;
		var bFlag = false;
		oBox.onclick = function() {
			if(bFlag) return;
			bFlag = true;
			iNow++;
			oPage.style.transition = '1s all ease';
			oPage.style.transform = 'perspective(800px) rotateY(-180deg)';
			// 运动结束
			oPage.addEventListener('transitionend', function() {
				// 换图
				oBox.style.backgroundImage = 'url(img/html5/img/' + iNow % 3 + '.jpg)';
				oFront.style.backgroundImage = 'url(img/html5/img/' + iNow % 3 + '.jpg)';
				oBack.style.backgroundImage = 'url(img/html5/img/' + (iNow + 1) % 3 + '.jpg)';
				oPage2.style.backgroundImage = 'url(img/html5/img/' + (iNow + 1) % 3 + '.jpg)';
				// 拉回page
				oPage.style.transition = 'none';
				oPage.style.transform = 'perspective(800px) rotateY(0deg)';
				bFlag = false;
			}, false);
		};
	})();
	/*爆炸图--start*/
	(function() {
		var oBox = document.querySelector('#box_a');

		var R = 4;
		var C = 7;
		for(var r = 0; r < R; r++) {
			for(var c = 0; c < C; c++) {
				var oSpan = document.createElement('span');
				oSpan.style.width = oBox.offsetWidth / C + 'px';
				oSpan.style.height = oBox.offsetHeight / R + 'px';

				oBox.appendChild(oSpan);
				oSpan.style.left = oSpan.offsetWidth * c + 'px';
				oSpan.style.top = oSpan.offsetHeight * r + 'px';
				oSpan.style.backgroundPosition = '-' + oSpan.offsetWidth * c + 'px -' + oSpan.offsetHeight * r + 'px';
			}
		}
		var aSpan = oBox.children;
		var iNow = 0;
		var bFlag = false;
		oBox.onclick = function() {
			if(bFlag) return;
			bFlag = true;
			iNow++;
			for(var i = 0; i < aSpan.length; i++) {
				aSpan[i].style.transition = '.6s all ease';
				// X偏移
				var x = oBox.offsetWidth / 2 - aSpan[i].offsetWidth / 2 - aSpan[i].offsetLeft;
				var y = oBox.offsetHeight / 2 - aSpan[i].offsetHeight / 2 - aSpan[i].offsetTop;
				// 动那些值
				aSpan[i].style.transform = 'scale(2) translateX(' + -x + 'px) translateY(' + -y + 'px) rotateX(' + rnd(-180, 180) + 'deg) rotateY(' + rnd(-180, 180) + 'deg)';
				aSpan[i].style.opacity = 0;
			}
			// 运动结束
			aSpan[0].addEventListener('transitionend', function() {
				for(var i = 0; i < aSpan.length; i++) {
					aSpan[i].style.transition = 'none';
					aSpan[i].style.transform = 'scale(1) translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg)';
					aSpan[i].style.opacity = 1;
					aSpan[i].style.backgroundImage = 'url(img/html5/img4/' + iNow % 4 + '.jpg)';
					oBox.style.backgroundImage = 'url(img/html5/img4/' + (iNow + 1) % 4 + '.jpg)';
				}
				bFlag = false;
			}, false);
		};
	})();
	/*作品展示*/
	(function() {
		var oLeft = document.querySelectorAll('input')[0];
		var oRight = document.querySelectorAll('input')[1];
		var aLi = document.querySelectorAll('#ul1_a li');

		// 准备空数组存class
		var arr = [];
		for(var i = 0; i < aLi.length; i++) {
			arr[i] = aLi[i].className;
		}

		//左
		oLeft.onclick = function() {
			arr.unshift(arr.pop());
			console.log(arr);
			for(var i = 0; i < arr.length; i++) {
				aLi[i].className = arr[i];
			}
		};
		// 右
		oRight.onclick = function() {
			arr.push(arr.shift());
			console.log(arr);
			for(var i = 0; i < arr.length; i++) {
				aLi[i].className = arr[i];
			}
		};

	})();

	/*3d颗粒翻转*/
	(function() {
		var oBox = document.querySelector('#box_b');

		var R = 4;
		var C = 7;
		for(var r = 0; r < R; r++) {
			for(var c = 0; c < C; c++) {
				var oSpan = document.createElement('span');
				oSpan.style.width = oBox.offsetWidth / C + 'px';
				oSpan.style.height = oBox.offsetHeight / R + 'px';
				oBox.appendChild(oSpan);
				oSpan.style.left = oSpan.offsetWidth * c + 'px';
				oSpan.style.top = oSpan.offsetHeight * r + 'px';
				oSpan.innerHTML = '<em class="front"></em><em class="back"></em>'
				oSpan.children[0].style.backgroundPosition = '-' + oSpan.offsetWidth * c + 'px -' + oSpan.offsetHeight * r + 'px';
				oSpan.children[1].style.backgroundPosition = '-' + oSpan.offsetWidth * c + 'px -' + oSpan.offsetHeight * r + 'px';

				oSpan.r = r;
				oSpan.c = c;
			}
		}

		var aSpan = oBox.children;
		var iNow = 0;
		var bFlag = false;
		oBox.onclick = function() {
			if(bFlag) return;
			bFlag = true;
			iNow++;
			// 翻面
			for(var i = 0; i < aSpan.length; i++) {
				aSpan[i].style.transition = '1s all ease ' + (aSpan[i].r + aSpan[i].c) * 200 + 'ms';
				aSpan[i].style.transform = 'perspective(800px) rotateY(-180deg)';
			}
			aSpan[aSpan.length - 1].addEventListener('transitionend', function() {
				// 瞬间把所有span翻过来
				for(var i = 0; i < aSpan.length; i++) {
					aSpan[i].style.transition = 'none';
					aSpan[i].style.transform = 'perspective(800px) rotateY(0deg)';
					// 换图
					aSpan[i].children[0].style.backgroundImage = 'url(img/html5/img5/' + iNow % 4 + '.jpg)';
					aSpan[i].children[1].style.backgroundImage = 'url(img/html5/img5/' + (iNow + 1) % 4 + '.jpg)';
				}
				bFlag = false;
			}, false);
		};
	})();

	/*2d 钢琴*/
	(function() {
		var aLi = document.querySelectorAll('#piano_a li');

		for(var i = 0; i < aLi.length; i++) {
			aLi[i].dataset.index = i;
			aLi[i].onmousedown = function() {
				for(var i = 0; i < aLi.length; i++) {
					aLi[i].className = '';
				}
				this.className = 'active';
				// 出声
				var oAudio = new Audio();
				oAudio.src = oggSound['sound' + (parseInt(this.dataset.index) + 49)];
				oAudio.play();
			};
			aLi[i].onmouseup = function() {
				this.className = '';
			};
		}

		document.onkeydown = function(ev) {
			var oEvent = ev || event;
			aLi[oEvent.keyCode - 49].className = 'active';
			if(oEvent.keyCode >= 49 && oEvent.keyCode <= 56) {
				var oAudio = new Audio();
				oAudio.src = oggSound['sound' + oEvent.keyCode];
				oAudio.play();
			}
		};
		document.onkeyup = function(ev) {
			var oEvent = ev || event;
			aLi[oEvent.keyCode - 49].className = '';
		};
	})();
	/*简易留言板*/
	(function(){
		var oC = document.querySelector('#c1');

	var gd = oC.getContext('2d');

	oC.onmousedown = function(ev) {
		gd.moveTo(ev.clientX, ev.clientY);

		oC.onmousemove = function(ev) {
			gd.lineTo(ev.clientX, ev.clientY);
			gd.stroke();
		};
		oC.onmouseup = function() {
			oC.onmousemove = null;
			oC.onmouseup = null;
		};
		return false;
	};
	})();
	/*简易柱状图*/
	(function(){
		 var oC=document.querySelector('#c2');

            var gd=oC.getContext('2d');
            var arr=[100,200,500,500,320,180,159,496,356];

            var iMax=Math.max.apply(null, arr);
            // 柱状图的高度
            var aHeight=[];
            for(var i=0; i<arr.length; i++){
                aHeight[i]=arr[i]/iMax*oC.height;
            }

            var w=oC.width/(3*arr.length-2);
            var space=w*2;
            for(var i=0; i<aHeight.length; i++){
                gd.fillStyle='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
                gd.fillRect(i*(w+space), oC.height-aHeight[i], w, aHeight[i]);
            }
	})();
	 (function(){
	 	var oIcon=document.querySelector('#icon');
				window.onscroll = function() {
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                  
			if (scrollTop > 700) {
				oIcon.style.display = 'block';
			} else {
				oIcon.style.display = 'none';
			}
			}
				
				 
			var timert;
				oIcon.onclick = function() {
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			var start = scrollTop;
			var dis = 0 - start;
			var count = Math.floor(1000 / 30);
			var n = 0;
			clearInterval(timert);
			timert = setInterval(function() {
				n++;
				var a = n / count;
				var cur = start + dis * a;
				document.documentElement.scrollTop = document.body.scrollTop = cur;
				if (n == count) {
					clearInterval(timert);

				}
			}, 30)
		}
	 	
	 })();

};