import { Center, Icon, Text } from "native-base";
import { Fontisto } from "@expo/vector-icons";
import Logo from "../assets/logo.svg";
import { Button, TypeEnum } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export function SignIn() {
  const { signIn, isUserLoading } = useAuth();

  return (
    <Center flex={1} bgColor='gray.900'>
      <Logo width={212} height={40} />
      <Button
        title={"ENTRAR COM O GOOGLE"}
        type={TypeEnum.SECONDARY}
        leftIcon={
          <Icon as={Fontisto} name={"google"} color={"white"} size={"md"} />
        }
        mt={12}
        onPress={signIn}
        isLoading={isUserLoading}
        _loading={{ _spinner: { color: "white" } }}
      />
      <Text color={"white"} textAlign={"center"} mt={4}>
        Não utilizamos nenhuma informação além {"\n"} do seu e-mail para criação
        da sua conta
      </Text>
    </Center>
  );
}
