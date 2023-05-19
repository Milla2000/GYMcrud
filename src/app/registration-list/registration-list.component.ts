import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit {
  public dataSource: MatTableDataSource<User> = new MatTableDataSource<User>(); // Data source for the table
  public users!: User[]; // Array to store user data
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Reference to MatPaginator component
  @ViewChild(MatSort) sort!: MatSort; // Reference to MatSort component
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'mobile', 'bmiResult', 'gender', 'package', 'enquiryDate', 'action'];

  constructor(private api: ApiService, private router: Router, private confirmService: NgConfirmService, private toastService: NgToastService ) { }

  ngOnInit(): void {
    this.getUsers(); // Fetch user data when component initializes
  }

  getUsers(): void {
    this.api.getRegisteredUser().subscribe(res => {
      this.users = res; // Assign the response data to the users array
      this.dataSource.data = this.users; // Update the data source with the users array
      this.dataSource.paginator = this.paginator; // Assign the paginator component to the data source
      this.dataSource.sort = this.sort; // Assign the sort component to the data source
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; // Get the value entered in the input field
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Apply the filter to the data source
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Go to the first page of the paginator
    }
  }

  edit(id: number) {
    this.router.navigate(['update', id])
  }
deleteUser(id: number) {
  this.confirmService.showConfirm("Are you sure want to Delete?",
    () => {
      // Logic if 'Yes' is clicked
      this.api.deleteRegistered(id).subscribe({
        next: (res) => {
          this.toastService.success({ detail: 'SUCCESS', summary: 'Deleted Successfully', duration: 3000 });
          this.getUsers();
        },
        error: (err) => {
          this.toastService.error({ detail: 'ERROR', summary: 'Something went wrong!', duration: 3000 });
        }
      });
    },
    () => {
      // Logic if 'No' is clicked
      console.log("Deletion canceled.");
      // You can add any additional logic here
      this.toastService.info({ detail: 'Great choice', summary: 'Action cancelled', duration: 3000 });
    });
}

  
}
