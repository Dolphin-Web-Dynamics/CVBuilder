import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Skill } from "./graphql/types";
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
export declare type SkillUpdateFormInputValues = {
    technology?: string;
    isRelevant?: boolean;
    years_of_experience?: number;
};
export declare type SkillUpdateFormValidationValues = {
    technology?: ValidationFunction<string>;
    isRelevant?: ValidationFunction<boolean>;
    years_of_experience?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SkillUpdateFormOverridesProps = {
    SkillUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    technology?: PrimitiveOverrideProps<TextFieldProps>;
    isRelevant?: PrimitiveOverrideProps<SwitchFieldProps>;
    years_of_experience?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SkillUpdateFormProps = React.PropsWithChildren<{
    overrides?: SkillUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    skill?: Skill;
    onSubmit?: (fields: SkillUpdateFormInputValues) => SkillUpdateFormInputValues;
    onSuccess?: (fields: SkillUpdateFormInputValues) => void;
    onError?: (fields: SkillUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SkillUpdateFormInputValues) => SkillUpdateFormInputValues;
    onValidate?: SkillUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SkillUpdateForm(props: SkillUpdateFormProps): React.ReactElement;
