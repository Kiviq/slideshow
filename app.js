function start(){
	var uploadFile = {
		handler: document.querySelector('.upload'),
		resultBox:document.querySelector('.uploaded'),
		files:{
			currentArray:[],
			modelElement:document.querySelector('.result'),
		},
		init: function(){
			console.log(this.handler)
			this.watchChange();
		},
		watchChange:function(){
			this.handler.addEventListener('change', (e)=>{
				this.resultBox.innerHTML = '';
				this.files.currentArray = Array.from(e.target.files);
				this.renderUploaded();
			})
		}, 
		renderUploaded:function(){
			var elementsArray = [];
			console.log(this.files.currentArray, 'render')
			this.files.currentArray.map((el,ind)=>{
				var resultElement = this.files.modelElement.cloneNode(true);
				resultElement.classList.add('result-'+(ind+1));
				resultElement.querySelector('.result-name').textContent = el.name;
				resultElement.querySelector('.result-weight').textContent = Math.floor(el.size/1000) + 'kb';
				resultElement.querySelector('.result-position').textContent = ind + 1;
				elementsArray.push(resultElement);
				this.resultBox.append(resultElement);
				if (ind == this.files.currentArray.length - 1){
					console.log('last')
					this.changeOrder();

				}
			})
		},
		changeOrder: function(){
			var results = [].slice.call(this.resultBox.querySelectorAll('.result'));
			console.log(results);
			var dimsObj = this.setDims(results);
			console.log(dimsObj)
			this.resultBox.addEventListener('drag', (e)=>{
				console.log(e.target, e.target.classList)
				// var dragIndex = e.target.classList
				if (results.indexOf(e.target) > -1){
					if (e.clientY > dimsObj.box_rect.top && e.clientY < (dimsObj.box_rect.top + dimsObj.box_rect.height)){
						dimsObj.results_rect.forEach((el, ind)=>{
							if (e.clientY > (el[0] + el[1]/3)){
								// console.log('plik w dol');
							}
							if (e.clientY < (el[0] + el[1]/3)){
								// console.log('plik w gore');
							}
						})
					}
				} else{
					e.preventDefault();
				}
			})
			function changePosition(direction){
				if (destination == 'up'){
					// el.style.order = 
				}
				if (destination == 'down'){
					
				}
			}
		},
		setDims: function(resultsArray){
			var box_rect = this.resultBox.getBoundingClientRect();
			var dimsObj = {
				box_rect: uploadFile.resultBox.getBoundingClientRect(),
				results_rect:[]
			}
			resultsArray.forEach((el)=>{
				dimsObj.results_rect.push([el.getBoundingClientRect().top, el.getBoundingClientRect().height]);
			})

			return dimsObj;
		},
		move: function(arr, old_index, new_index) {
		    while (old_index < 0) {
		        old_index += arr.length;
		    }
		    while (new_index < 0) {
		        new_index += arr.length;
		    }
		    if (new_index >= arr.length) {
		        var k = new_index - arr.length;
		        while ((k--) + 1) {
		            arr.push(undefined);
		        }
		    }
		     arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);  
		   return arr;
		}
	}
	uploadFile.init();
}
start();





/*
drag:
wykrycie każdego z wyników i określenie jego wysokości oraz odległości od góry
wykrycie przesunięcia elementu powyżej siblinga - reorder
wykrycie przesunięcia elementu poniżej siblinga - reorder
ustalenie nowego arraya z plikami
mozliwosc usuniecia pliku z arraya.
*/
