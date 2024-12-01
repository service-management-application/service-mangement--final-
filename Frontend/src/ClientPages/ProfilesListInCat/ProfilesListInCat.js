import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/ClientNavbar";
import Footer from "../../Components/Footer/Footer";

export default function ProfilesListInCat() {
    const { categoryId } = useParams(); // Récupère l'ID de la catégorie depuis l'URL
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/providerS/category/${categoryId}`);
                setProviders(response.data); // Assuming response.data contains the list of providers
                setLoading(false);
            } catch (err) {
                console.error("Error fetching providers:", err);
                setError("Failed to load providers.");
                setLoading(false);
            }
        };

        fetchProviders();
    }, [categoryId]);

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1 className="text-center my-5">Providers in this Category</h1>

                {loading ? (
                    <p>Loading providers...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : providers.length > 0 ? (
                    <div className="row">
                        {providers.map((providerdata) => (
                            <div className="col-md-4" key={providerdata._id}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {providerdata.firstName} {providerdata.lastName}
                                        </h5>
                                        <p className="card-text">
                                            State: {providerdata.state}
                                        </p>
                                        <p className="card-text">
                                            Phone: {providerdata.phoneNumber}
                                        </p>
                                        <Link to={`/client/profile/${providerdata._id}`} className="btn btn-primary">
                                            View Profile
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No providers found in this category.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}
