import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {useState,useEffect} from "react";
import axios from "axios";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Textarea,
    Select,
    Option
} from "@material-tailwind/react";

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Active",
        value: "monitored",
    },
    {
        label: "Unactive",
        value: "unmonitored",
    },
];

const TABLE_HEAD = ["Name", "Description","Parent", "Status", "Action"];


export function CategoryPage() {
    const [list, setList] = useState([])
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState(null)
    const [form, setForm] = useState(false)
    const [name , SetName] = useState("")
    const [description , SetDescription] = useState("")
    const [parent, SetParent] = useState("")
    const [status, SetStatus] = useState("")

    useEffect(()=>{
        getlist();
    },[])
    const getlist = () =>{
        axios({
            url: "http://localhost:8081/api/category",
            method: "GET",
            data : {

            }
        }).then(res=>{
            var data = res.data
            setList(data.list)
        }).catch(err=>{
            console.log(err)
        })
    }

    const OnBtnDelete = (id) => {
        setItem(id)
        setOpen(true)
    }
    const handleOpen = () => {
        setOpen(false)
        setItem(null)
    }
    const FormOpen = () => {
        setForm(false)
        setItem(null)
        ClearForm()
    }
    const ClearForm = () => {
        SetName("")
        SetDescription("")
        SetParent("")
        SetStatus("")
    }
    const ClickEditOrCreate = (id) => {
        setItem(id)
        SetName(id.name)
        SetDescription(id.description)
        SetParent(id.parent)
        SetStatus(id.status)
        setForm(true)

    }
    const onDelete = () =>{
        setOpen(false)
        var id = item.category_id
        axios({
            url: "http://localhost:8081/api/category/" + id ,
            method: "DELETE",
        }).then(res=>{
            getlist()
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <Card className="h-full w-full relative">
            <CardHeader floated={false} shadow={false} className="rounded">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Category list
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all Category
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button size="md" color="blue-gray" onClick={ClickEditOrCreate}>Create Category</Button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Tabs value="all" className="w-full md:w-max">
                        <TabsHeader>
                            {TABS.map(({ label, value }) => (
                                <Tab key={value} value={value}>
                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {list.map(
                        (item, index) => {
                            const isLast = index === list.length - 1;
                            const classes = isLast
                                ? "p-3"
                                : "p-3 border-b border-blue-gray-50";

                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {item.name}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {item.description}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item.parent_id ? item.parent_id : "No Parent"}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max">
                                            <Chip
                                                variant="ghost"
                                                color={item.status ? "green" : "blue-gray"}
                                                size="sm"
                                                value={item.status ? "Active" : "Unactive"}
                                                icon={
                                                    <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                                                }
                                            />
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex">
                                            <PencilIcon className="h-4 w-4 mr-4 text-blue-800" onClick={() => ClickEditOrCreate(item)}   />
                                            <TrashIcon className="h-4 w-4 text-red-800" onClick={() => OnBtnDelete(item)} />
                                        </div>
                                    </td>
                                </tr>
                            );
                        },
                    )}
                    </tbody>
                </table>
                <Dialog
                    open={form}
                    handler={FormOpen}
                    animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                    }}
                    size="xs"
                >
                    <DialogHeader className="">{item?.category_id == null ? "Create Category" : "Edit Category"}</DialogHeader>
                    <DialogBody className="mx-auto w-full max-w-[32rem]">
                        <form className="flex flex-col gap-4">
                            <Input label="Name"
                                   value={name}
                            />
                            <Textarea label="Description" value={description}/>
                            <Select label="Select Parent" value={parent} >
                                {list.map((item,index) => {
                                    return(
                                        <Option key={index} value={item.category_id}>{item.name}</Option>
                                    )
                                })}
                            </Select>
                            <Select label="Select Status" value={status == 1 ? "Active" : "Unactive"}>
                                <Option>Action</Option>
                                <Option>Unaction</Option>
                            </Select>
                        </form>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={FormOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="blue-gray" onClick={ClearForm} className="mr-1">
                            <span>Clear</span>
                        </Button>
                        <Button variant="gradient" color="green" onClick={FormOpen}>
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
                <Dialog
                    open={open}
                    size = "xs"
                    handler={handleOpen}
                    animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                    }}
                >
                    <DialogHeader>Delete Category</DialogHeader>
                    <DialogBody divider>
                        Did you want to delete this category ?
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" onClick={onDelete}>
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 bottom-0 absolute w-full">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm">
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm">
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}