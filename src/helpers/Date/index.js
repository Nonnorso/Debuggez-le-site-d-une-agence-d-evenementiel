export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};

export const getMonth = (date) => {
  if (!(date instanceof Date)) {
    // Si date n'est pas une instance de Date valide, retournez une chaîne vide ou une valeur par défaut
    return "";
  }

  const monthIndex = date.getMonth();
  if (monthIndex >= 0 && monthIndex <= 11) {
    return MONTHS[monthIndex + 1]; // Ajoutez 1 pour obtenir le mois correct dans MONTHS
  }
    return "";
  };
