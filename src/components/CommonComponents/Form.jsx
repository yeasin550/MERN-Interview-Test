/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { useEffect, ChangeEvent, ClipboardEvent } from "react";
import {
    useForm,
    FormProvider,
    useFormContext,
} from "react-hook-form";

export function Form({
    model,
    onSubmit,
    children,
    className,
    mode = "onSubmit",
    criteriaMode = "all",
    reValidateMode = "onChange",
}) {
    const form = useForm({
        mode,
        reValidateMode,
        defaultValues: model,
        criteriaMode,
    });

    useEffect(() => {
        if (model) {
            Object.entries(model).forEach(([k, v]) => {
                form.setValue(k, v);
            });
        } else {
            form.reset();
        }
    }, [form, model]);

    return (
        <FormProvider {...form}>
            {typeof children === "function" ? (
                children(form)
            ) : (
                <form
                    className={className}
                    noValidate
                    onSubmit={form.handleSubmit((e) => onSubmit(e, form))}
                >
                    {children}
                </form>
            )}
        </FormProvider>
    );
}

export function FormField({
    name,
    label,
    required,
    type,
    pattern,
    minLength,
    maxLength,
    children,
    onChange,
    onPaste,
}) {
    const form = useFormContext();

    let patternRegex = type === "email" ? /^([^\s@])+@(([^\s@.])+\.)+([^\s.]{2,})+$/i : undefined;
    if (pattern) {
        patternRegex = pattern instanceof RegExp ? pattern : pattern.value;
    }

    const inputProps = form.register(name, {
        required: required ? `${label || name} field is required` : false,
        pattern: patternRegex && {
            value: patternRegex,
            message: type === "email"
                ? "Invalid email address"
                : (pattern && pattern.message) || "Invalid format",
        },
        minLength: minLength && {
            value: minLength,
            message: `${label || name} should be at least ${minLength} character long`,
        },
        maxLength: maxLength && {
            value: maxLength,
            message: `${label || name} should be less than ${maxLength} character long`,
        },
    });

    if (onChange) {
        const inputOnChange = inputProps.onChange;

        inputProps.onChange = (e) => {
            onChange(e, form);
            return inputOnChange(e);
        };
    }

    useEffect(() => {
        if (onPaste) {
            const inputElement = document.querySelector(`[name="${name}"]`);
            if (inputElement) {
                const handlePaste = (e) => {
                    onPaste(e, form);
                };

                inputElement.addEventListener("paste", handlePaste);

                return () => {
                    inputElement.removeEventListener("paste", handlePaste);
                };
            }
        }
    }, [name, onPaste, form]);

    if (typeof children === "function") {
        return children({
            ...inputProps,
            type,
            label,
            errors: form.formState.errors[name],
        });
    }

    return children;
}
