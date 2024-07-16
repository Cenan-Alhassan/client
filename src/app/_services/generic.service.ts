import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

export interface IDepartment {
	id?: number;
	department?: string;
	numOfEmployee?: number;
	manager?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  baseUrl: string = "https://localhost:5021/api/"
  employeesDatabaseSignal = signal<any>(null)
  public employeeToBeEditedID = signal<number | null>(null)

  constructor(private http: HttpClient){}

  getEntities(entityType:string): Observable<IDepartment[]>
  {
    return this.http.get<IDepartment[]>(this.baseUrl + entityType + "/get" )
  }

  postEntity(entityType:string, model:any)
  {
    return this.http.post(this.baseUrl + entityType + "/post", model )
  }

  deleteEntity(entityType:string, Id:number): Observable<IDepartment[]>
  {
    return this.http.delete<IDepartment[]>(this.baseUrl + entityType + `/delete/${Id}`)
  }

  putEntity(entityType:string, Id:number, model:any)
  {
    return this.http.delete(this.baseUrl + entityType + `/delete/${Id}`, model)
  }

  getLength(entityType:string): Observable<number>
  {
    return this.http.get<number>(this.baseUrl + entityType + "/length" )
  }


  convertEmployeeType(enumNumber:number){

    switch (enumNumber){
      case 0:
        return "HR"
      case 1:
        return "Guest"
      case 2:
        return "Employee"
      default:
        return `Invalid Type (${enumNumber})`
    }
  }




}
