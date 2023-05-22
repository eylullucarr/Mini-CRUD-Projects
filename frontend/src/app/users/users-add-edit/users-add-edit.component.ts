import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { UsersService } from '../users.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-users-add-edit',
  templateUrl: './users-add-edit.component.html',
  styleUrls: ['./users-add-edit.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class UsersAddEditComponent implements OnInit, OnChanges {
  @Input() displayAddEditModal: boolean = true;
  @Input() selectedUser: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  //clickclose olayına abone olan bileşenlere boolean türünde veri sağlar.
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = '';

  userForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    job: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.selectedUser) {
      this.modalType = 'Edit';
      //edit modalini açar
      this.userForm.patchValue(this.selectedUser);
      //userforma kendi verisini yerleştirmek için patchValue() kullanılır
    } else {
      this.userForm.reset();
      //userforma reset atar, yani kutucuklar boş gelir.
      this.modalType = 'Add';
      //add modalini açtırır
    }
  }

  closeModal() {
    this.userForm.reset();
    //formu resetler
    this.clickClose.emit(true);
    //dışarıya true olarak gider=>user.compenent.html
  }

  addEditUser() {
    console.log(this.userForm.value);
    this.userService
      .AddEditUser(this.userForm.value, this.selectedUser)
      .subscribe(
        (response) => {
          this.clickAddEdit.emit(response);
          //verileri clickaddedite atar.
          this.closeModal();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User Succesfuly Added.',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'User Succesfuly Added.',
          });
          console.log('Errror occured');
        }
      );
  }
}
