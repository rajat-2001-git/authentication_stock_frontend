import { Outlet } from "react-router"

const AuthLayout = () => {
  return (
    <section className="bg-black flex w-full md:w-auto h-screen justify-center items-center">
      <Outlet />
    </section>
  )
}

export default AuthLayout