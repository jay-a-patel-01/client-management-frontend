import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-required',
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.sass']
})
export class RequiredComponent implements OnInit {

  @Input() msg = "*";
  
  constructor() { }

  ngOnInit() {
  }

}
