import { Component } from '@angular/core';    
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.css']
})
export class DirectivesComponent {
  events: Date[] = [];
  isShowParagraph: boolean = false;
  username = "NghiaNv18";
  changedUsername = '';
  checkValue = true;

  constructor(private route : Router, private activatedRoute : ActivatedRoute) 
  {}

  people: Person[] = [
    {id: 1, name: 'Nguyen Van A'},
    {id: 2, name: 'Nguyen Van B'},
    {id: 3, name: 'Nguyen Van C'},
  ];

  trackByFn = (index: number, item: Person) => item.id;

  switchValue = "other";


  onClick() {
    const now = new Date();
    this.isShowParagraph = !this.isShowParagraph;
    this.events.push(now);
  }

  getStyles(i: number) {
    return {
      color: i > 3 ? 'white' : 'black'
    }
  }

  getClass(i: number) {
    return {
      'blue-bg': i > 3,
      'white-bg': i <=3
    }
  }

  goHome() {
    this.route.navigate(['/home', 'directive-param'], 
    {
      relativeTo: this.activatedRoute, 
      queryParams: {qp: 'directive-query-param'}, 
      fragment: 'driective-fragment'});
  }
}

class Person {
  id!: number;
  name!: string;
}
