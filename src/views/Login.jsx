import { useState } from "react";
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;


function Login({ getProducts, setIsAuth }) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const eventHandler = (e) => {
        const { name, value } = e.target;
        setFormData((preData) => ({
            ...preData,
            [name]: value
        }))
    };

    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(`${API_BASE}/admin/signin`, formData)
            // console.log(response.data);
            const { token, expired } = response.data;
            // console.log(token, expired);
            document.cookie = `hexToken=${token}; expired=${new Date(expired)};`;
            axios.defaults.headers.common['Authorization'] = token;

            // 登入成功, 取得Token存到cookie, Token放到header, 設定控制畫面的參數設定成true
            setIsAuth(true);
            getProducts();


        } catch (error) {
            setIsAuth(false);
            console.log(error.response);
        }
    };

    return (
        <div className='container login'>
            <h1>請先登入</h1>
            <form className='form-floating' onSubmit={(e) => onSubmit(e)}>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        name="username"
                        placeholder="name@example.com"
                        value={formData.username}
                        onChange={(e) => { eventHandler(e) }} />
                    <label htmlFor="username">Email address</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => { eventHandler(e) }} />
                    <label htmlFor="password">Password</label>
                </div>
                <button type='submit' className='btn btn-primary w-100 mt-2'>登入</button>
            </form >
        </div>
    )
}

export default Login;