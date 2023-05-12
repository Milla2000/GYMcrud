import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  public registerForm!: FormGroup

  constructor (private fb: FormBuilder){

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
  }

  
}
