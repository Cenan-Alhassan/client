import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { GenericService } from '../_services/generic.service';
import { NgStyle } from '@angular/common';
import { EmployeePopupComponent } from "../employee-popup/employee-popup.component";

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [NgStyle, EmployeePopupComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  entityType = "Employees"
  service = inject(GenericService)
  index: number = 0;
  display = "none"


  ngOnInit(): void {
    this.getEmployees()
  }


  getEmployees() 
  {
    this.service.getEntities(this.entityType).subscribe(
      {
        next: response => {this.service.employeesDatabaseSignal.set(response); console.log(this.service.employeesDatabaseSignal)},
        error: error => console.log(error),
        complete: () => console.log("Employees have been retrieved successfully.")
      }
    )
  }


  deleteEmployee(id:number)
  {

    console.log(this.index)

    this.service.deleteEntity(this.entityType, id).subscribe(
      {
        next: response => {this.service.employeesDatabaseSignal.set(response);},
        error: error => console.log(error),
        complete: () => console.log(`Employee (id=${id}) has been deleted successfully.`)
      }
    )
  }

  
  setEmployeeToBeEditedId(Id: number) {
    this.service.employeeToBeEditedID.set(Id)
    console.log(this.service.employeeToBeEditedID())
  }

  

}
