import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  footer = "Copyrigth @ Toni Boné";
  today = new Date();
  footerD = this.today.getFullYear();
}
