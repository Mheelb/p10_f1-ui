"use client";
import { useState } from "react";
import { useRouter, useParams } from 'next/navigation';
import Input from "./common/Input";
import Button from "./common/Button";
import userService from "@/services/userService";
import { RiCloseLargeLine } from "react-icons/ri";

interface AuthPopupProps {
    isVisible: boolean;
    togglePopup: () => void;
}

export default function AuthPopup({ isVisible, togglePopup }: AuthPopupProps) {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [formType, setFormType] = useState("login");
    const [isClosing, setIsClosing] = useState(false);

    const router = useRouter();

    const changeLoginData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const changeRegisterData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        userService().login(loginData.email, loginData.password)
            .then((response) => {
                if (response.status === 200)
                    router.push("/");
                else
                    console.log(response.error);
            })
            .catch((error) => {
                console.error("Login failed", error);
            });
    };

    const register = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        userService().register(registerData.username, registerData.email, registerData.password)
            .then((response) => {
                if (response.status === 200)
                    router.push("/");
                else
                    console.log(response.error);
            })
            .catch((error) => {
                console.error("Registration failed", error);
            });
    };

    const closePopup = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            togglePopup(); 
            setFormType("login");
            setLoginData({ email: "", password: "" });
            setRegisterData({ username: "", email: "", password: "" });
        }, 500);
    };

    return (
        <div>
            {isVisible && (
                <div className="popup-fullscreen-bg">
                    <div className={`popup-fullscreen ${isClosing ? "popup-slide-out" : "popup-slide-in"}`}>
                        <RiCloseLargeLine onClick={() => closePopup()} />
                        <div id="login" className={formType === "login" ? "" : "hidden"}>
                            <h1 className="text-4xl font-bold text-center mt-5">Log in</h1>
                            <p className="text-center mt-2">Please log in to your account</p>
                            <form onSubmit={login} className="flex flex-col gap-4 mt-10">
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="email"
                                    value={loginData.email}
                                    onChange={changeLoginData}
                                />
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    value={loginData.password}
                                    onChange={changeLoginData}
                                />
                                <Button type="submit">Log in</Button>
                            </form>
                            <p className="text-center mt-3">
                                Don't have an account? <a onClick={() => setFormType('register')} className="text-blue-500">Sign up</a>
                            </p>
                        </div>
                        <div id="register" className={formType === "register" ? "" : "hidden"}>
                            <h1 className="text-4xl font-bold text-center mt-5">Sign up</h1>
                            <p className="text-center mt-2">Create a new account</p>
                            <form onSubmit={register} className="flex flex-col gap-4 mt-10">
                                <Input
                                    name="username"
                                    type="text"
                                    placeholder="username"
                                    value={registerData.username}
                                    onChange={changeRegisterData}
                                />
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="email"
                                    value={registerData.email}
                                    onChange={changeRegisterData}
                                />
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    value={registerData.password}
                                    onChange={changeRegisterData}
                                />
                                <Button type="submit">Sign up</Button>
                            </form>
                            <p className="text-center mt-3">
                                Already have an account? <a onClick={() => setFormType('login')} className="text-blue-500">Log in</a>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}