/* eslint-disable */
"use client";
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getSkill } from "./graphql/queries";
import { updateSkill } from "./graphql/mutations";
const client = generateClient();
export default function SkillUpdateForm(props) {
  const {
    id: idProp,
    skill: skillModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    technology: "",
    isRelevant: false,
    years_of_experience: "",
  };
  const [technology, setTechnology] = React.useState(initialValues.technology);
  const [isRelevant, setIsRelevant] = React.useState(initialValues.isRelevant);
  const [years_of_experience, setYears_of_experience] = React.useState(
    initialValues.years_of_experience
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = skillRecord
      ? { ...initialValues, ...skillRecord }
      : initialValues;
    setTechnology(cleanValues.technology);
    setIsRelevant(cleanValues.isRelevant);
    setYears_of_experience(cleanValues.years_of_experience);
    setErrors({});
  };
  const [skillRecord, setSkillRecord] = React.useState(skillModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getSkill.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getSkill
        : skillModelProp;
      setSkillRecord(record);
    };
    queryData();
  }, [idProp, skillModelProp]);
  React.useEffect(resetStateValues, [skillRecord]);
  const validations = {
    technology: [{ type: "Required" }],
    isRelevant: [],
    years_of_experience: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          technology,
          isRelevant: isRelevant ?? null,
          years_of_experience: years_of_experience ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateSkill.replaceAll("__typename", ""),
            variables: {
              input: {
                id: skillRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "SkillUpdateForm")}
      {...rest}
    >
      <TextField
        label="Technology"
        isRequired={true}
        isReadOnly={false}
        value={technology}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              technology: value,
              isRelevant,
              years_of_experience,
            };
            const result = onChange(modelFields);
            value = result?.technology ?? value;
          }
          if (errors.technology?.hasError) {
            runValidationTasks("technology", value);
          }
          setTechnology(value);
        }}
        onBlur={() => runValidationTasks("technology", technology)}
        errorMessage={errors.technology?.errorMessage}
        hasError={errors.technology?.hasError}
        {...getOverrideProps(overrides, "technology")}
      ></TextField>
      <SwitchField
        label="Is relevant"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isRelevant}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              technology,
              isRelevant: value,
              years_of_experience,
            };
            const result = onChange(modelFields);
            value = result?.isRelevant ?? value;
          }
          if (errors.isRelevant?.hasError) {
            runValidationTasks("isRelevant", value);
          }
          setIsRelevant(value);
        }}
        onBlur={() => runValidationTasks("isRelevant", isRelevant)}
        errorMessage={errors.isRelevant?.errorMessage}
        hasError={errors.isRelevant?.hasError}
        {...getOverrideProps(overrides, "isRelevant")}
      ></SwitchField>
      <TextField
        label="Years of experience"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={years_of_experience}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              technology,
              isRelevant,
              years_of_experience: value,
            };
            const result = onChange(modelFields);
            value = result?.years_of_experience ?? value;
          }
          if (errors.years_of_experience?.hasError) {
            runValidationTasks("years_of_experience", value);
          }
          setYears_of_experience(value);
        }}
        onBlur={() =>
          runValidationTasks("years_of_experience", years_of_experience)
        }
        errorMessage={errors.years_of_experience?.errorMessage}
        hasError={errors.years_of_experience?.hasError}
        {...getOverrideProps(overrides, "years_of_experience")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || skillModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || skillModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
