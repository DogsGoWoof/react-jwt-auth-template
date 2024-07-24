import { useContext } from 'react'; // import useContext to grab the context
import { AuthedUserContext } from '../../App'; // import the AuthedUserContext
import { Link } from 'react-router-dom';

const NavBar = ({ handleSignout }) => {
    
    const user = useContext(AuthedUserContext); 
    // set the value of user to the imported useContext hook bringing in the value from AuthedUserContext
    
    return (
        <>
            {user ? (
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="" onClick={handleSignout}>Sign Out</Link></li>
                    </ul>
                </nav>
            ) : (
                <nav>
                    <ul>
                        <li><Link to="/signin">Sign In</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </ul>
                </nav>
            )}
        </>
    )
}

export default NavBar;
