import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const baseUrl = "http://localhost:8080/v1"
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const loginUser = (event) => {
    event.preventDefault()
    setLoading(true)
    const data = {
      email: email,
      password: password
    }
    axios.post(`${baseUrl}/login`, data)
      .then((res) => {
        console.log(res.data.data.role)
        if(res.data.data.role !== 'admin') {
          alert('Anda tidak memiliki akses')
          return
        } else {
          localStorage.setItem('token', res.data.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.data))
          // console.log(res.data.data)
          
          navigate('/')
        }
       
      })
      .catch((err) => {
        setError(err.response.data.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="bg-white flex items-center h-screen w-full">
      <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
        <span className="block w-full text-xl uppercase font-bold mb-4 text-black">Login</span>
        <form onSubmit={loginUser} className="mb-4">
          <div className="mb-4 md:w-full">
            <label for="email" className="block text-xs mb-1">Username or Email</label>
            <input className="w-full border rounded p-2 outline-none focus:shadow-outline" value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="Username or Email" />
          </div>
          <div className="mb-6 md:w-full">
            <label for="password" className="block text-xs mb-1">Password</label>
            <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </div>
          <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded" type="submit">Login</button>
        </form>
        <a className="text-blue-700 text-center text-sm" href="/login">Belum punya akun?</a>
      </div>
    </div>
  )
  
   
}

export default Login