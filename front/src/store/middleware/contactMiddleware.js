import axios from 'axios';

import { DO_CONTACT, submitContact } from 'src/store/actions';

const signupMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case DO_CONTACT: {
      const contact = {
        name: (store.getState().form.name),
        email: (store.getState().form.email),
        subject: (store.getState().form.subject),
        content: (store.getState().form.content),
      };
      console.log(contact);

      // Ouvrir une connexion avec le serveur
      axios.post('http://54.85.18.78/api/v1/contact', {
        contact,
      })
      // succès
        .then((response) => {
        // Dispatch d'une action pour changer le user
        // store.dispatch(changeUserName(response.data));
          console.log('Response', response);
          store.dispatch(submitContact(response.data));
          alert('Votre message a bien été envoyé.');
        })
      // Erreur
        .catch((error) => {
          console.log('Error', error);
          alert('Une erreur s\'est produite, votre message n\'a pas été envoyé, réesayez.');
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

export default signupMiddleware;
