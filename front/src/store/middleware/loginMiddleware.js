import axios from 'axios';

import { DO_CONNECT } from 'src/store/actions';

const loginMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case DO_CONNECT: {
      const user = {

        email: (store.getState().form.email),
        password: (store.getState().form.password),

      };
      console.log(user);

      // Ouvrir une connexion avec le serveur
      axios.post('http://marion-polomeni.vpnuser.lan/apoth%C3%A9ose/journalPersonnel/projet-prendre-l-aire/back/public/index.php/api/v1/users/register', {
        user,
      })
      // succès
        .then((response) => {
        // Dispatch d'une action pour changer le user
        // store.dispatch(changeUserName(response.data));
          console.log('Response', response);
        })
      // Erreur
        .catch((error) => {
          console.log('Error', error);
        })
      // Dans tous les cas
        .finally();

      break;
    }

    default:
      next(action);
      break;
  }
};

export default loginMiddleware;
