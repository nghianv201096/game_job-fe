import { Component } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent {
  username: string = '';

  addUsername() {
    this.username = '';
  }

  usernameChanged(event: Event) {
    console.log('username changed', event);
  }
}
