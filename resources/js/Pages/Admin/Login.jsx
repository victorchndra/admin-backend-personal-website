// import route from '../../../../vendor/tightenco/ziggy'

import { useForm } from "@inertiajs/react";
import { CircleAlert } from "lucide-react";

const Login = () => {

    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
        remember: false,
    })

    const submit = (e) => {
        e.preventDefault();
        post(route('auth.login'));
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            {errors.failed && (
                <div className="w-1/5 mb-5 flex items-center justify-center">
                    <CircleAlert className="w-8 h-8 text-red-500"/>
                    <span className="text-red-500 flex text-sm ml-2">{errors.failed}</span>
                </div>
            )}
            <form className="p-10 flex flex-col border rounded-xl w-1/4" onSubmit={submit} method="post">
                <span className="text-xl self-center">Admin Login</span>
                <div className="mt-5 flex flex-col">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username"
                        className={"px-3 py-2 border border-slate-300 rounded-md " + (errors.username && ' !border-red-500')}
                        onChange={(e) => setData('username', e.target.value)}
                        value={data.username}
                        />
                    {errors.username && <span className="text-red-500 text-xs mt-1">{errors.username}</span>}
                </div>
                <div className="mt-5 flex flex-col">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password"
                        className={"px-3 py-2 border border-slate-300 rounded-md " + (errors.password && ' !border-red-500')}
                        onChange={(e) => setData('password', e.target.value)}
                        value={data.password}
                        />
                    {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password}</span>}
                </div>
                <div className="mt-4 flex items-center space-x-2">
                    <input type="checkbox" name="remember" checked={data.remember}
                        onChange={e => setData('remember', e.target.checked)} />
                    <label htmlFor="remember">Remember me</label>
                </div>
                <button disabled={processing} className="mt-6 py-2 bg-cyan-500 text-white rounded-md hover:shadow-sm hover:bg-cyan-400">Submit</button>
            </form>
        </div>
    )
}

export default Login
