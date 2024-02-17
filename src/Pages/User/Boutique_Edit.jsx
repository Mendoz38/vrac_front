import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneBoutique, getCoordEtikette } from "../../api/boutique";
import "../styles/form.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Draggable from "react-draggable";

const Boutiques_Edit = (props) => {
  const params = useParams();
  const [listeBoutiques, setDetailBoutiques] = useState([]);
  const [box, setBox] = useState([]);
  const [positions, setPositions] = useState({});
  const [draggingPositions, setDraggingPositions] = useState({});

  useEffect(() => {
    getOneBoutique(params.id)
      .then((result) => {
        setDetailBoutiques(result[0]);
        getCoordEtikette(result[0].id)
          .then((result) => {
            setBox(result);
            console.log("box : ", box)
          }) 
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [props]);

  const onStop = (id, e, data) => {
    const newX = parseInt(box.find(item => item.id === id).x) + data.x;
    const newY = parseInt(box.find(item => item.id === id).y) + data.y;
    console.log(`Nouvelle position de la box ${id} : x: ${newX}px, y: ${newY}px`);
  };


  return (
    <>
      {listeBoutiques && box && (
        <>
          <h1 className="centre">Modifier {listeBoutiques.nom_boutique} </h1>
          <section>
            {box.map((item) => (
              <div key={item.id}>
                <p>
                  id: {item.id} | Nom: {item.nom} | X: {item.x}, Y: {item.y} | Couleur: {item.couleur} | Width: {item.width} | Height: {item.height} |
                </p>
              </div>
            ))}
          </section>

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
        </>
      )}
    </>
  );
};

export default Boutiques_Edit;
