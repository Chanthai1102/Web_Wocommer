import React from 'react'
import { Progress, Typography } from "@material-tailwind/react";
import zxcvbn from 'zxcvbn'
const PasswordStrengthMeter = ({password}) => {
    const Result = zxcvbn(password)
    const number = Result.score * 100/4
    const funProgresss = () => {
        switch (Result.score){
            case 0:
                return 'red'
            case 1:
                return 'yellow'
            case 2:
                return 'purple'
            case 3:
                return 'blue'
            case 4:
                return 'green'
            default:
                return 'none'
        }
    }
    const textProgresss = () => {
        switch (Result.score){
            case 0:
                return 'very weak'
            case 1:
                return 'weak'
            case 2:
                return 'fair'
            case 3:
                return 'good'
            case 4:
                return 'strength'
            default:
                return 'none'
        }
    }
    return(
        <div className="w-full mt-1">
            <Progress value={number} size="sm" color={funProgresss()} />
            <div className="flex items-center justify-end gap-4">
                <Typography color="blue-gray" className="text-sm">
                    {textProgresss()}
                </Typography>
            </div>
        </div>
    )
}

export default PasswordStrengthMeter