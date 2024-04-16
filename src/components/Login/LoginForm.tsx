import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../app/redux";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
            navigate('/home');
        };

        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-xl rounded-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Bienvenido a Pixel Shop
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Por favor inicia sesión en tu cuenta
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm">
                        <div>
                            <label htmlFor="username" className="sr-only">Nombre de usuario</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Nombre de usuario"
                                value={credentials.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Contraseña"
                                value={credentials.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>
                <div className="mt-6 flex justify-between">
                    <a href="/register" className="font-medium text-gray-600 hover:text-gray-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                        ¿No tienes una cuenta? Regístrate
                    </a>
                    <a href="/forgot-password" className="font-medium text-gray-600 hover:text-gray-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
            </div>
        </div>
);
};
    
export default LoginForm;
