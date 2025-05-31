"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { set, useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useState } from "react"
import { authUser } from "@/constants/data"
import { useRouter } from "next/navigation"

const LoginSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be between 2 and 50 characters long",
  }),
  password: z.string().nonempty({
    message: "Password is required",
  }).min(6, {
    message: "Password must be at least 6 characters long",
  }).max(50, {
    message: "Password must be at most 50 characters long",
  }),
});
// type LoginRequest = z.infer<typeof LoginSchema>;
// type LoginRequest = {
//   username: string
//   password: string
// }


export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    }
    // ,
    // mode: "onBlur",
    // reValidateMode: "onBlur",
    // criteriaMode: "all",
    // shouldFocusError: true,
    // shouldUnregister: true,
    // delayError: 1000,
    // shouldUseNativeValidation: false,
    // values: {
    //   username: "",
    //   password: "",
    // },  
  })
  const {
    // register,
    handleSubmit,
    // formState: { errors },
     watch
  } = form
  
  const router = useRouter()
  const username = watch("username")
  const [authMessage, setAuthMessage] =useState<string>()

  function onSubmit(data: z.infer<typeof LoginSchema>) {
       const { username, password } = authUser
    // Handle login logic here, e.g., API call
    if (username== data.username && password==data.password) {
      setAuthMessage("Login successful") 
      router.replace("/dashboard")
    } else {
      setAuthMessage("Invalid username or password")  
  }
}
  return (

    <Form {...form}>  
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Welcome {username}</h1>

            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                 < FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <Input
                        {...field}
                        id="username"
                        type="text"
                        className={cn(
                          "peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-500",
                          field.value ? "border-cyan-500" : ""
                        )}
                        placeholder="Username"
                      />
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                /> 
                </div>
                <div className="relative">
                  < FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        className={cn(
                          "peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-500",
                          field.value ? "border-cyan-500" : ""
                        )}
                        placeholder="password"
                      />
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                /> 
                </div>
                <div className="relative">

                  <Button type="submit" className="bg-cyan-500 text-white rounded-md px-2 py-1">
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
              <span>Continue with Google</span>
            </button>
          </div>

        </div>
      </div>
    </form>
  </Form>
  )
}
