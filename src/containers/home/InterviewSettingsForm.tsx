import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormSelect from "../../components/formComponents/FormSelect";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";
import { useData } from "./DataProvider";

interface PropsType {
  updateStep: React.Dispatch<React.SetStateAction<number>>;
}

const InterviewDetailsForm: React.FC<PropsType> = (props: PropsType) => {

  const data = useData()
  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues:  data?.state? data.state.interviewSettings : {
      interviewDuration: "",
      interviewLanguage: "",
      interviewMode: "",
    },
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("Interview Mode is required"),
      interviewDuration: Yup.string().required("Interview Duration is required"),
      interviewLanguage: Yup.string().required("Interview Language is required"),
    }),
    onSubmit: (values) => {
      data?.setState((prev) => ({ ...prev, interviewSettings: values }));
      alert("Form successfully submitted");
    },
  });

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          dataUpdate={(event: any) => {
            data?.setState((prev) => ({
              ...prev,
              interviewSettings: {
                ...prev.interviewSettings,
                [event.name]: event.value,
              },
            }));
          }}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          dataUpdate={(event: any) => {
            data?.setState((prev) => ({
              ...prev,
              interviewSettings: {
                ...prev.interviewSettings,
                [event.name]: event.value,
              },
            }));
          }}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Job Location"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          dataUpdate={(event: any) => {
            data?.setState((prev) => ({
              ...prev,
              interviewSettings: {
                ...prev.interviewSettings,
                [event.name]: event.value,
              },
            }));
          }}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={data?.state.interviewSettings.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button
            onClick={() => props.updateStep((prev) => prev - 1)}
            colorScheme="gray"
            type="button"
          >
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
