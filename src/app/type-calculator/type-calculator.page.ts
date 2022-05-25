import { Component, OnInit } from '@angular/core';
import {PokedexService} from "../pokedex/pokedex.service";

@Component({
  selector: 'app-type-calculator',
  templateUrl: './type-calculator.page.html',
  styleUrls: ['./type-calculator.page.scss'],
})
export class TypeCalculatorPage implements OnInit {
  public typeTable: Map<string, number[]> = new Map<string, number[]>();
  public typeList!: string[];
  public damagesRes: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public countRes: number[] = [0, 0, 0, 0, 0, 0];
  public damages!: number[];
  public damages2!: number[];
  t1 = '1';
  t2 = '2';

  constructor() { }

  ngOnInit(): void {
    this.typeList = ["Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"];
    this.getTypeTable();
  }

  public capturar(): void {
    this.calculateTypes(this.t1, this.t2);
    this.generateWeaknessesData();
  }

  public getTypeTable(): void {
    this.typeTable = new Map<string, number[]>();
    this.typeTable.set("Bug", [1, 1, 1, 1, 1, 0.5, 2, 2, 1, 0.5, 0.5, 1, 1, 1, 1, 2, 1, 1]);
    this.typeTable.set("Dark", [2, 0.5, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 1, 0, 1, 1, 1]);
    this.typeTable.set("Dragon", [1, 1, 2, 0.5, 2, 1, 0.5, 1, 1, 0.5, 1, 2, 1, 1, 1, 1, 1, 0.5]);
    this.typeTable.set("Electric", [1, 1, 1, 0.5, 1, 1, 1, 0.5, 1, 1, 2, 1, 1, 1, 1, 1, 0.5, 1]);
    this.typeTable.set("Fairy", [0.5, 0.5, 0, 1, 1, 0.5, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1]);
    this.typeTable.set("Fighting", [0.5, 0.5, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 0.5, 1, 1]);
    this.typeTable.set("Fire", [0.5, 1, 1, 1, 0.5, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 1, 1, 2, 0.5, 2]);
    this.typeTable.set("Flying", [0.5, 1, 1, 2, 1, 0.5, 1, 1, 1, 0.5, 0, 2, 1, 1, 1, 2, 1, 1]);
    this.typeTable.set("Ghost", [0.5, 2, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 0, 0.5, 1, 1, 1, 1]);
    this.typeTable.set("Grass", [2, 1, 1, 0.5, 1, 1, 2, 2, 1, 0.5, 0.5, 2, 1, 2, 1, 1, 1, 0.5]);
    this.typeTable.set("Ground", [1, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0.5, 1, 0.5, 1, 2]);
    this.typeTable.set("Ice", [1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 2, 1]);
    this.typeTable.set("Normal", [1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    this.typeTable.set("Poison", [0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 2, 1, 1, 0.5, 2, 1, 1, 1]);
    this.typeTable.set("Psychic", [2, 2, 1, 1, 1, 0.5, 1, 1, 2, 1, 1, 1, 1, 1, 0.5, 1, 1, 1]);
    this.typeTable.set("Rock", [1, 1, 1, 1, 1, 2, 0.5, 1, 1, 2, 2, 1, 0.5, 0.5, 1, 1, 2, 2]);
    this.typeTable.set("Steel", [0.5, 1, 0.5, 1, 0.5, 2, 2, 0.5, 1, 0.5, 2, 0.5, 0.5, 0, 0.5, 0.5, 0.5, 1]);
    this.typeTable.set("Water", [1, 1, 1, 2, 1, 1, 0.5, 1, 1, 2, 1, 0.5, 1, 1, 1, 1, 0.5, 0.5]);
  }

  public calculateTypes(type1: string, type2: string): number[] | undefined {
    this.damagesRes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (type1 == "1") {
      return this.damagesRes;
    }
    if (type2 == "2" || type1 == type2) {
      this.damagesRes = this.typeTable.get(type1)!;
      return this.damagesRes;
    } else {
      this.damages = this.typeTable.get(type1)!;
      this.damages2 = this.typeTable.get(type2)!;
      for (let i = 0; i < this.damages.length; i++) {
        this.damagesRes[i] = this.damages[i] * this.damages2[i];
      }
    }
    return this.damagesRes;
  }

  public generateWeaknessesData() {
    this.countRes = [0, 0, 0, 0, 0, 0]
    for (let i = 0; i < this.damagesRes.length; i++) {
      if (this.damagesRes[i] == 0) {
        this.countRes[0]++;
      } else if (this.damagesRes[i] == 0.25) {
        this.countRes[1]++;
      } else if (this.damagesRes[i] == 0.5) {
        this.countRes[2]++;
      } else if (this.damagesRes[i] == 1) {
        this.countRes[3]++;
      } else if (this.damagesRes[i] == 2) {
        this.countRes[4]++;
      } else if (this.damagesRes[i] == 4) {
        this.countRes[5]++;
      }
    }
  }

  getTypeList() {
    this.typeList = ["Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"];
    return this.typeList;
  }
}
