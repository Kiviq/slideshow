import React, { Component } from 'react';
import SatakuLogo from '../../../media/radio_select/logo_sataku.svg';
import SariLogo from '../../../media/radio_select/logo_sarigato.svg';
import CarlaLogo from '../../../media/radio_select/logo_carlazuri.svg';
import './radio.css'
import Details from '../Create/Details';


//Pobranie wszystkich dostępnych formatów w postaci tablicy z obiekatmi:
//{name:@{string}, companies:@{string}, value: @{string}, label: @{string}},
//@Name - nazwa formatu z panelu sataku 
//@companies - lista spółek korzystających z danego formatu
//@value - nazwa formatu z panelu sataku 
//@label - nazwa formatu z panelu sataku 

//Dummy object
const formatOpts=[
	{name:'300x250', companies:'sataku;sarigato', value: '300x250', label: '300x250'},
	{name:'300x600', companies:'sataku;sarigato', value: '300x600', label: '300x600'},
	{name:'750x200', companies:'sataku;sarigato', value: '750x200', label: '750x200'},
	{name:'750x300', companies:'sataku;sarigato', value: '750x300', label: '750x300'},
	{name:'1x1', companies:'carla', value: '1x1', label: '1x1'},
	{name:'160x120', companies:'carla', value: '160x120', label: '160x120'}
];


class Radio extends Component {
	constructor(){
			super();
		this.state = {
			checked:false,
			value:null,
			finalArray:[],
			blocked:true,
			cls:''
		}
		this.watchChange = this.watchChange.bind(this);
	}
	watchChange(event){
		this.setState(
			{checked:true,
			 value:event.target.value
			}
		)
		
		this.changeOptions(formatOpts)
		this.changeClass(event.target, event.target.value)
	}
	changeClass(target, value){
		setTimeout(()=>{
			if (this.state.value == value && target.value == 'sataku'){
				this.setState({
					cls:'checked'
				})
			} else{
				this.setState({
					cls:''
				})
			}
			if (this.state.value == value && target.value == 'sarigato'){
				this.setState({
					cls2:'checked'
				})
			} else{
				this.setState({
					cls2:''
				})
			}
			if (this.state.value == value && target.value == 'carla'){
				this.setState({
					cls3:'checked'
				})
			} else{
				this.setState({
					cls3:''
				})
			}
		}, 150)
	}
	changeOptions(array){
		setTimeout(()=>{
			let finalArray = [];
			const value = this.state.value;
			array.forEach(function(el, ind){
				let companiesArray = el.companies.split(';')
				if (companiesArray[0] === value || companiesArray[1] === value || companiesArray[2] === value){
					finalArray.push(el)
				}				
			})
			this.setState({
				finalArray: finalArray,
			})
		}, 200)
	}
	
	render() {
		return (
			<form post="/" className="createSlides">
					<div className="radio_sect">
						<label className={"sataku" +" "+ this.state.cls}><input type="radio" value="sataku" name="company" onChange={this.watchChange}/> <img src={SatakuLogo} alt="sataku"/></label>
						<label className={"sari"+" "+ this.state.cls2}><input type="radio" value="sarigato" name="company" onChange={this.watchChange}/> <img src={SariLogo} alt="sarigato"/></label>
						<label className={"carla"+" "+ this.state.cls3}><input type="radio" value="carla" name="company" onChange={this.watchChange}/> <img src={CarlaLogo} alt="carla"/></label>
					</div>
					<Details choosenSite={this.state.value} formats={this.state.finalArray} radioChecked={this.state.checked}/>
			</form>
		);
	}
}
export default Radio;