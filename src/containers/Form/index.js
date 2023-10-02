import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(); 
  }, 1000);
});

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({}); 

  const isValidEmailFormat = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      setErrors({});

      const nom = evt.target.nom.value;
      const prenom = evt.target.prenom.value;
      const email = evt.target.email.value;
      const message = evt.target.message.value;

      const newErrors = {};

      if (!nom) {
        newErrors.nom = "Veuillez remplir ce champ.";
      }

      if (!prenom) {
        newErrors.prenom = "Veuillez remplir ce champ.";
      }

      if (!isValidEmailFormat(email)) {
        newErrors.email = "Veuillez entrer une adresse e-mail valide (ex. exemple@email.com).";
      }

      if (!message) {
        newErrors.message = "Veuillez entrer un message.";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        setSending(false);
        return;
      }

      try {
        await mockContactApi();
        setSending(false);
        evt.target.reset();
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field name="Nom" placeholder="" label="Nom" />
          {errors.nom && <div className="error-message">{errors.nom}</div>}
          <Field name="Prénom" placeholder="" label="Prénom" />
          {errors.prenom && <div className="error-message">{errors.prenom}</div>}
          <Select
            selection={["Personnel", "Entreprise"]}
            onChange={() => null}
            label="Personnel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field name="Email" placeholder="" label="Email" />
          {errors.email && <div className="error-message">{errors.email}</div>}
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            name="message"
            placeholder="Message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
          {errors.message && <div className="error-message">{errors.message}</div>}
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;