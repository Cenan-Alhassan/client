import { Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { GenericService, IDepartment } from '../_services/generic.service';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentsPopupComponent } from "../departments-popup/departments-popup.component";


@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [FormsModule, NgbPaginationModule, NgbTypeaheadModule, NgbModule, DepartmentsPopupComponent],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent implements OnInit {
@ViewChild(DepartmentsPopupComponent) departmentsPopupComponent!: DepartmentsPopupComponent;

  entityType: string = "Departments";
  service = inject(GenericService);
  Departments: IDepartment[] = [];
  pagedDepartments: IDepartment[] = [];

  page = 1;
  pageSize = 4;
  collectionSize: number = 0;

  ngOnInit(): void {
    this.getDepartments();
    this.getLength();
  }

  refreshDepartments() {
    this.pagedDepartments = this.Departments.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
  }

  getDepartments() {
    this.service.getEntities(this.entityType).subscribe({
      next: (response: IDepartment[]) => {
        this.Departments = response;
        this.refreshDepartments();
      },
      error: (error: any) => console.log(error),
      complete: () => console.log("Departments have been retrieved successfully.")
    });
  }

  getLength() {
    this.service.getLength(this.entityType).subscribe({
      next: (response: number) => {
        this.collectionSize = response;
      },
      error: (error: any) => console.log(error),
    });
  }

  deleteDepartment(id: any) {
    debugger
    this.service.deleteEntity(this.entityType, id).subscribe({
      next: (response) => {
        this.Departments = response;
        this.getLength();
        this.refreshDepartments();
      },
      error: (error: any) => console.log(error),
      complete: () => console.log(`Department (id=${id}) has been deleted successfully.`)
    });

  }

  openChildPopup(IsEditMode: boolean, IdIfEdit?: number)
    {
      this.departmentsPopupComponent.open(IsEditMode, IdIfEdit)
    }
}
