import { Component, OnInit } from '@angular/core';
import { Container } from '@morgan-stanley/desktopjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'openfin-runtime-test';
  constructor(private container: Container) {

  }

  ngOnInit() {
    console.log(this.container);
  }
}
