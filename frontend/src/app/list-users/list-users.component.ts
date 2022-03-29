import { Component, OnInit } from '@angular/core';
import {ApplicationUserDto, BASE_URL} from "../model";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users : ApplicationUserDto[];

  constructor(private http: HttpClient) {
    this.users = [];
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.http.get(BASE_URL + '/api/user').subscribe((data) => {
      let list = data as ApplicationUserDto[];
      this.users = list;
    });
  }
}

