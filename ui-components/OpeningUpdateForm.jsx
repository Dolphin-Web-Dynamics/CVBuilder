/* eslint-disable */
"use client";
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getOpening } from "./graphql/queries";
import { updateOpening } from "./graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function OpeningUpdateForm(props) {
  const {
    id: idProp,
    opening: openingModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    job_title: "",
    company_name: "",
    full_job_description: "",
    applied: false,
    submission_date: "",
    response_date: "",
    status: "",
    mode: "",
    key_requirements: [],
  };
  const [job_title, setJob_title] = React.useState(initialValues.job_title);
  const [company_name, setCompany_name] = React.useState(
    initialValues.company_name
  );
  const [full_job_description, setFull_job_description] = React.useState(
    initialValues.full_job_description
  );
  const [applied, setApplied] = React.useState(initialValues.applied);
  const [submission_date, setSubmission_date] = React.useState(
    initialValues.submission_date
  );
  const [response_date, setResponse_date] = React.useState(
    initialValues.response_date
  );
  const [status, setStatus] = React.useState(initialValues.status);
  const [mode, setMode] = React.useState(initialValues.mode);
  const [key_requirements, setKey_requirements] = React.useState(
    initialValues.key_requirements
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = openingRecord
      ? { ...initialValues, ...openingRecord }
      : initialValues;
    setJob_title(cleanValues.job_title);
    setCompany_name(cleanValues.company_name);
    setFull_job_description(cleanValues.full_job_description);
    setApplied(cleanValues.applied);
    setSubmission_date(cleanValues.submission_date);
    setResponse_date(cleanValues.response_date);
    setStatus(cleanValues.status);
    setMode(cleanValues.mode);
    setKey_requirements(cleanValues.key_requirements ?? []);
    setCurrentKey_requirementsValue("");
    setErrors({});
  };
  const [openingRecord, setOpeningRecord] = React.useState(openingModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getOpening.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getOpening
        : openingModelProp;
      setOpeningRecord(record);
    };
    queryData();
  }, [idProp, openingModelProp]);
  React.useEffect(resetStateValues, [openingRecord]);
  const [currentKey_requirementsValue, setCurrentKey_requirementsValue] =
    React.useState("");
  const key_requirementsRef = React.createRef();
  const validations = {
    job_title: [],
    company_name: [],
    full_job_description: [],
    applied: [],
    submission_date: [],
    response_date: [],
    status: [],
    mode: [],
    key_requirements: [],
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
          job_title: job_title ?? null,
          company_name: company_name ?? null,
          full_job_description: full_job_description ?? null,
          applied: applied ?? null,
          submission_date: submission_date ?? null,
          response_date: response_date ?? null,
          status: status ?? null,
          mode: mode ?? null,
          key_requirements: key_requirements ?? null,
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
            query: updateOpening.replaceAll("__typename", ""),
            variables: {
              input: {
                id: openingRecord.id,
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
      {...getOverrideProps(overrides, "OpeningUpdateForm")}
      {...rest}
    >
      <TextField
        label="Job title"
        isRequired={false}
        isReadOnly={false}
        value={job_title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_title: value,
              company_name,
              full_job_description,
              applied,
              submission_date,
              response_date,
              status,
              mode,
              key_requirements,
            };
            const result = onChange(modelFields);
            value = result?.job_title ?? value;
          }
          if (errors.job_title?.hasError) {
            runValidationTasks("job_title", value);
          }
          setJob_title(value);
        }}
        onBlur={() => runValidationTasks("job_title", job_title)}
        errorMessage={errors.job_title?.errorMessage}
        hasError={errors.job_title?.hasError}
        {...getOverrideProps(overrides, "job_title")}
      ></TextField>
      <TextField
        label="Company name"
        isRequired={false}
        isReadOnly={false}
        value={company_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_title,
              company_name: value,
              full_job_description,
              applied,
              submission_date,
              response_date,
              status,
              mode,
              key_requirements,
            };
            const result = onChange(modelFields);
            value = result?.company_name ?? value;
          }
          if (errors.company_name?.hasError) {
            runValidationTasks("company_name", value);
          }
          setCompany_name(value);
        }}
        onBlur={() => runValidationTasks("company_name", company_name)}
        errorMessage={errors.company_name?.errorMessage}
        hasError={errors.company_name?.hasError}
        {...getOverrideProps(overrides, "company_name")}
      ></TextField>
      <TextField
        label="Full job description"
        isRequired={false}
        isReadOnly={false}
        value={full_job_description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_title,
              company_name,
              full_job_description: value,
              applied,
              submission_date,
              response_date,
              status,
              mode,
              key_requirements,
            };
            const result = onChange(modelFields);
            value = result?.full_job_description ?? value;
          }
          if (errors.full_job_description?.hasError) {
            runValidationTasks("full_job_description", value);
          }
          setFull_job_description(value);
        }}
        onBlur={() =>
          runValidationTasks("full_job_description", full_job_description)
        }
        errorMessage={errors.full_job_description?.errorMessage}
        hasError={errors.full_job_description?.hasError}
        {...getOverrideProps(overrides, "full_job_description")}
      ></TextField>
      <SwitchField
        label="Applied"
        defaultChecked={false}
        isDisabled={false}
        isChecked={applied}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              job_title,
              company_name,
              full_job_description,
              applied: value,
              submission_date,
              response_date,
              status,
              mode,
              key_requirements,
            };
            const result = onChange(modelFields);
            value = result?.applied ?? value;
          }
          if (errors.applied?.hasError) {
            runValidationTasks("applied", value);
          }
          setApplied(value);
        }}
        onBlur={() => runValidationTasks("applied", applied)}
        errorMessage={errors.applied?.errorMessage}
        hasError={errors.applied?.hasError}
        {...getOverrideProps(overrides, "applied")}
      ></SwitchField>
      <TextField
        label="Submission date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={submission_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_title,
              company_name,
              full_job_description,
              applied,
              submission_date: value,
              response_date,
              status,
              mode,
              key_requirements,
            };
            const result = onChange(modelFields);
            value = result?.submission_date ?? value;
          }
          if (errors.submission_date?.hasError) {
            runValidationTasks("submission_date", value);
          }
          setSubmission_date(value);
        }}
        onBlur={() => runValidationTasks("submission_date", submission_date)}
        errorMessage={errors.submission_date?.errorMessage}
        hasError={errors.submission_date?.hasError}
        {...getOverrideProps(overrides, "submission_date")}
      ></TextField>
      <TextField
        label="Response date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={response_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_title,
              company_name,
              full_job_description,
              applied,
              submission_date,
              response_date: value,
              status,
              mode,
              key_requirements,
            };
            const result = onChange(modelFields);
            value = result?.response_date ?? value;
          }
          if (errors.response_date?.hasError) {
            runValidationTasks("response_date", value);
          }
          setResponse_date(value);
        }}
        onBlur={() => runValidationTasks("response_date", response_date)}
        errorMessage={errors.response_date?.errorMessage}
        hasError={errors.response_date?.hasError}
        {...getOverrideProps(overrides, "response_date")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_title,
              company_name,
              full_job_description,
              applied,
              submission_date,
              response_date,
              status: value,
              mode,
              key_requirements,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <TextField
        label="Mode"
        isRequired={false}
        isReadOnly={false}
        value={mode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              job_title,
              company_name,
              full_job_description,
              applied,
              submission_date,
              response_date,
              status,
              mode: value,
              key_requirements,
            };
            const result = onChange(modelFields);
            value = result?.mode ?? value;
          }
          if (errors.mode?.hasError) {
            runValidationTasks("mode", value);
          }
          setMode(value);
        }}
        onBlur={() => runValidationTasks("mode", mode)}
        errorMessage={errors.mode?.errorMessage}
        hasError={errors.mode?.hasError}
        {...getOverrideProps(overrides, "mode")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              job_title,
              company_name,
              full_job_description,
              applied,
              submission_date,
              response_date,
              status,
              mode,
              key_requirements: values,
            };
            const result = onChange(modelFields);
            values = result?.key_requirements ?? values;
          }
          setKey_requirements(values);
          setCurrentKey_requirementsValue("");
        }}
        currentFieldValue={currentKey_requirementsValue}
        label={"Key requirements"}
        items={key_requirements}
        hasError={errors?.key_requirements?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "key_requirements",
            currentKey_requirementsValue
          )
        }
        errorMessage={errors?.key_requirements?.errorMessage}
        setFieldValue={setCurrentKey_requirementsValue}
        inputFieldRef={key_requirementsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Key requirements"
          isRequired={false}
          isReadOnly={false}
          value={currentKey_requirementsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.key_requirements?.hasError) {
              runValidationTasks("key_requirements", value);
            }
            setCurrentKey_requirementsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("key_requirements", currentKey_requirementsValue)
          }
          errorMessage={errors.key_requirements?.errorMessage}
          hasError={errors.key_requirements?.hasError}
          ref={key_requirementsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "key_requirements")}
        ></TextField>
      </ArrayField>
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
          isDisabled={!(idProp || openingModelProp)}
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
              !(idProp || openingModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
