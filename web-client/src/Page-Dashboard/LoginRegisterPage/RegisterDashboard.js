import {
    Card,
    Typography,
    Input,
    Checkbox,
    Button,
    Dialog,
    DialogBody,
} from "@material-tailwind/react";
import {useState} from "react";
import axios from "axios";
import {useEffect} from "react";
import PasswordStrengthMeter from "../../component/PasswordStrengthMeter";

export function RegisterDashboard() {
    const [username, SetUsername] = useState("")
    const [firstname, SetFirstname] = useState("")
    const [lastname, SetLastname] = useState("")
    const [gmail, SetGmail] = useState("")
    const [password, SetPassword] = useState("")
    const [tel, SetTel] = useState("")
    const [salary, SetSalary] = useState("")
    const [country, SetCountry] = useState("")
    const [usernameAvailable, setUsernameAvailable] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    useEffect(() => {
        if (username) {
            axios.get(`http://localhost:8081/api/employee/check-username/${username}`)
                .then((response) => {
                    setUsernameAvailable(response.data.available);
                })
                .catch(err => {
                    console.error('Error checking username availability:', err);
                });
        }
    }, [username]);
    const Clearform = () => {
        SetFirstname("")
        SetLastname("")
        SetUsername("")
        SetPassword("")
        SetTel("")
        SetGmail("")
        SetSalary("")
        SetCountry("")
    }
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
            setOpen(true)
            Clearform()
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
                    <div className="my-2 flex items-center gap-4">
                        <div>
                            <Input
                                containerProps={{ className: "min-w-[72px]" }}
                                label="First Name"
                                value={firstname}
                                onChange={(e) => SetFirstname(e.target.value)}
                            />
                        </div>
                        <div>
                            <Input
                                containerProps={{ className: "min-w-[72px]" }}
                                label="Last Name"
                                value={lastname}
                                onChange={(e) => SetLastname(e.target.value)}
                            />
                        </div>
                    </div>
                    <Input
                        label="Username"
                        size="lg"
                        value={username}
                        color={usernameAvailable ? 'green' : 'red'}
                        onChange={(e) => SetUsername(e.target.value)}
                    />
                    {username && !usernameAvailable && (
                        <Typography color="red" className="text-sm">
                            Username is already taken.
                        </Typography>
                    )}
                    <div className="mt-2">
                        <Input
                            label="Email"
                            value={gmail}
                            size="lg"
                            onChange={(e) => SetGmail(e.target.value)}
                        />
                    </div>
                    <div className="mt-2">
                        <Input
                            type="password"
                            size="lg"
                            label="Password"
                            value={password}
                            onChange={(e) => SetPassword(e.target.value)}
                        />
                        <PasswordStrengthMeter password={password}/>
                    </div>
                    <div className="mt-2">
                        <Input
                            size="lg"
                            label="Phone"
                            value={tel}
                            onChange={(e) => SetTel(e.target.value)}
                        />
                    </div>
                    <div className="my-2 flex items-center gap-4">
                        <div>
                            <Input
                                containerProps={{ className: "min-w-[72px]" }}
                                label="Base Salary"
                                value={salary}
                                onChange={(e) => SetSalary(e.target.value)}
                            />
                        </div>
                        <div>
                            <Input
                                containerProps={{ className: "min-w-[72px]" }}
                                label="Country"
                                value={country}
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
                <Button className="mt-6" fullWidth onClick={OnSingup} disabled={!username || !password || !usernameAvailable} >
                    sign up
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                    Already have an account?{" "}
                    <a href="/dashboard/login"  className="font-medium text-gray-900">
                        Sign In
                    </a>
                </Typography>
            </form>
            <Dialog open={open} handler={handleOpen} size="xs">
                <DialogBody divider className="grid place-items-center gap-4">
                    <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#00ffaa"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 12.3333L10.4615 15L16 9M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#00ff1e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    <Typography color="green" variant="h4">
                        Created Account Success
                    </Typography>
                    <Typography className="text-center font-normal">
                        A small river named Duden flows by their place and supplies it with
                        the necessary regelialia.
                    </Typography>
                </DialogBody>
            </Dialog>
        </Card>
    );
}