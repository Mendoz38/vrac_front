import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import "../styles/form.css";

const DraggableTest = (props) => {
  const [box, setBox] = useState([
    { id: 1, id_boutique: 2, nom: 'Produit', x: '0', y: '0', couleur: 'red', width: '200', height: '50' },
    { id: 2, id_boutique: 2, nom: 'Prix', x: '100', y: '100', couleur: 'pink', width: '75', height: '50' }
  ]);

  const onStop = (id, e, data) => {
    const newX = parseInt(box.find(item => item.id === id).x) + data.x;
    const newY = parseInt(box.find(item => item.id === id).y) + data.y;
    console.log(`Nouvelle position de la box ${id} : x: ${newX}px, y: ${newY}px`);
  };

  

  return (
    <div className="model_etikette">
      {box.map((item) => (
        <Draggable
          grid={[10, 10]}
          nodeRef={item.ref}
          bounds="parent"
          key={item.id}
          onStop={(e, data) => onStop(item.id, e, data)}
        >
          <div
            className="box"
            ref={item.ref}
            style={{
              backgroundColor: `${item.couleur}`,
              left: `${item.x}px`,
              top: `${item.y}px`,
              width: `${item.width}px`,
              height: `${item.height}px`,
            }}
          >
            <h4>{item.nom}</h4>
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default DraggableTest;
