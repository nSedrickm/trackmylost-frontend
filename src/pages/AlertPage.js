import React, { useState } from "react";
import tw from "twin.macro";
import { useTranslation } from "react-i18next";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import AnimateLoader from "components/Loaders/AnimateLoader";
import toast from "react-hot-toast";
import { FiBell, FiChevronDown } from "react-icons/fi";
import { setAlert } from "services/api.service";
import {
  Input,
  Label,
  SubmitButton,
  Select,
  SelectToggle,
} from "components/General";
import PhoneNumberInput from "components/PhoneNumberInput";

const Row = tw.div`flex flex-wrap -m-4 md:px-24`;
const Form = tw.form`mx-auto md:w-1/2 md:my-24 md:border border-primary-500 md:p-8 rounded-2xl bg-white`;

const AlertPage = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    let formData = {
      name: evt.target.elements.name?.value,
      document_type: evt.target.elements.document_type?.value,
      phone_number: evt.target.elements.phone_number?.value,
    };
    console.log(formData);

    setLoading(true);
    setAlert(formData)
      .then((response) => {
        toast.success(`Alert set successfully`);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(
            "An error occurred Please check your network and try again"
          );
        } else if (error.request) {
          toast.error(
            "An error occurred Please check your network and try again"
          );
        } else {
          toast.error(
            "An error occurred Please check your network and try again"
          );
        }
        setLoading(false);
      });
  };

  if (loading) {
    return <AnimateLoader />;
  } else {
    return (
      <AnimationRevealPage>
        <section tw="text-gray-600 relative">
          <div tw="container py-12 mx-auto">
            <div tw="flex flex-col text-center w-full mb-16 md:mb-0">
              <h1 tw="sm:text-4xl text-2.5xl font-black mb-4 text-primary-500">
                {t("alertpage.heading")}?
              </h1>
              <p tw="mx-auto leading-relaxed text-base">
                {t("alertpage.instruction")}
              </p>
            </div>

            <Row>
              <Form onSubmit={(evt) => handleSubmit(evt)}>
                <div tw="flex flex-wrap">
                  <div tw="p-2 w-full">
                    <div tw="relative">
                      <Label htmlFor="name">{t("form.fullname")}</Label>
                      <Input
                        required
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter full name(s)"
                      />
                    </div>
                  </div>
                  <div tw="p-2 w-full">
                    <Label htmlFor="document_type">{t("form.doc-type")}</Label>
                    <div tw="relative">
                      <Select required id="document_type" name="document_type">
                        <option value="" hidden>
                          {t("form.doc-choose")}
                        </option>
                        <option value="id_card">
                          {t("document", { context: "id" })}
                        </option>
                        <option value="passport">
                          {t("document", { context: "passport" })}
                        </option>
                        <option value="driver_license">
                          {t("document", { context: "license" })}
                        </option>
                        <option value="credit_card">
                          {t("document", { context: "credit" })}
                        </option>
                      </Select>
                      <SelectToggle>
                        <FiChevronDown />
                      </SelectToggle>
                    </div>
                  </div>
                  <div tw="p-2 w-full">
                    <div tw="relative">
                      <Label htmlFor="phone_number">{t("form.number")}</Label>
                      <PhoneNumberInput
                        required
                        type="tel"
                        placeholder="e.g 670020023"
                        inputProps={{
                          name: "phone_number",
                          required: true,
                          autoFocus: true,
                        }}
                      />
                    </div>
                  </div>
                  <div tw="p-2 w-full">
                    <SubmitButton type="submit">
                      <FiBell /> &nbsp; continue
                    </SubmitButton>
                  </div>
                </div>
              </Form>
            </Row>
          </div>
        </section>
      </AnimationRevealPage>
    );
  }
};

export default AlertPage;
