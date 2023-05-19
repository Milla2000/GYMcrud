import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from './../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';


@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit{
   public packages = ["Monthly","Quaterly","Half Yearly","Yearly"];
   public genders = ["Male", "Female", "Non-Binary"];
   public importantList: string[]= [
    "Toxic Fat reducrion",
    "Weight Loss",
    "Muscle Gain",
    "Strength Gain",
    "Endurance",
    "Flexibility",
    "Cardiovascular Health",
    "Stress Management",
    "Fitness",
   ];
   public userIdToUpdate! : number;

  public registerForm!: FormGroup

  constructor (
    private fb: FormBuilder, 
    private api: ApiService,
    private activatedRoute: ActivatedRoute, 
    private toastService: NgToastService ){

  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''], 
      weight:[''],
      height:[''],
      bmi:[''],
      bmiResult:[''],
      gender:[''],
      requireTrainer:[''],
      package:[''],
      list:[''],
      gymChoice:[''],
      enquiryDate:[''],

    });

    this.registerForm.controls['height'].valueChanges.subscribe(res => {
      this.calculateBmi(res);
    });

    this.activatedRoute.params.subscribe(val => {
      this.userIdToUpdate = val['id'];
      this.api.getRegisteredUserId(this.userIdToUpdate)
      .subscribe(res => {
          this.fillFormToUpdate(res);
      })
    })
  }
 
  submit(){
    this.api.postRegistration(this.registerForm.value)
    .subscribe(res => {
     this.toastService.success({detail: "Registration Successful", summary: "Success", duration: 3000});
     this.registerForm.reset();
    })
}

  calculateBmi(heightValue: number){
    const weight = this.registerForm.value.height;
    const height = heightValue;
    const bmi = weight/(height*height);
    this.registerForm.controls['bmi'].patchValue(bmi);
    switch(true){
      case (bmi < 18.5):
        this.registerForm.controls['bmiResult'].patchValue("Underweight");
        break;
      case (bmi >= 18.5 && bmi <= 24.9):
        this.registerForm.controls['bmiResult'].patchValue("Normal Weight");
        break;
      case (bmi >= 25 && bmi <= 29.9):
        this.registerForm.controls['bmiResult'].patchValue("Overweight");
        break;
      case (bmi >= 30):
        this.registerForm.controls['bmiResult'].patchValue("Obesity");
        break;
      default:
        this.registerForm.controls['bmiResult'].patchValue("Invalid");
        break;
      
    }
  }

  fillFormToUpdate(user: User ){
    this.registerForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResult: user.bmiResult,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      package: user.package,
      list: user.list,
      gymChoice: user.gymChoice,
      enquiryDate: user.enquiryDate
    })
    
  }

}
