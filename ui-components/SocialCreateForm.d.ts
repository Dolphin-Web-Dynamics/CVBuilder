import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type SocialCreateFormInputValues = {
    type?: string;
    url?: string;
};
export declare type SocialCreateFormValidationValues = {
    type?: ValidationFunction<string>;
    url?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SocialCreateFormOverridesProps = {
    SocialCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SocialCreateFormProps = React.PropsWithChildren<{
    overrides?: SocialCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SocialCreateFormInputValues) => SocialCreateFormInputValues;
    onSuccess?: (fields: SocialCreateFormInputValues) => void;
    onError?: (fields: SocialCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SocialCreateFormInputValues) => SocialCreateFormInputValues;
    onValidate?: SocialCreateFormValidationValues;
} & React.CSSProperties>;
export default function SocialCreateForm(props: SocialCreateFormProps): React.ReactElement;
