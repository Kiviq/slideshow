import React, { Component } from 'react';
import './details.css';
import Select from 'react-select';
import dragndropUrl from '../../../../media/dropzone/dragndrop.svg';
import gifUrl from '../../../../media/dropzone/format_gif.svg';
import jpgUrl from '../../../../media/dropzone/format_jpg.svg';
import videoUrl from '../../../../media/dropzone/format_mp4.svg';
import pngUrl from '../../../../media/dropzone/format_png.svg';
import from_discUrl from '../../../../media/dropzone/from_disc.svg';
import File from './File';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla', name:'elo', companies:'elo;elo2;elo3' },
  { value: 'vanilla1', label: 'Vanilla' },
  { value: 'vanilla2', label: 'Vanilla1' },
  { value: 'vanilla3', label: 'Vanilla2' },
  { value: 'vanilla4', label: 'Vanilla3' },
  { value: 'vanilla5', label: 'Vanilla4' },
  { value: 'vanilla6', label: 'Vanilla5' }
];

const dummyObject = [
  { value: 'choce', label: 'choce' },
  { value: 'strarry', label: 'strarry' },
  { value: 'valla', label: 'valla' },
  { value: 'valla1', label: 'valla1' },
  { value: 'vanilla2', label: 'vanilla2' },
  { value: 'valla3', label: 'valla3' },
  { value: 'vaa4', label: 'vaa4' },
  { value: 'valla5', label: 'valla5' },
  { value: 'vanilla6', label: 'vanilla65' }
]


class Details extends Component {
	constructor(){
		super()
		this.state = {
			selectedOption1:null,
			selectedOption2:null,
			selectedOption3:null,
			blocked:true,
			listToShow:[],
			maxItems:20,
			uploadedFiles:[],
			currentArray:[],
			version:0.0
		}
		this.handleChange = this.handleChange.bind(this);
		this.watchFiles = this.watchFiles.bind(this);

	}
	handleChange(selectedOption, event) {
		if (event.name === 'client_select'){

			//Pobranie wszystkich dostępnych kampanii dla wybranego klienta w postaci tablicy z obiekatmi:
		  	//{ value: @{string}, label: '@{string}},
	    	// dummyObject - przykładowy obiekt z danymi
			//@value - nazwa kampanii z panelu sataku 
			//@label - nazwa kampanii z panelu sataku 

	    	// this.setState({});
	    	// fetch('adasdasdasdasdas')
	    	// .then((response)=>{
	    	// 	this.setState({listToShow:response})
	    	// })
	    		
	    		this.setState({
	    			selectedOption1:selectedOption,
					listToShow:dummyObject
				})
		} else if (event.name === 'campaign_select'){
	    	this.setState({
    			selectedOption2:selectedOption,
			})

		} else if (event.name === 'format'){
	    	this.setState({
    			selectedOption3:selectedOption,
    			blocked:false,
			})

		}
	    console.log(`Option selected:`, selectedOption, event);
  	};
  	canIpass(event){
  		console.log(this, 'elo')
		if (this.state.selectedOption1 && this.state.selectedOption2 && this.state.selectedOption3 && this.props.radioChecked){
			return false;
		} else{
			return true;
		}
	}
	watchFiles = (event) =>{
		let InitArray = this.state.uploadedFiles;
		
		Array.from(event.nativeEvent.target.files).forEach((el, ind)=>{
			var reader = new FileReader(); // window blob to read base64
				reader.onload = ((file) => {
			        return (e) => {
							// Add data to array (to show them later)
							var dataElement = [file.name, e.target.result, file.size/1000];		
							InitArray.push(dataElement);
						if (InitArray.length - 1 < this.state.maxItems){
							this.setState({
								uploadedFiles:InitArray
							})
						} else{
							alert('za duzo plikow')
						}
			        };
		      	})(el);	
		      	reader.readAsDataURL(el);	
		})
		
	}
	
	render() {
		const { selectedOption1 } = this.state;
		const { selectedOption2 } = this.state;
		const { selectedOption3 } = this.state;
		const { listToShow } = this.state;
		return (
			<div className="details_cont">
				<div className="slides_details">
					<div className="left_side">
						<div className="select_cont client">
							<label>Klient</label>
							<Select 
								value={this.state.selectedOption1}
								onChange={this.handleChange}
								options={options}
								name="client_select"
								className="client_select"
								isSearchable
								classNamePrefix="select"
								placeholder="Wybierz klienta"
							/>
							
						</div>
						<div className="select_cont">
							<label>Kampania</label>
							<Select 
								value={this.state.selectedOption2}
								onChange={this.handleChange}
								options={listToShow}
								className="campaign_select"
								name="campaign_select"
								isSearchable
								placeholder="Wybierz kampanię"
								classNamePrefix="select"
							/>
						</div>
						<div className="select_cont">
							<label>Format</label>
							<Select 
								placeholder="Wybierz format"
								value={this.state.selectedOption3}
								onChange={this.handleChange}
								name="format"
								options={this.props.formats}
								className="format_select"
								isSearchable
								classNamePrefix="select"
							/>
						</div>
						<div className="select_cont">
							<label>Wersja</label>
							<input type="text" value={(this.state.version + 1).toFixed(1)} readOnly/>
						</div>
					</div>
					<div className="right_side">
						<label>Pliki</label>
						<div className="acceptedFiles">
							<img src={pngUrl} alt="png"/>
							<img src={jpgUrl} alt="jpg"/>
							<img src={gifUrl} alt="gif"/>
							<img src={videoUrl} alt="video"/>
						</div>
						<div className="dropZone">
							<div className="dropOnMe">
								<img src={dragndropUrl} alt="drop_on_me"/>
								<span>Przenieś i upuść pliki</span>
							</div>
							{	
								this.state.uploadedFiles.map((el, ind)=>{
									const name = el[0];
									const base = el[1];
									const size = el[2];
									const position = ind + 1;
									console.log(position)
									return <File key={ind} name={name} size={size} position={position} />;
								})
							}
						</div>
						<div className="upload_click">
							<p>
								<img src={from_discUrl} alt="from_discUrl"/> Wybierz z dysku
							</p>
							<input type="file" multiple accept=".jpg,.png,.gif,.mp4,.jpeg" className="upload" onChange={this.watchFiles} name="files[]"/>
						</div>
					</div>
				</div>
				<div className="submit_cont">
					<button type="submit" disabled={this.state.blocked}>
						Stwórz podgląd
					</button>
				</div>
			</div>
		);
	}
}

export default Details;