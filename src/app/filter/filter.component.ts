import { Component, OnInit, Renderer2 } from '@angular/core';
import { DataService } from '../services/dataServices';
import { ToastService } from '../services/toastServices';
import { Response } from 'src/app/models/response';
import { data } from '../../assets/data'; // estoy probando la data.... //  ACA ESTA EL JSON COMO VA A SER ! PROBAR ESTO 
import { Data } from '../models/data';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  public etergeas: any;
  public datas: Data[] = [];
  public etergea: any;
  allChecked: boolean = false;
  alertToEndYetExist: boolean = false;
  alertToEndNotExist: boolean = false;
  alertSomethingNew: boolean = false;

  constructor(
    private renderer: Renderer2,
    private DataServices: DataService,
    private ToastService: ToastService,

  ) { }


  ngOnInit() {
    // this.DataServices.getAllApis().subscribe((resp:Response<any>)=>{
    //   this.datas = resp.data
    //   this.etergeas = resp.data
    // })

    // this.datas.map((each : any)=>{
    //   this.DataServices.getOneEtergea(each.id).subscribe((resp:data)=>{
    //     const esteDataEtergeaOne = resp
    //     console.log("Cada etergea, los datos estan aca : ", esteDataEtergeaOne)
    //   }) 
    // })



    this.etergeas = data
    this.datas = []
    console.log("this.etergeas", this.etergeas)
  }


  reebotThis(event: any) {
    console.log("reboot this:" + event);
  }


  deleteAll = () => {
    this.ToastService.show('Se borro toda la lista', { classname: 'toastInfo blue', delay: 5000 });
    this.datas = []
  }

  checkAll = () => {
    this.allChecked = !this.allChecked;
    this.datas.forEach((data: any) => data.checked = this.allChecked);
  }

  getDeviceStatus(data: Data, device: string, number: number): any {
    switch (device) {
      case "gps":
        const firstDeviceKey1 = Object.keys(data.GPS.devices)[number];
        const firstDevice1 = data.GPS.devices[firstDeviceKey1];
        const objectResult1 = { puerto: firstDevice1.puerto, status: firstDevice1.status, data: firstDevice1.data, }
        return objectResult1;
      case "gprs":
        const firstDeviceKey2 = Object.keys(data.GPRS.interfaces)[number];
        const firstDevice2 = data.GPRS.interfaces[firstDeviceKey2];
        const objectResult2 = { dns: firstDevice2.can_resolve_dns, internet: firstDevice2.has_internet, up: firstDevice2.is_up, }
        return objectResult2;
      case "pm":
        const lowBattery = data.PM.lowBattery;
        const mainPower = data.PM.mainPower;
        const objectResult3 = { lowBattery: lowBattery, mainPower: mainPower }
        return objectResult3;
      default:
        break;
    }

  }

  deleteOfList = (event: any) => {
    this.datas = this.datas.filter((data: any) => data.name !== event.name);
    this.ToastService.show("Se saco el " + event.name + " de la lista", { classname: 'toastInfo blue', delay: 5000 });
  }

  cleanInput = () => {
    let idResultValue = document.getElementById('idResult')! as HTMLInputElement
    idResultValue.value = ""
  }

  setInput = () => {
    let idResultValue = document.getElementById('idResult')! as HTMLInputElement
    let idResult = idResultValue.value
    this.cleanInput()
    return idResult;
  }


  addEachOne = (resultInput: any, multiple?: boolean) => {
    let yetHere = false 
    this.DataServices.getOneEtergea(resultInput).subscribe((resp: any) => {
      if (resp.status === 200 || resp !== undefined && resp !== null) { // * esto tengo que ver segun como trae la respuesta
        // if (resp.status === 200 && resp.data !== undefined && resp.data !== null) { 
        this.etergea = resp
        resp.name = String(resultInput);
        resp.checked = true;
        const newResult = this.datas.find((item: any) => item.name == resultInput);
        (newResult) ? yetHere = true : "";
      } else {
        this.etergea = null // * esto tengo que ver segun como trae la respuesta
      }
      console.log("this.datas", this.datas)
      if (yetHere) {
        (multiple) ? this.alertToEndYetExist = true : this.ToastService.show("El " + resultInput + " ya esta incorporado este etergea a la lista", { classname: 'toastInfo red', delay: 5000 });
      } else {
        if (!yetHere) {
          this.datas = this.datas.concat(this.etergea);
          (multiple) ? this.alertSomethingNew = true : this.ToastService.show("El etergea " + resultInput + " fue agregado", { classname: 'toastInfo blue', delay: 5000 });
        }
      }
    },
      (error: any) => { //? poner un if para separar 404 y 503 ?.
        this.ToastService.show("No existe este Etergea", { classname: 'toastInfo red', delay: 5000 });
      },)
  }

  addMultiple = (first: any, second: any) => {
    let numbersBetween: number[] = [];
    for (let i: any = first; i <= second; i++) {
      numbersBetween.push(i);
    }
    numbersBetween.map((number: any) => {
      this.addEachOne(number, true)
    })
    setTimeout(() => {
      if (this.alertToEndYetExist) {
        this.ToastService.show("Uno o mas elementos ya estaban en la lista", { classname: 'toastInfo red', delay: 5000 })
        this.alertToEndYetExist = false
      }
      if (this.alertToEndNotExist) {
        this.ToastService.show("Uno o mas elementos No Existen", { classname: 'toastInfo red', delay: 5000 })
        this.alertToEndNotExist = false
      }
      if (this.alertSomethingNew) {
        this.ToastService.show("Fueron agregados", { classname: 'toastInfo blue', delay: 5000 });
        this.alertSomethingNew = false;
      } 
    }, 600);
  }

  addToList = () => {
    let resultInput = this.setInput();
    if (resultInput) {
      let stringArray = resultInput.split(',');
      stringArray.map((each: any) => {
        let eachString = String(each);
        if (eachString.includes('-')) { // logica para multiple
          let arraySeleccionMultiple = eachString.split('-');
          let start = Number(arraySeleccionMultiple[0]);
          let end = Number(arraySeleccionMultiple[1]);
          this.addMultiple(start, end);
        } else {
          this.addEachOne(each, false); // logica para unico
        }
      });
    } else this.ToastService.show("Escriba la Etergea ", { classname: 'toastInfo red', delay: 5000 });
  };



}