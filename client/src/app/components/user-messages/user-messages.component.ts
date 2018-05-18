import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-userMessages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.scss']
})
export class UserMessagesComponent implements OnInit {
  messageList: any;

  constructor( private authService: AuthService, private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getList().subscribe(list => {console.log(list); this.messageList = list})
  }

}
