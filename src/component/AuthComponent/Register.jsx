const Register = () => {
  // const baseUrl = "http://localhost:8080/v1"
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [error, setError] = useState('')
  // const [loading, setLoading] = useState(false)
  // const registerUser = (e) => {

  // }
    return (
        <div className="bg-white flex items-center h-screen w-full">
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
        <span className="block w-full text-xl uppercase font-bold mb-4 text-black">Register</span>      
          <form className="mb-4" action="/" method="post">
          <div className="mb-4 md:w-full">
              <label for="name" className="block text-xs mb-1">Nama</label>
              <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="name" name="name" id="name" placeholder="Nama" />
            </div>
            <div className="mb-4 md:w-full">
              <label for="email" className="block text-xs mb-1">Email</label>
              <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="email" name="email" id="email" placeholder="Email" />
            </div>
            <div className="mb-6 md:w-full">
              <label for="password" className="block text-xs mb-1">Password</label>
              <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="password" name="password" id="password" placeholder="Password" />
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">Register</button>
          </form>
      </div>
    </div>
    )
}

export default Register