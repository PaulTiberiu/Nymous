class Users {
    constructor(db) {
      this.db = db
      // suite plus tard avec la BD
    }
  
    create(prenom, nom, mail, mdp, mdp_bis) {
      return new Promise((resolve, reject) => {
        let userid = 1; // À remplacer par une requête bd
        if(false) {
          //erreur
          reject();
        } else {
          resolve(userid);
        }
      });
    }
  
    get(userid) {
      return new Promise((resolve, reject) => {
        const user = {
           prenom: "spider",
           nom: "man",
           mail: "toto@gmail.com",
           login: "spider",
           mdp: "toto1234",
           mdp_bis: "toto1234"
        }; // À remplacer par une requête bd
  
        if(false) {
          //erreur
          reject();
        } else {
          if(userid == 1) {
            resolve(user);
          } else {
            resolve(null);
          }
        }
      });
    }
  
    async exists(login) {
      return new Promise((resolve, reject) => {
        if(false) {
          //erreur
          reject();
        } else {
          resolve(true);
        }
      });
    }
  
    checkpassword(login, password) {
      return new Promise((resolve, reject) => {
        let userid = 1; // À remplacer par une requête bd
        if(false) {
          //erreur
          reject();
        } else {
          resolve(userid);
        }
      });
    }
  
  }
  
  exports.default = Users;
  
  