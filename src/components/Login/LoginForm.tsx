import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../app/redux";

export const LoginForm = () => {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setCredentials({
                    ...credentials,
                    [e.target.name]: e.target.value,
            });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(loginUser({
                username: credentials.username,
                password: credentials.password,
            }) as any);
        };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={credentials.username}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;