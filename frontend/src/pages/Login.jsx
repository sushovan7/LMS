import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/userAuthApi";
import toast from "react-hot-toast";

export default function Login() {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const [
    registerUser,
    {
      data: registerData,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
      isError: registerIsError,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
      isError: loginIsError,
    },
  ] = useLoginUserMutation();

  async function handleLoginAndSignUp(type) {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  }

  useEffect(() => {
    if (registerIsSuccess) {
      toast.success("User registered successfully");
      setSignupInput({
        name: "",
        email: "",
        password: "",
      });
    } else if (registerIsError) {
      toast.error("failed to register");
    }

    if (loginIsSuccess) {
      toast.success("User logged in successfully");
      setLoginInput({ email: "", password: "" });
    } else if (loginIsError) {
      toast.error("Failed to login");
    }
  }, [registerIsSuccess, registerIsError, loginIsSuccess, loginIsError]);

  function onChangeHandler(e, type) {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginInput((prev) => ({ ...prev, [name]: value }));
    }
  }

  return (
    <div className="flex items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Please signup to create your account. Click signup when you're
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  value={signupInput.name}
                  name="name"
                  onChange={(e) => onChangeHandler(e, "signup")}
                  placeholder="jon doe"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  value={signupInput.email}
                  type="email"
                  onChange={(e) => onChangeHandler(e, "signup")}
                  placeholder="example@gmail.com"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  value={signupInput.password}
                  type="password"
                  placeholder="password"
                  onChange={(e) => onChangeHandler(e, "signup")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={() => handleLoginAndSignUp("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    ...Please wait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Please login to your account. Click login when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={loginInput.email}
                    placeholder="example@gmail.com"
                    onChange={(e) => onChangeHandler(e, "login")}
                  />
                </div>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  placeholder="password"
                  onChange={(e) => onChangeHandler(e, "login")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginIsLoading}
                onClick={() => handleLoginAndSignUp("login")}
              >
                {loginIsLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    ...Please wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
