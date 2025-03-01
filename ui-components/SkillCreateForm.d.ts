import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type SkillCreateFormInputValues = {
    technology?: string;
    isRelevant?: boolean;
    years_of_experience?: number;
};
export declare type SkillCreateFormValidationValues = {
    technology?: ValidationFunction<string>;
    isRelevant?: ValidationFunction<boolean>;
    years_of_experience?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SkillCreateFormOverridesProps = {
    SkillCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    technology?: PrimitiveOverrideProps<TextFieldProps>;
    isRelevant?: PrimitiveOverrideProps<SwitchFieldProps>;
    years_of_experience?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SkillCreateFormProps = React.PropsWithChildren<{
    overrides?: SkillCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SkillCreateFormInputValues) => SkillCreateFormInputValues;
    onSuccess?: (fields: SkillCreateFormInputValues) => void;
    onError?: (fields: SkillCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SkillCreateFormInputValues) => SkillCreateFormInputValues;
    onValidate?: SkillCreateFormValidationValues;
} & React.CSSProperties>;
export default function SkillCreateForm(props: SkillCreateFormProps): React.ReactElement;
