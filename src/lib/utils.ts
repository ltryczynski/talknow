import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'


export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes))

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);