import { imageAsset } from "@/assets/assets";
import FormControl from "@/components/comp/FormControl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import { loginFormControl } from "@/config";
import { AuthContext } from "@/context/authContext";
import { Loader2 } from "lucide-react";
import React, { useContext } from "react";

const Login = () => {
  const {activeLoginTab, setActiveLoginTab, inputValue, setInputValue, loginUser, isLoggedIn} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser();
  };

  const handleTabChange = (val) => {
    setActiveLoginTab(val);
  };

  return (
    <div className="w-full h-screen flex overflow-hidden">
      <div className="w-1/2  justify-center items-center hidden lg:flex">
       <img src={imageAsset.loginVector} alt="" className="w-[75%]"/>
      </div>
      <div className="w-full lg:w-1/2 p-12 flex justify-center items-center">
        <Tabs
          value={activeLoginTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className='mb-5'>
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="employee">Employee</TabsTrigger>
          </TabsList>

          <TabsContent value="admin">
            <Card className="p-5">
              <CardHeader className='p-0 mb-3'>
                <CardTitle>Admin Login</CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                <form onSubmit={handleSubmit}>
                  <FormControl
                    formControl={loginFormControl}
                    formData={inputValue}
                    setFormData={setInputValue}
                  />
                  <Button disabled={isLoggedIn ? true : false} className="mt-2">
                    {
                      isLoggedIn ? <><Loader2 className="animate-spin"/> Please Wait</> : 
                      'Login'
                    }
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employee">
            <Card className="p-5">
              <CardHeader className='p-0 mb-3'>
                <CardTitle>Employee Login</CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                <form onSubmit={handleSubmit}>
                  <FormControl
                    formControl={loginFormControl}
                    formData={inputValue}
                    setFormData={setInputValue}
                  />
                  <Button disabled={isLoggedIn ? true : false} className="mt-2">
                    {
                      isLoggedIn ? <><Loader2 className="animate-spin"/> Please Wait</> : 
                      'Login'
                    }
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
