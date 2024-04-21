import logo from "../../assets/images/rapp-logo.jpeg";
import "./style.css";

export default function Header() {
    return(
        <header>
            <img src={logo} alt="Logo Rapp" />
        </header>
    );
}