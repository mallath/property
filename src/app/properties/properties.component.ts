import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../shared/property.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Property } from './propertymodel';


@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent {
  allProperty: any;
  formValue!: FormGroup;
  propertyModelObj: Property = new Property();
  showAdd!: boolean;
  showEdit!: boolean;

  constructor(private fb: FormBuilder, private api: PropertyService) { }

  ngOnInit(): void {
    this.formValue = this.fb.group({
        ptitle: [''],
        pprice: [''],
        plocation: [''],
        pdetails: [''],
    })  

    this.getAllProperty()
  }  
    
  
  ClickAddProp() {
    this.formValue.reset();
    this.showAdd = true;
    this.showEdit = false;
  }

  getAllProperty() {
    this.api.getAllprop().subscribe((res) => {
      this.allProperty = res;
      console.warn(this.allProperty)
    })
  }

  addProp() {
    this.propertyModelObj.ptitle = this.formValue.value.ptitle;
    this.propertyModelObj.pprice = this.formValue.value.pprice;
    this.propertyModelObj.plocation = this.formValue.value.plocation;
    this.propertyModelObj.pdetails = this.formValue.value.pdetails;

    this.api.addListing(this.propertyModelObj).subscribe((res) => {
      console.log(res);
      alert("Record Added successfully")
      let ref = document.getElementById('clear');
      ref?.click()
      this.formValue.reset();
      this.getAllProperty()

    }, err => {
      alert("something went wrong")
    })
  }

  deleteProp(data:any,id:number) {
    this.api.deleteprop(this.propertyModelObj.id).subscribe((res) => {
      alert("Property deleted successfully")
      this.getAllProperty()
    })
  }

  onEdit(data:any){
    this.showAdd=false;
    this.showEdit=true;
    this.propertyModelObj.id=data.id;
    this.formValue.controls['ptitle'].setValue(data.ptitle);
    this.formValue.controls['pprice'].setValue(data.pprice);
    this.formValue.controls['plocation'].setValue(data.plocation);
    this.formValue.controls['pdetails'].setValue(data.pdetails);
  }  


  updateProp(){
    this.propertyModelObj.ptitle = this.formValue.value.ptitle;
    this.propertyModelObj.pprice = this.formValue.value.pprice;
    this.propertyModelObj.plocation = this.formValue.value.plocation;
    this.propertyModelObj.pdetails = this.formValue.value.pdetails;

    this.api.updateprop(this.propertyModelObj,this.propertyModelObj.id).subscribe((res)=>{
      console.log(res);
      alert("Record updated successfully")
      let ref = document.getElementById('clear');
      ref?.click()
      this.formValue.reset();
      this.getAllProperty()

    }, err => {
      alert("something went wrong")
    })

  }
}  

         
