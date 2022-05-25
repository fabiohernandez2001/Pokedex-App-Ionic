import {Injectable, OnInit} from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
@Injectable({
  providedIn: 'root'
})
export class SqlService{
  public fav: string[]=[];
  private dbInstance: SQLiteObject;
  private db_name = 'remotestack.db';
  private db_table = 'favoritos';

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.databaseConn();
  }
  databaseConn(){
    this.platform.ready().then(() => {
      this.sqlite.create({name: this.db_name, location: 'default'})
        .then((sqLite: SQLiteObject) => {
          this.dbInstance = sqLite;
          sqLite.executeSql(`CREATE TABLE IF NOT EXISTS ${this.db_table} (
              fav_id INTEGER PRIMARY KEY,
              favorito varchar(255));`, [])
            .then((res) => {
              alert(JSON.stringify('funciona'));
            })
            .catch((error) => {
              alert(JSON.stringify(error));
            });
        })
        .catch((error) => alert(JSON.stringify(error)));
    });
  }
  public getFav(fav){
    return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table} WHERE favorito = ${fav}`, []).then((res)=>{
      this.fav = [];
      if (res.rows.length > 0) {
        alert(JSON.stringify('funciona el get'));
        this.fav.push(res.rows.item(0));
        return this.fav;
      }
    }).catch(e => {
      alert(JSON.stringify('no va'));
    });
  }
  deleteFav(fav) {
    this.dbInstance.executeSql(`DELETE FROM ${this.db_table} WHERE favorito = ${fav}`, [])
      .then(() => {
        alert(JSON.stringify('fav deleted!'));
      })
      .catch(e => {
        alert(JSON.stringify('no av el delete'));
      });
  }
  public addFav(fav) {
// validation
    if (!fav.length) {
      alert(JSON.stringify('No hay fav'));
      return;
    }
    return this.dbInstance.executeSql(`INSERT INTO ${this.db_table} (favorito) VALUES (?)`, [fav])
      .then(() => {
        alert(JSON.stringify('funciona el add'));
      }).catch( err => { alert(JSON.stringify(err)); });
  }

  private getAllFavs() {
    return this.dbInstance.executeSql(`SELECT* favorito FROM ${this.db_table};`, []).then((res) =>{
      this.fav = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          this.fav.push(res.rows.item(i));
          alert(JSON.stringify('Funciona el getall'));
        }
        return this.fav;
      }
    },(e) => {
      alert(JSON.stringify(e));
    });
  }
}
