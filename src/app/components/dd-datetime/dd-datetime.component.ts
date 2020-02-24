import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';

@Component({
  selector: 'app-dd-datetime',
  templateUrl: './dd-datetime.component.html',
  styleUrls: ['./dd-datetime.component.css']
})
export class DdDatetimeComponent implements OnInit {
  @Input() dateFormat: string;
  @Input() yearMax: number;
  @Input() yearMin: number;
  @Input() istime: boolean;
  @Input() inputDate: any;
  @Input() reset: boolean;
  @Input() isReadonly: boolean;
  @Output() dateChange: EventEmitter<any> = new EventEmitter();

  public selectedDay: number;
  public selectedMonth: String;
  public selectedYear: number;
  public selectedHour: number;
  public selectedMin: number;
  public selectedAMPM: string;

  public maxYear: number;
  public minYear: number;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.setDate();
  }

  ngOnInit() {
    console.log("Input Date: ", this.inputDate);
    this.setDate();
  }

  setDate() {
    let monthList = this.monthRange();
    if(this.inputDate!=null && this.inputDate!=''){
      try{
        this.selectedYear = (new Date(this.inputDate)).getFullYear();
        this.selectedMonth = monthList[((new Date(this.inputDate)).getMonth())];
        this.selectedDay = ((new Date(this.inputDate)).getDate());
        this.selectedHour = ((new Date(this.inputDate)).getHours());
        this.selectedMin = ((new Date(this.inputDate)).getMinutes());
        this.selectedAMPM = this.selectedHour >= 12 ? "PM" : "AM";
        this.selectedHour = this.selectedHour > 12 ? this.selectedHour - 12 : this.selectedHour;        
      }
      catch(e){}
    }
    else{
      this.selectedYear = (new Date()).getFullYear();
      this.selectedMonth = monthList[((new Date()).getMonth())];
      this.selectedDay = ((new Date()).getDate());
      this.selectedHour = ((new Date()).getHours());
      this.selectedMin = ((new Date()).getMinutes());
      this.selectedAMPM = this.selectedHour >= 12 ? "PM" : "AM";
      this.selectedHour = this.selectedHour > 12 ? this.selectedHour - 12 : this.selectedHour;
    }
    this.setMaxMinYear();
  }

  resetComponent(){
    let monthList = this.monthRange();
    this.selectedYear = (new Date()).getFullYear();
    this.selectedMonth = monthList[((new Date()).getMonth())];
    this.selectedDay = ((new Date()).getDay());
  }

  changeYear(newValue) {
    let monthList = this.monthRange();
    let hour = parseInt(this.selectedHour.toString());
    if(this.selectedAMPM == "PM"){
      hour = hour + 12;
      hour = (hour == 24) ? 12 : hour;
    }
    else{
      hour = (hour == 12) ? 0 : hour;
    }
    let date = {
      dd:parseInt(this.selectedDay.toString()),
      mm:monthList.indexOf(this.selectedMonth.toString()),
      yy:parseInt(newValue),
      hr:parseInt(this.selectedHour.toString()),
      min:parseInt(this.selectedMin.toString()),
      dateObj:new Date(parseInt(newValue), monthList.indexOf(this.selectedMonth.toString()), parseInt(this.selectedDay.toString()), hour, parseInt(this.selectedMin.toString()))
    }
    this.dateChange.emit(date);
  }
  changeMonth(newValue) {
    let monthList = this.monthRange();
    let hour = parseInt(this.selectedHour.toString());
    if(this.selectedAMPM == "PM"){
      hour = hour + 12;
      hour = (hour == 24) ? 12 : hour;
    }
    else{
      hour = (hour == 12) ? 0 : hour;
    }
    let date = {
      dd:parseInt(this.selectedDay.toString()),
      mm:monthList.indexOf(newValue.toString()),
      yy:parseInt(this.selectedYear.toString()),
      hr:parseInt(this.selectedHour.toString()),
      min:parseInt(this.selectedMin.toString()),
      dateObj:new Date(parseInt(this.selectedYear.toString()), monthList.indexOf(newValue.toString()), parseInt(this.selectedDay.toString()), hour, parseInt(this.selectedMin.toString()))
    }
    this.dateChange.emit(date);
  }
  changeDay(newValue) {
    let monthList = this.monthRange();
    let hour = parseInt(this.selectedHour.toString());
    if(this.selectedAMPM == "PM"){
      hour = hour + 12;
      hour = (hour == 24) ? 12 : hour;
    }
    else{
      hour = (hour == 12) ? 0 : hour;
    }
    let date = {
      dd:parseInt(newValue),
      mm:monthList.indexOf(this.selectedMonth.toString()),
      yy:parseInt(this.selectedYear.toString()),
      hr:parseInt(this.selectedHour.toString()),
      min:parseInt(this.selectedMin.toString()),
      dateObj:new Date(parseInt(this.selectedYear.toString()), monthList.indexOf(this.selectedMonth.toString()), parseInt(newValue), hour, parseInt(this.selectedMin.toString()))
    }
    this.dateChange.emit(date);
  }

  changeHour(newValue) {
    let monthList = this.monthRange();
    let hour = parseInt(newValue.toString());
    if(this.selectedAMPM == "PM"){
      hour = hour + 12;
      hour = (hour == 24) ? 12 : hour;
    }
    else{
      hour = (hour == 12) ? 0 : hour;
    }
    let date = {
      dd:parseInt(this.selectedDay.toString()),
      mm:monthList.indexOf(this.selectedMonth.toString()),
      yy:parseInt(this.selectedYear.toString()),
      hr:parseInt(newValue),
      min:parseInt(this.selectedMin.toString()),
      dateObj:new Date(parseInt(this.selectedYear.toString()), monthList.indexOf(this.selectedMonth.toString()), parseInt(this.selectedDay.toString()), hour, parseInt(this.selectedMin.toString()))
    }
    this.dateChange.emit(date);
  }

  changeMin(newValue) {
    let monthList = this.monthRange();
    let hour = parseInt(this.selectedHour.toString());
    if(this.selectedAMPM == "PM"){
      hour = hour + 12;
      hour = (hour == 24) ? 12 : hour;
    }
    else{
      hour = (hour == 12) ? 0 : hour;
    }
    let date = {
      dd:parseInt(this.selectedDay.toString()),
      mm:monthList.indexOf(this.selectedMonth.toString()),
      yy:parseInt(this.selectedYear.toString()),
      hr:parseInt(this.selectedHour.toString()),
      min:parseInt(newValue),
      dateObj:new Date(parseInt(this.selectedYear.toString()), monthList.indexOf(this.selectedMonth.toString()), parseInt(this.selectedDay.toString()), hour, parseInt(newValue))
    }
    this.dateChange.emit(date);
  }

  changeAMPM(newValue){
    this.selectedAMPM = newValue;
    let monthList = this.monthRange();
    let hour = parseInt(this.selectedHour.toString());
    if(this.selectedAMPM == "PM"){
      hour = hour + 12;
      hour = (hour == 24) ? 12 : hour;
    }
    else{
      hour = (hour == 12) ? 0 : hour;
    }
    let date = {
      dd:parseInt(this.selectedDay.toString()),
      mm:monthList.indexOf(this.selectedMonth.toString()),
      yy:parseInt(this.selectedYear.toString()),
      hr:parseInt(this.selectedHour.toString()),
      min:parseInt(this.selectedMin.toString()),
      dateObj:new Date(parseInt(this.selectedYear.toString()), monthList.indexOf(this.selectedMonth.toString()), parseInt(this.selectedDay.toString()), hour, parseInt(this.selectedMin.toString()))
    }
    this.dateChange.emit(date);
  }

  setMaxMinYear(){
    let curYear = (new Date()).getFullYear();
    this.maxYear = curYear + parseInt(this.yearMax.toString());
    this.minYear = curYear - parseInt(this.yearMin.toString());
  }

  dayRange(){
    var items: number[] = [];
    for(var i = 1; i <= 31; i++){
       items.push(i);
    }
    return items;
  }

  yearRange(){
    var items: number[] = [];
    for(var i = this.minYear; i <= this.maxYear; i++){
       items.push(i);
    }
    return items;
  }

  hourRange(){
    var items: number[] = [];
    for(var i = 1; i <= 12; i++){
       items.push(i);
    }
    return items;
  }

  minRange(){
    var items: number[] = [];
    for(var i = 0; i <= 59; i++){
       items.push(i);
    }
    return items;
  }

  monthRange(){
    //return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  }
}
