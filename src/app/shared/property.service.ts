import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http:HttpClient) { }

  // add property
  addListing(data:any){
    return this.http.post('http://localhost:3000/properties',data).pipe(map((res)=>
    {
      return res;
    }))
  }
  //get All property
  getAllprop(){
    return this.http.get('http://localhost:3000/properties').pipe(map((res)=>
    {
      return res;
    }))
  }
  //update property
  updateprop(data:any,id:number){
    return this.http.put('http://localhost:3000/properties'+id,data).pipe(map((res)=>
    {
      return res;
    }))
  }
  //delete property
  deleteprop(data:any,id:number){
    return this.http.delete('http://localhost:3000/properties'+id,data).pipe(map((res)=>
    {
      return res;
    }))
  }


}
