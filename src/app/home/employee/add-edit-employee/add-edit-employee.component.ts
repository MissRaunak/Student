import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss']
})
export class AddEditEmployeeComponent implements OnInit {
  constructor(private router: ActivatedRoute, private route: Router,
    private service: ServiceService) { }
  @ViewChild('myForm', { static: false })
  myForm!: NgForm;
  page = true;

  Pics: string = "../assets/img1.jpg";

  urlss = "../assets/img1.jpg";

  selectedFile5!: File;

  show5 = false;

  btnshow5 = true;

  closepic5() {
    if (this.show5 === true && this.btnshow5 === false) {
      this.show5 = !this.show5
      this.btnshow5 = true;

    } else {
      this.show5 = this.show5;
    }
  }


  //Passport pic  image
  Pic(event: any) {
    this.selectedFile5 = event.target.files[0]
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.Pics = event.target.result;
      this.show5 = true;
      this.btnshow5 = false;
      this.profileForm.patchValue({
        Pics: this.Pics
      })
    }
    reader.readAsDataURL(this.selectedFile5);
  }



  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    middleName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
    altermobile: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),

    address: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),

    fPics: new FormControl('', Validators.required),

    Pics: new FormControl(''),

  });


  ngOnInit(): void {

    if (this.route.url.includes('edit')) {
      this.edit();
      this.page = true;
    }
    else {
      this.page = false
    }

  }






  edit() {
    this.service.getCurrentdata(this.router.snapshot.params['id']).subscribe((res) => {
      // console.log("mil gya", res)
      this.profileForm = new FormGroup({
        firstName: new FormControl(res['firstName']),
        lastName: new FormControl(res['lastName']),
        middleName: new FormControl(res['middleName']),
        email: new FormControl(res['email']),
        mobile: new FormControl(res['mobile']),
        altermobile: new FormControl(res['altermobile']),
        dob: new FormControl(res['dob']),
        address: new FormControl(res['address']),
        state: new FormControl(res['state']),
        city: new FormControl(res['city']),
        fPics: new FormControl(''),
        Pics: new FormControl(res['Pics']),

      });
    })
  }

  updatedatatable() {
    if (this.profileForm.valid) {
      this.service.updatedata(this.router.snapshot.params['id'], this.profileForm.value).subscribe((res) => {
        this.myForm.resetForm()

        this.Pics = "../assets/img1.jpg";


      })
    }
  }

  addemployee() {
    console.log("finally get value ", this.profileForm.value)
    this.service.addemployee(this.profileForm.value).subscribe((res) => {
      this.myForm.resetForm()

      this.Pics = "../assets/img1.jpg";

    })
  }



}

