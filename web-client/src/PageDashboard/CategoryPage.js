import axios from 'axios'
import {useEffect, useState} from "react"
// import { request } from "../Share/request"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    Chip,
    CardBody,
    CardFooter,
    IconButton,
    Tooltip,
    Input,
} from "@material-tailwind/react";

const TABLE_HEAD = ["No", "Name", "Description", "Create",""];
export function CategoryPage() {
    const [list,setlist] = useState([])

    useEffect(()=> {
        getlist();
    },[])

    const server = "http://localhost:8081/api/"
    const getlist = () => {
        axios({
            url: server + "category",
            method: "GET",
            data:{

            }
        }).then(res=>{
            var data = res.data
            setlist(data.list)
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <Card className="h-full w-full py-3 px-4">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="blue-gray ">
                            Category Product
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            These are details about the last transactions
                        </Typography>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <div className="w-full md:w-72">
                            <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
                        </div>
                        <Button className="flex items-center gap-3" color="blue" size="sm">
                            <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Add Category
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <div className="flex flex-col justify-between h-full">
                <CardBody>
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="leading-none font-bold"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {list.map((item, index) => {
                                const isLast = index === list.length - 1;
                                const classes = isLast ? "p-2" : "p-2 border-b border-blue-gray-50";

                                return (
                                    <tr >
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Typography variant="small" color="blue-gray" className="font-bold">
                                                    {index + 1}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {item.name}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {item.description}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    size="sm"
                                                    variant="ghost"
                                                    value={item.status}
                                                    color={
                                                        item.status === 1 ? "green" : item.status === 0 ? "amber" : "red"
                                                    }
                                                />
                                            </div>
                                        </td>

                                        <td className={classes}>
                                            <Tooltip content="Edit Category">
                                                <IconButton variant="text" color="blue-gray">
                                                    <PencilIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip content="Delete Category">
                                                <IconButton variant="text" color="blue-gray">
                                                    <TrashIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Button variant="outlined" color="blue-gray" size="sm">
                        Previous
                    </Button>
                    <Button variant="outlined" color="blue-gray" size="sm">
                        Next
                    </Button>
                </CardFooter>
            </div>
        </Card>
    );
}