import { Component } from '@angular/core';
import { Header } from '../components/header/header';
import { FormCard } from '../components/form-card/form-card';
import { ChangePassword } from '../components/change-password/change-password';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-home',
  imports: [Header, FormCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private dialog: Dialog) {}

  openChangePasswordDialog() {
    this.dialog.open(ChangePassword);
  }
}
