import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-package',
  standalone: true,
  imports: [],
  templateUrl: './package.component.html',
  styleUrl: './package.component.scss'
})
export class PackageComponent {
  @Input() article!: string;
  @Input() time!: number;
}
