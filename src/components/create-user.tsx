"use client";

import { useState } from "react";
import { type User } from "@/lib/api";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { z } from "zod";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { PlusIcon } from "lucide-react";

const userCreateSchema = z.object({
    id: z.string().min(1, "ID is required"),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    birthDate: z.string().min(1, "Birth date is required"),
});

interface Props {
    onAddUser: (user: User) => void;
}

export default function CreateUser({ onAddUser }: Props) {
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        phone: "",
    });

    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedForm = { ...form, [name]: value };
        setForm(updatedForm);


        const result = userCreateSchema.safeParse(updatedForm);
        const newErrors: Record<string, string[]> = {};
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                const path = issue.path[0] as string;
                if (!newErrors[path]) newErrors[path] = [];
                newErrors[path].push(issue.message);
            });
        }
        setErrors(newErrors);
    };

    const handleSubmit = () => {
        const result = userCreateSchema.safeParse(form);
        if (!result.success) {
            const newErrors: Record<string, string[]> = {};
            result.error.issues.forEach((issue) => {
                const path = issue.path[0] as string;
                if (!newErrors[path]) newErrors[path] = [];
                newErrors[path].push(issue.message);
            });
            setErrors(newErrors);
            return;
        }

        const birthDate = new Date(form.birthDate);
        const age = isNaN(birthDate.getTime())
            ? 0
            : new Date().getFullYear() - birthDate.getFullYear();

        const newUser: User = {
            id: Number(form.id),
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            birthDate: form.birthDate,
            phone: form.phone,
            age: age,
        };

        onAddUser(newUser);

        setForm({
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            birthDate: "",
            phone: "",
        });

        setOpen(false);
    };

    return (
        <Drawer open={open} onOpenChange={setOpen} direction={isMobile ? "bottom" : "right"}>
            <DrawerTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <span className="hidden lg:inline">Add User</span>
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader className="border-b pb-4">
                    <DrawerTitle className="text-xl">Create New User</DrawerTitle>
                </DrawerHeader>

                <div className="flex flex-col gap-6 overflow-y-auto px-6 py-4">
                    <div className="space-y-6">
                        <Field>
                            <FieldLabel htmlFor="id" className="flex items-center gap-2">
                                User ID
                            </FieldLabel>
                            <Input
                                id="id"
                                type="number"
                                name="id"
                                value={form.id}
                                onChange={handleChange}
                                placeholder=""
                                className={errors.id ? "border-destructive focus-visible:ring-destructive" : ""}
                            />
                            {errors.id?.map((err, i) => (
                                <FieldError key={i}>{err}</FieldError>
                            ))}
                        </Field>

                        <div className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor="firstName" className="flex items-center gap-2">
                                    First Name
                                </FieldLabel>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    className={errors.firstName ? "border-destructive focus-visible:ring-destructive" : ""}
                                />
                                {errors.firstName?.map((err, i) => (
                                    <FieldError key={i}>{err}</FieldError>
                                ))}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="lastName" className="flex items-center gap-2">
                                    Last Name
                                </FieldLabel>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    className={errors.lastName ? "border-destructive focus-visible:ring-destructive" : ""}
                                />
                                {errors.lastName?.map((err, i) => (
                                    <FieldError key={i}>{err}</FieldError>
                                ))}
                            </Field>
                        </div>

                        <Field>
                            <FieldLabel htmlFor="email" className="flex items-center gap-2">
                                Email Address
                            </FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder=""
                                className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                            />
                            {errors.email?.map((err, i) => (
                                <FieldError key={i}>{err}</FieldError>
                            ))}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="birthDate" className="flex items-center gap-2">
                                Birth Date
                            </FieldLabel>
                            <Input
                                id="birthDate"
                                type="date"
                                name="birthDate"
                                value={form.birthDate}
                                onChange={handleChange}
                                className={errors.birthDate ? "border-destructive focus-visible:ring-destructive" : ""}
                            />
                            {errors.birthDate?.map((err, i) => (
                                <FieldError key={i}>{err}</FieldError>
                            ))}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="phone" className="flex items-center gap-2">
                                Phone Number
                            </FieldLabel>
                            <Input
                                id="phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className={errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
                            />
                            {errors.phone?.map((err, i) => (
                                <FieldError key={i}>{err}</FieldError>
                            ))}
                        </Field>
                    </div>
                </div>

                <DrawerFooter className="border-t pt-4 sticky bottom-0 bg-background">
                    <Button
                        className="w-full sm:w-auto"
                        onClick={handleSubmit}
                    >
                        Create User
                    </Button>
                    <DrawerClose asChild>
                        <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
