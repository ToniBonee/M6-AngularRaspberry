import { Component,  ElementRef , ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators ,AbstractControl ,ValidationErrors ,ValidatorFn } from '@angular/forms';
import { FormsService } from 'src/services/formServices';
import { FormsI } from 'src/interfaces/form';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {
  forms:Form[] = [ ];
  
  inapropNombres = ["hitler" ,"franco", "susanaoria","cipote","prepucio","pollita","polla" , "pene" , "pito" , "coño" ,"vajina" , "bajina", "vagina" , "bagina" , "bob" ];
  id: FormControl = new FormControl('');
  modelo: FormControl = new FormControl('', [Validators.required,Validators.maxLength(20),Validators.minLength(3),Validators.pattern('[0-9]*')]);
  nombre: FormControl = new FormControl('',[Validators.required,Validators.pattern('[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*'),forbiddenNameValidator( this.inapropNombres )]);
  fecha: FormControl = new FormControl('', Validators.required);
  informacion: FormControl = new FormControl('');
  email: FormControl = new FormControl('' ,[Validators.pattern(/.+@.+\..+/)]);
  personalizar: FormControl = new FormControl('');
  matricula: FormControl = new FormControl('');
  matriculaText: FormControl = new FormControl('');
  color: FormControl = new FormControl('', Validators.required);
  politicas: FormControl = new FormControl('', [Validators.required, this.customVal]);
  Form: FormGroup = new FormGroup({
    id: this.id,
    modelo: this.modelo,
    nombre: this.nombre,
    fecha: this.fecha,
    informacion: this.informacion,
    email: this.email,
    personalizar: this.personalizar,
    matricula: this.matricula,
    matriculaText: this.matriculaText,
    color: this.color,
    politicas: this.politicas
  });
  mostrarEm = false;
  mostrarC = false;
  test_post:string = '';
  error:string = '';
  error2:string = '';
  constructor(private formService:FormsService, private http:FormsService) { }
  @ViewChild('Nombre') elementNombre!: ElementRef;
  @ViewChild('Value') elementValue!: ElementRef;
  @ViewChild('Fecha') elementFecha!: ElementRef;
  @ViewChild('Email') elementEmail!: ElementRef;
  @ViewChild('Modelo') elementModelo!: ElementRef;
  @ViewChild('Matricula') elementMatricula!: ElementRef;
  @ViewChild('MatriculaText') elementMatriculaText!: ElementRef;
  @ViewChild('Color') elementColor!: ElementRef;
  
  mostrarMat(){
    if(this.mostrarC == true){
      this.mostrarC = false;
       this.Form.get('matricula')?.setValidators([]);
       this.Form.get('matricula')?.reset('');
       this.Form.get('matricula')?.updateValueAndValidity();
    }else{
      this.mostrarC = true;
      this.Form.get('matricula')?.setValidators([Validators.required]);
      this.Form.get('matricula')?.updateValueAndValidity();
    }
    
  }
  mostrarIn(){
    if(this.mostrarEm == true){
      this.mostrarEm = false;
      this.Form.get('email')?.setValidators([Validators.pattern(/.+@.+\..+/)]);
      this.Form.get('email')?.reset('');
      this.Form.get('email')?.updateValueAndValidity();
      
    }else{
      this.mostrarEm = true;
      this.Form.get('email')?.setValidators([Validators.required,Validators.pattern(/.+@.+\..+/)]);
      this.Form.get('email')?.updateValueAndValidity();
      
    }
    
  }
  customVal(politicas: FormControl) {
    if (politicas.value == false) {
      return politicas;
    } else {
      return null
    }
  }
  Clic(datos: FormGroup ) { 
    console.log(datos);
    console.log(this.modelo.value);
    console.log(this.forms);
    
    for (let i = 0; i < 1 ; i++) {
     this.http.createForm(datos).subscribe(data=>{
    this.test_post = data.nombre.value;
  },error=>this.error2=error);
      
    }
    
  this.formService.sendForms(this.id.value, this.modelo.value,this.nombre.value,this.fecha.value,this.informacion.value,this.email.value,this.personalizar.value,this.matricula.value,this.matriculaText.value,this.color.value,this.politicas.value);
    
}
  


}
export interface Form{id: number, modelo: number  ;nombre: string;  fecha: string;  informacion: boolean;  email: string;  personalizar: boolean; matricula: string; matriculaText: string  ;color: string; politicas: boolean; }


export function forbiddenNameValidator(forbiddenNames: string[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = forbiddenNames.includes(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}