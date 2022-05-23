import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-poke-collapse',
  templateUrl: './poke-collapse.page.html',
  styleUrls: ['./poke-collapse.page.scss'],
})
export class PokeCollapsePage implements OnInit {
  //public pokedex: Pokemon[] | undefined;
  @Output() selected = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

}
