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

    this.registerForm.controls['height'].valueChanges.subscribe(res => {
      this.calculateBmi(res);
    });
  }
 
  submit(){
    console.log(this.registerForm.value);
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
}
