import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;
  message = '';
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) return;

    const { password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      this.message = 'As senhas não coincidem.';
      return;
    }

    console.log('Nova senha:', password);
    this.message = 'Senha redefinida com sucesso!';
  }
}