import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [ConfirmationService, MessageService],
})
export class UsersComponent {}
