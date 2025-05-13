import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, RouterLinkWithHref],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'MockProject';
  showMenu = false;
}
