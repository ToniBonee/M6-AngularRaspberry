import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsService  } from 'src/services/formServices';
import { Location } from '@angular/common';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

export class ViewComponent {
  
  forms:Form[] = [ ];
  id:any = "";
  modelo:any = "";
  nombre:any = "";
  fecha:any = "";
  informacion:any = "";
  email:any = "";
  personalizar:any = "";
  matricula:any = "";
  matriculaText:any = "";
  color:any = "";
  politicas:any = "";
  test_post:string = "";
  error:string = "";
  error2:string = "";
  @ViewChild('Nombre') elementNombre!: ElementRef;
  @ViewChild('Value') elementValue!: ElementRef;
  @ViewChild('Fecha') elementFecha!: ElementRef;
  @ViewChild('Email') elementEmail!: ElementRef;
  @ViewChild('Modelo') elementModelo!: ElementRef;
  @ViewChild('Matricula') elementMatricula!: ElementRef;
  @ViewChild('MatriculaText') elementMatriculaText!: ElementRef;
  @ViewChild('Color') elementColor!: ElementRef;
  
  constructor(private formService:FormsService  ,private location: Location) {}
  numero:any = ' ';
  mostrarEm = false;
  ngOnInit(): void{
    this.formService.getForms().subscribe((forms:Form[]) => {
      this.forms = forms;
      this.formService.getForms();
    });
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    
       this.forms[this.numero-1].modelo = this.elementModelo.nativeElement.value;
       this.forms[this.numero-1].nombre = this.elementNombre.nativeElement.value;
       this.forms[this.numero-1].fecha = this.elementFecha.nativeElement.value;
       if (this.forms[this.numero-1].informacion == true) {
        this.forms[this.numero-1].email = this.elementEmail.nativeElement.value;
       }
       if (this.forms[this.numero-1].personalizar == true) {
       this.forms[this.numero-1].matricula = this.elementMatricula.nativeElement.value;
       this.forms[this.numero-1].matriculaText = this.elementMatriculaText.nativeElement.value;
       }
       else {
       }
       this.forms[this.numero-1].color = this.elementColor.nativeElement.value; 
    this.update();
  }
  mostrarIn(){
    if(this.mostrarEm == true){
      this.mostrarEm = false;     
    }else{
      this.mostrarEm = true;      
    }
    
  }
  update() : void{
    console.log(this.forms[this.numero-1])
    this.formService.updateForm(this.forms[this.numero-1], this.forms[this.numero-1].id)
    .subscribe();
  }
  deleteForms(form: Form ): void{
    this.forms = this.forms.filter(f => f !== form);
    this.formService.deleteForm(form).subscribe();
  }

 onKey(event: any) { 
    this.numero = event.target.value;
    }

}
export interface Form{id: number, modelo: number  ;nombre: string;  fecha: string;  informacion: boolean;  email: string;  personalizar: boolean; matricula: string; matriculaText: string  ;color: string; politicas: boolean; }