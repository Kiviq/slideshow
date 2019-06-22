function start(){
	var uploadFile = {
		handler: document.querySelector('.upload'),
		resultBox:document.querySelector('.uploaded'),
		files:{
			currentArray:[],
			baseArray:[],
			count:0,
			modelElement:document.querySelector('.result'),
		},
		init: function(){
			if (window.File && window.FileReader && window.FileList && window.Blob) {
			  console.log('Great success!')
			  	console.log(this.handler)
				this.watchChange();
				this.resultBox.addEventListener('dragover', (e)=>{
					e.stopPropagation();
				    e.preventDefault();
				    e.dataTransfer.dropEffect = 'copy';
				})
				this.resultBox.addEventListener('drop', (e)=>{
					e.stopPropagation();
					e.preventDefault();
						var files = e.dataTransfer.files;
						if (files.length  >= 1){
							console.log(e.dataTransfer.files)
							Array.from(e.dataTransfer.files).map((el, ind)=>{
								this.files.currentArray.push(el);
							})
							this.resultBox.innerHTML = ''
							this.renderUploaded();
						}
				})
			} else {
			  alert('The File APIs are not fully supported in this browser.');
			}
			
		},
		watchChange:function(){
			this.handler.addEventListener('change', (e)=>{
				this.resultBox.innerHTML = '';
				Array.from(e.target.files).forEach((el, ind)=>{
					this.files.currentArray.push(el);
				})
				this.renderUploaded();
			})
		}, 
		renderUploaded:function(){
			//Renders uploaded files
			this.files.count = 0;
			this.files.currentArray.map((el,ind)=>{
				var reader = new FileReader(); // window blob to read base64
				reader.onload = (function(file) {
			        return function(e) {
			        	console.log(uploadFile.files.baseArray, 'basearr')
					// Add data to array (to show them later)
					var dataElement = [file.name, e.target.result, file.size];
					uploadFile.files.baseArray.push(dataElement)
					uploadFile.files.count++
					//Creating element from uploaded file
					var resultElement = uploadFile.files.modelElement.cloneNode(true);
					resultElement.classList.add('result-'+uploadFile.files.count);
					resultElement.classList.remove('dummy')
					resultElement.querySelector('.result-name').textContent = file.name;
					resultElement.querySelector('.result-weight').textContent = Math.floor(file.size/1000) + 'kb';
					resultElement.querySelector('.result-position').textContent = uploadFile.files.count;
					uploadFile.resultBox.append(resultElement);
					
					// Fires functions after all elements

					if (ind == uploadFile.files.currentArray.length - 1){
						console.log('last')
						uploadFile.changeOrder();
						console.log(uploadFile.files.baseArray)
					}
			        };
		      	})(el);
		      	reader.readAsDataURL(el);
				
			})
		},
		changeOrder: function(){
			//Change order prototype (NF)
			var results = [].slice.call(this.resultBox.querySelectorAll('.result'));
			console.log(results);
			var dimsObj = this.setDims(results);
			console.log(dimsObj)
			this.resultBox.addEventListener('drag', (e)=>{
				console.log(e.target, e.target.classList)
				e.dataTransfer.changeOrder = true;
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
			//sets dimensions for resultBox after appending all children and dimensions of the result
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
