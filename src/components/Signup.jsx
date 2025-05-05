import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index"
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const signup = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login(userData)) // i think we are already getting an object here
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
            // javaScript can't render an object like error directly it can only render the message inside the error object.
        }

    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(signup)}>
                    <div className="space-y-5">
                        <Input
                            label="name: "
                            placeholder="enter you full name..."
                            {...register("name", {
                                required: "name field is required"
                            })}
                        />

                        <Input
                            label="Email:"
                            placeholder="Enter you email..."
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />

                        <Input
                        label="password"
                        placeholder="enter your password..."
                        type="password"
                        {...register("password",{
                            required:"password field is required"
                        })}
                        /> 

                        <Button type="submit" className="w-full">Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;