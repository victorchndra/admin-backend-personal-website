const Login = () => {

    const submit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="p-10 flex flex-col border rounded-xl" onSubmit={submit}>
                <span className="text-xl self-center">Admin Login</span>
                <div className="mt-5 flex flex-col">
                    <span>Username:</span>
                    <input type="field" className="px-3 py-2 border border-slate-300 rounded-md"/>
                </div>
                <div className="mt-5 flex flex-col">
                    <span>Password:</span>
                    <input type="password" className="px-3 py-2 border border-slate-300 rounded-md"/>
                </div>
                <button className="mt-5 py-2 bg-slate-100 border rounded-md hover:shadow-sm hover:bg-slate-200">Submit</button>
            </form>
        </div>
    )
}

export default Login
