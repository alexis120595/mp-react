import{useState, useEffect} from "react"
import "./Product.css"
import{initMercadoPago, Wallet} from "@mercadopago/sdk-react"
import axios from "axios"
import img from "../../assets/bananita.png"
 
const Product =() => {
    const [preferenceId, setPreferenceId] = useState(null);
    initMercadoPago("TEST-44bc8f73-9c01-440f-a57b-3182d9b7a33b");

    const createPreference = async () => {
        try {
            const response = await axios.post("http://localhost:8080/create_preference", {
                description: "Bananita contenta",
                price: 1000,
                quantity: 1,
            });

            const{id} = response.data;
            return id;
              
            
        } catch (error) {
            console.log(error);
            
        }
    };

    const handleBuy = async () => {
        const id = await createPreference();
        if (id) {
        setPreferenceId(id);
        }
    };
       
    return (
        <div className="card-product-container">
            <div className="card-product">
                <div className="card">
                    <img src={img}  alt="..." />
                    <h3> Bananita contenta</h3>
                    <p className="price"> $ 1000</p>
                    <button onClick={handleBuy} >Comprar</button>
                    {preferenceId && <Wallet initialization ={{preferenceId}} />}
                    </div>
                </div>
            </div>
    )
                 
}

export default Product