import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Subscription } from 'rxjs';
import { Users } from './users';
import { UsersService } from './users.service';
import { UsersAddEditComponent } from './users-add-edit/users-add-edit.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    CardModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule,
    ReactiveFormsModule,
    UsersAddEditComponent,
  ],
  providers: [ConfirmationService, MessageService],
})
export class UsersComponent {
  users: Users[] = [];
  displayAddEditModal = false; //ekleme ekranının görünürlüğü
  selectedUser: any = null;
  subscriptions: Subscription[] = [];
  Usersubscriptions: Subscription = new Subscription();

  constructor(
    private userService: UsersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.Usersubscriptions = this.userService
      .getUser()
      .subscribe((response) => {
        //getUser bir observable nesnesi döndürür(User[])
        //.subscribe ile bu nesneye abone olunur ve sonuçlar response değişkeninde saklanır
        this.users = response;
        //user burada güncellenir, çünkü dbden alınmış bilgiler üstte response'a atanmıştır.
        this.users = [...this.users];
        //!iste burasını anlamadım ya
      });
    console.log(this.users);
    this.subscriptions.push(this.Usersubscriptions);
    //güncel alınan veriler usersubscripons objesinden subscriptions dizisine pushlanır.
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedUser = null;
    //modali açtığında boş gelir
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
    //eventtan true gelince isClosed true olur.
    //displayine böylece false verir ve modal gizlenir.
  }

  saveOrUpdateUserToList(newData: any) {
    this.getUserList();
    //data gelince sayfa yenilenecek
  }

  showEditModal(users: Users) {
    this.displayAddEditModal = true;
    this.selectedUser = users;
    //tıklanan mevcut producti gösterir.
  }

  deleteUser(users: Users) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this sector?',
      accept: () => {
        this.userService.deleteUser(users.id).subscribe(
          (response) => {
            this.users = this.users.filter((data) => data.id !== users.id);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'The User is successfully deleted',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Success',
              detail: 'The User is can deleted',
              ////////////////!!!!
            });
          }
        );
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
