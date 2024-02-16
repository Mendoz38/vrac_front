import React, { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import { getAllBoutiques } from "../../api/boutique";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrash } from '@fortawesome/free-solid-svg-icons'

const Boutiques = (props) => {
    const [listeBoutiques, setListeBoutiques] = useState([]);

    useEffect(() => {
        getAllBoutiques()
            .then((result) => {
                setListeBoutiques(result);
            })
            .catch(err => console.log(err));
    }, [props]);

    return (
        <>
            {listeBoutiques && (
                <>
                    <h1 className="centre">{listeBoutiques.length} Boutiques</h1>
            <section>
            </section>
            <table className="projects-table">
						<thead>
							<tr>
								<th>Boutique</th>
								<th>Adresse</th>
								<th>Téléphone</th>
								<th>E-mail</th>
								<th>Supprimer</th>
							</tr>
						</thead>
                        
                {listeBoutiques.map((liste) => {
                    return (
						<tr  key={liste.id}>
							<td>
                            <Link to={`/Boutique_Edit/${liste.id}`}>
								<p>{liste.nom_boutique}</p>
                            </Link>
							</td>
							<td>
								<p>{liste.adresse}</p>
							</td>
							<td>
								<p>{liste.telephone}</p>
								
							</td>
							<td>
								<p>{liste.mail}</p>
							</td>
							<td className="status">
                                    <FontAwesomeIcon icon={faTrash} />
							</td>
						</tr>
                    )
                })}

					</table>

                </>
            )}
        </>
    );
};

export default Boutiques;