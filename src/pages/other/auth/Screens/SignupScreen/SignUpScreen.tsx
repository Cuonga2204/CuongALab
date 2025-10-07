import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Form, Typography } from "antd";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { IMAGES } from "src/assets/images";
import { Button } from "src/components/commons/Button/Button";
import { FormField } from "src/components/FormField/FormField";
import { AuthPathsEnum } from "src/pages/other/auth/constants/auth.paths";
import { useSignup } from "src/pages/other/auth/hooks/useSignup.hook";
import { SignupSchema } from "src/pages/other/auth/schemas/auth.schemas";
import type { SignupFormData } from "src/pages/other/auth/types/auth.types";

export default function Signup() {
  const { Text } = Typography;
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signupMutation = useSignup();

  const onSubmit = (data: SignupFormData) => {
    signupMutation.mutate(data);
  };

  return (
    <>
      <img
        className="absolute w-full h-full object-cover"
        src={IMAGES.backgroundAuth}
        alt=""
      />
      <div className="flex justify-center items-center h-screen">
        <Card
          title={<span className="text-xl font-semibold">Sign Up</span>}
          className="w-[400px]"
        >
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <FormField
              control={control}
              name="email"
              label="Email"
              placeholder="Email"
              type="text"
            />
            <FormField
              control={control}
              name="name"
              label="Name"
              placeholder="Name"
              type="text"
            />

            <FormField
              control={control}
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
            />
            <FormField
              control={control}
              name="confirmPassword"
              label="ConfirmPassword"
              placeholder="ConfirmPassword"
              type="password"
            />

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isSubmitting}
              className="mt-3"
            >
              Sign Up
            </Button>
            <div className="text-center mt-4">
              <Text>You have an account? </Text>
              <Link
                to={AuthPathsEnum.LOGIN}
                className="font-medium text-blue-600 hover:underline"
              >
                Log In now
              </Link>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
}
