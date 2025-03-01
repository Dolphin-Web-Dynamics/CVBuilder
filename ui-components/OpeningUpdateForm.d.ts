import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Opening } from "./graphql/types";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type OpeningUpdateFormInputValues = {
    job_title?: string;
    company_name?: string;
    full_job_description?: string;
    applied?: boolean;
    submission_date?: string;
    response_date?: string;
    status?: string;
    mode?: string;
    key_requirements?: string[];
};
export declare type OpeningUpdateFormValidationValues = {
    job_title?: ValidationFunction<string>;
    company_name?: ValidationFunction<string>;
    full_job_description?: ValidationFunction<string>;
    applied?: ValidationFunction<boolean>;
    submission_date?: ValidationFunction<string>;
    response_date?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    mode?: ValidationFunction<string>;
    key_requirements?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OpeningUpdateFormOverridesProps = {
    OpeningUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    job_title?: PrimitiveOverrideProps<TextFieldProps>;
    company_name?: PrimitiveOverrideProps<TextFieldProps>;
    full_job_description?: PrimitiveOverrideProps<TextFieldProps>;
    applied?: PrimitiveOverrideProps<SwitchFieldProps>;
    submission_date?: PrimitiveOverrideProps<TextFieldProps>;
    response_date?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    mode?: PrimitiveOverrideProps<TextFieldProps>;
    key_requirements?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type OpeningUpdateFormProps = React.PropsWithChildren<{
    overrides?: OpeningUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    opening?: Opening;
    onSubmit?: (fields: OpeningUpdateFormInputValues) => OpeningUpdateFormInputValues;
    onSuccess?: (fields: OpeningUpdateFormInputValues) => void;
    onError?: (fields: OpeningUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OpeningUpdateFormInputValues) => OpeningUpdateFormInputValues;
    onValidate?: OpeningUpdateFormValidationValues;
} & React.CSSProperties>;
export default function OpeningUpdateForm(props: OpeningUpdateFormProps): React.ReactElement;
