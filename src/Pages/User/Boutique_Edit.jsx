import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneBoutique, getCoordEtikette } from "../../api/boutique";
import "../styles/form.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Draggable, { DraggableCore } from "react-draggable";

const Boutiques_Edit = (props) => {
  const params = useParams();
  const [listeBoutiques, setDetailBoutiques] = useState([]);
  const [coord, setCoord] = useState([]);
  const element1Ref = useRef(null);
  const element2Ref = useRef(null);
  const [positions, setPositions] = useState({});
  console.log("positions : ", positions);

  useEffect(() => {
    getOneBoutique(params.id)
      .then((result) => {
        setDetailBoutiques(result[0]);
        getCoordEtikette(result[0].id)
          .then((result) => {
            setCoord(result[0]);
          }) 
          .catch((err) => console.log(err));
      })

      .catch((err) => console.log(err));
  }, [props]);

  const handleStop = (id, e, data) => {
    const { x, y } = data;
    setPositions((prevPositions) => ({
      ...prevPositions,
      [id]: { x, y },
    }));
    // Sauvegardez les positions dans localStorage ou un autre système de stockage ici
  };

  return (
    <>
      {listeBoutiques  && coord  && (
        <>
          <h1 className="centre">Modifier {listeBoutiques.nom_boutique} </h1>
          <section>
          </section>

          <div className="model_etikette">
            <Draggable
              nodeRef={element1Ref}
              bounds="parent"
              onStop={(e, data) => handleStop("element1", e, data)}
              position={positions["element1"]}
            >
              <div
                ref={element1Ref}
                style={{
                  width: "200px",
                  height: "50px",
                  backgroundColor: "lightblue",
                  position: "absolute",
                }}
              >
                Produit
              </div>
            </Draggable>

            <Draggable
              nodeRef={element2Ref}
              bounds="parent"
              onStop={(e, data) => handleStop("element2", e, data)}
              position={positions["element2"]}
            >
              <div
                ref={element2Ref}
                style={{
                  backgroundColor: "lightgreen",
                  position: "absolute",
                  left: `${coord.x2}px`,
                  top: `${coord.y2}px`,
                }}
              >
                <p>Prix</p>
                <p>Element : {}</p>
                <p>Top : {positions.element2 ? positions.element2.y : 'N/A'}</p>
                <p>left : {coord.x2} </p>
                <p> left: `${coord.x2}px`, </p>
              </div>
            </Draggable>
          </div>
        </>
      )}
    </>
  );
};

export default Boutiques_Edit;

/*
 
*/
