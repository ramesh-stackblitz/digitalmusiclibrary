import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BroadCastService } from '../broad-cast.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  isFormData: any;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private broadCast: BroadCastService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.isFormData = this.loginForm.value;
    if (this.isFormData.username && this.isFormData.password === 'admin') {
      this.router.navigate(['albumlist', { isAdminFlag: true }]);
      this.broadCast.currentUser.next({ user: this.isFormData.username });

    } else if (this.isFormData.username && this.isFormData.password === 'user') {
      this.router.navigate(['albumlist', { isUserFlag: true }]);
      this.broadCast.currentUser.next({ user: this.isFormData.username });
    } else {
      this.router.navigate(['albumlist']);
    }
  }
}
