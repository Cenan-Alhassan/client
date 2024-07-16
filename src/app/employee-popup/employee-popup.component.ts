import { Component, inject, input, OnInit } from '@angular/core';
import { GenericService } from '../_services/generic.service';

@Component({
  selector: 'app-employee-popup',
  standalone: true,
  imports: [],
  templateUrl: './employee-popup.component.html',
  styleUrl: './employee-popup.component.css'
})
export class EmployeePopupComponent implements OnInit{
  service = inject(GenericService)
  EditEmployeeIfTrue = input.required<boolean>()
  

  ngOnInit(): void {
    if (this.EditEmployeeIfTrue() == true)
    {
    }
    else
      {
        console.log("post popup initialized")
      }
  }
  


}
