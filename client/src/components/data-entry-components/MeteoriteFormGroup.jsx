import React, { useState } from "react";
import Meteorite from "./Meteorite";

const MeteoriteFormGroup = ({
  handleChange,
  elements,
  techniques,
  formErrors,
}) => {
  const [meteoriteCount, setMeteoriteCount] = useState(0);
  let meteorites = [];

  const addMeteorite = () => setMeteoriteCount((prevState) => prevState + 1);

  for (let i = 0; i <= meteoriteCount; i++) {
    meteorites.push(
      <Meteorite
        index={i}
        elements={elements}
        techniques={techniques}
        formErrors={formErrors}
        addMeteorite={addMeteorite}
        handleChange={handleChange}
      />
    );
  }

  return <React.Fragment>{meteorites}</React.Fragment>;
};

export default MeteoriteFormGroup;
