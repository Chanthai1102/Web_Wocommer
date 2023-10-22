import {
    Card,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function RegisterDashboard() {
    const [username, SetUsername] = useState("")
    const [firstname, SetFirstname] = useState("")
    const [lastname, SetLastname] = useState("")
    const [gmail, SetGmail] = useState("")
    const [password, SetPassword] = useState("")
    const [tel, SetTel] = useState("")
    const [salary, SetSalary] = useState("")
    const [country, SetCountry] = useState("")
    const navigate = useNavigate()
    console.log(gmail)
    console.log(salary)
    const OnSingup = () => {
        const params = {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            tel: tel,
            email: gmail,
            base_salary: salary,
            country: country
        };
        axios({
            url: 'http://localhost:8081/api/employee',
            method: 'POST',
            data: params
        }).then(res =>{
            navigate('/dashboard/login')
        }).catch(err => {
            console.error('Error:', err);
        });
    }
    return (
        <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to register.
            </Typography>
            <form className="mt-8 w-80 max-w-screen-lg sm:w-96">
                <div className="flex flex-col gap-2">
                    <div className="my-4 flex items-center gap-4">
                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                            >
                                First Name
                            </Typography>
                            <Input
                                containerProps={{ className: "min-w-[72px]" }}
                                placeholder="First Name"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange={(e) => SetFirstname(e.target.value)}
                            />
                        </div>
                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                            >
                                Last Name
                            </Typography>
                            <Input
                                containerProps={{ className: "min-w-[72px]" }}
                                placeholder="Last Name"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange={(e) => SetLastname(e.target.value)}
                            />
                        </div>
                    </div>
                    <Typography  color="blue-gray" className="-mb-3">
                        Username
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="Username"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        onChange={(e) => SetUsername(e.target.value)}
                    />
                    <Typography color="blue-gray" className="">
                        Email
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        onChange={(e) => SetGmail(e.target.value)}
                    />
                    <Typography  color="blue-gray" className="">
                        Password
                    </Typography>
                    <Input
                        type="password"
                        size="lg"
                        placeholder="********"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        onChange={(e) => SetPassword(e.target.value)}
                    />
                    <Typography  color="blue-gray" className="">
                        Telephone
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="0XX XXX XXX"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        onChange={(e) => SetTel(e.target.value)}
                    />
                    <div className="my-4 flex items-center gap-4">
                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                            >
                                Base Salary
                            </Typography>
                            <Input
                                maxLength={5}
                                containerProps={{ className: "min-w-[72px]" }}
                                placeholder="XXXX"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange={(e) => SetSalary(e.target.value)}
                            />
                        </div>
                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                            >
                                Country
                            </Typography>
                            <Input
                                maxLength={4}
                                containerProps={{ className: "min-w-[72px]" }}
                                placeholder="Country"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                onChange={(e) => SetCountry(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <Checkbox
                    label={
                        <Typography
                            variant="small"
                            color="gray"
                            className="flex items-center font-normal"
                        >
                            I agree the
                            <a href="/terms-and-conditions"
                                className="font-medium transition-colors hover:text-gray-900"
                            >
                                &nbsp;Terms and Conditions
                            </a>
                        </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }}
                />
                <Button className="mt-6" fullWidth onClick={OnSingup} >
                    sign up
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                    Already have an account?{" "}
                    <a href="/dashboard/login"  className="font-medium text-gray-900">
                        Sign In
                    </a>
                </Typography>
            </form>
        </Card>
    );
}