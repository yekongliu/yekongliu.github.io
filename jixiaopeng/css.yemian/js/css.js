window.onload=function(){
				var oLeft=document.getElementById('left');
				var oContent=document.getElementById('content');
				var aLi=oLeft.getElementsByTagName('li');
				var bLi=oContent.getElementsByTagName('li'); 
				for(var i=0; i<aLi.length; i++){
					aLi[i].index=i;
					aLi[i].onmouseover=function(){
						 
						for(var j=0; j<aLi.length; j++)
                       {
                       	aLi[j].className='';
                       	bLi[j].className='';
                       }
                       this.className='on';
					bLi[this.index].className='active';
					}
					 
				}
				
			}