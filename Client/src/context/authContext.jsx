import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import moment from "moment";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [showLogoutAlert, setShowLogoutAlert] = useState(false);
    const [activeLoginTab, setActiveLoginTab] = useState("admin");
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    const [accessToken, setAccessToken] = useState(sessionStorage.getItem('access-data') ? JSON.parse(sessionStorage.getItem('access-data')).token : '');
    const [accessRole, setAccessRole] = useState(sessionStorage.getItem('access-data') ? JSON.parse(sessionStorage.getItem('access-data')).role : '');
    const [isAuthentic, setIsAuthentic] = useState(false);
    const [isTokenLogged, setIsTokenLogged] = useState(false);
    const [isLoggedIn, setIsloggedIn] = useState(false);

    const { toast } = useToast();
    const currentTimeStamp = moment().format('dddd, MMMM D, YYYY [at] h:mm A');

    const loginUser = async () => {
        setIsloggedIn(true);
        try {
            const { data } = await axios.post(`${BASE_URL}/api/user/login`, { ...inputValue, role: activeLoginTab }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            if (data.success) {
                setIsloggedIn(false);
                // Store token and role in sessionStorage
                const tokenData = { token: data.accessData.token, role: data.accessData.role };
                sessionStorage.setItem('access-data', JSON.stringify(tokenData));
                
                // Update state values
                setAccessToken(data.accessData.token);
                setAccessRole(data.accessData.role);
                setIsAuthentic(true);

                // Show success message
                toast({
                    title: data.message,
                    description: currentTimeStamp,
                });
            } else {
                setIsloggedIn(false);
                toast({
                    title: data.message,
                    description: currentTimeStamp,
                });
            }
        } catch (error) {
            console.log(error);
            setIsloggedIn(false);
            toast({
                title: error.message,
                description: currentTimeStamp,
            });
        }
    };

    const logoutUser = () => {
        sessionStorage.removeItem('access-data');
        
        // Reset state values
        setAccessToken('');
        setAccessRole('');
        setIsAuthentic(false);
        setShowLogoutAlert(false);

        // Show logout success message
        toast({
            title: 'Successfully logged out',
            description: currentTimeStamp
        });
    };

    useEffect(() => {
        // When accessToken changes, update the login state
        if (accessToken) {
            setIsAuthentic(true);
        } else {
            setIsAuthentic(false);
        }

        // Log the accessToken only once when it's first set
        if (accessToken && !isTokenLogged) {
            setIsTokenLogged(true);
        }
    }, [accessToken, isTokenLogged]);

    const value = {
        showLogoutAlert,
        setShowLogoutAlert,
        activeLoginTab,
        setActiveLoginTab,
        inputValue,
        setInputValue,
        loginUser,
        accessToken,
        isAuthentic,
        role: accessRole,
        logoutUser,
        isLoggedIn
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
