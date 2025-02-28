import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Social } from "./graphql/types";
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
export declare type SocialUpdateFormInputValues = {
    type?: string;
    url?: string;
};
export declare type SocialUpdateFormValidationValues = {
    type?: ValidationFunction<string>;
    url?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SocialUpdateFormOverridesProps = {
    SocialUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SocialUpdateFormProps = React.PropsWithChildren<{
    overrides?: SocialUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    social?: Social;
    onSubmit?: (fields: SocialUpdateFormInputValues) => SocialUpdateFormInputValues;
    onSuccess?: (fields: SocialUpdateFormInputValues) => void;
    onError?: (fields: SocialUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SocialUpdateFormInputValues) => SocialUpdateFormInputValues;
    onValidate?: SocialUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SocialUpdateForm(props: SocialUpdateFormProps): React.ReactElement;
