import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
@Injectable({
  providedIn: 'root'
})
export class SqlService {
  private dbInstance: SQLiteObject;
  db_name = 'remotestack.db';
  db_table = 'favoritos';
  users: Array<any>;

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.databaseConn();
  }

  databaseConn() {
    this.platform.ready().then((rd) => {
      this.sqlite.create({name: this.db_name, location: 'default'})
        .then((sqLite: SQLiteObject) => {
          this.dbInstance = sqLite;
          sqLite.executeSql(`
CREATE TABLE IF NOT EXISTS ${this.db_table} (
fav_id INTEGER PRIMARY KEY AUTO_INCREMENT,
favorito varchar(255) NOT NULL`, [])
            .then((res) => {
              alert(JSON.stringify(res));
            })
            .catch((error) => alert(JSON.stringify(error)));
        })
        .catch((error) => alert(JSON.stringify(error)));
    });
  }
  public getFav(fav){
    return this.dbInstance.executeSql(`
SELECT * FROM ${this.db_table} WHERE favorito = ${fav}\``, []).then((res) => {
      this.users = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          this.users.push(res.rows.item(i));
        }
        return this.users;
      }
    },(e) => {
      alert(JSON.stringify(e));
    });
  }
  deleteFav(favorito) {
    this.dbInstance.executeSql(`
DELETE FROM ${this.db_table} WHERE favorito = ${favorito}`, [])
      .then(() => {
        alert('User deleted!');
        this.getAllFavs();
      })
      .catch(e => {
        alert(JSON.stringify(e));
      });
  }
  public addFav(fav) {
// validation
    if (!fav.length) {
      alert('Provide both email & name');
      return;
    }
    this.dbInstance.executeSql(`
INSERT INTO ${this.db_table} (favorito) VALUES ('${fav}')`, [])
      .then(() => {
        alert('Success');
        this.getAllFavs();
      }, (err) => { alert(JSON.stringify(err.err)); });
  }

  private getAllFavs() {
    return this.dbInstance.executeSql(`
SELECT * FROM ${this.db_table}`, []).then((res) => {
      this.users = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          this.users.push(res.rows.item(i));
        }
        return this.users;
      }
    },(e) => {
      alert(JSON.stringify(e));
    });
  }


}
