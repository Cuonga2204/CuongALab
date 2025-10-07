import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Form, Typography } from "antd";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { IMAGES } from "src/assets/images";
import { Button } from "src/components/commons/Button/Button";
import { FormField } from "src/components/FormField/FormField";

import { AuthPathsEnum } from "src/pages/other/auth/constants/auth.paths";
import { useLogin } from "src/pages/other/auth/hooks/useLogin.hook";
import { LoginSchema } from "src/pages/other/auth/schemas/auth.schemas";
import type { LoginFormData } from "src/pages/other/auth/types/auth.types";

export default function Login() {
  const { Text } = Typography;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLogin();

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
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
          title={<span className="text-xl font-semibold">Log In</span>}
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
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
            />

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isSubmitting}
              className="mt-3"
            >
              Log In
            </Button>
            <div className="text-center mt-4">
              <Text>Don’t have an account? </Text>
              <Link
                to={AuthPathsEnum.SIGNUP}
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up now
              </Link>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
}
