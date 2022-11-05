import { Button as BtnNativeBase, Text, IButtonProps } from "native-base";

export enum TypeEnum {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
}

interface ButtonProps extends IButtonProps {
  title: string;
  type?: TypeEnum;
}

export function Button({ title, type, ...rest }: ButtonProps) {
  return (
    <BtnNativeBase
      w={"full"}
      h={14}
      rounded={"sm"}
      fontSize={"md"}
      textTransform={"uppercase"}
      bg={type === TypeEnum.SECONDARY ? "red.500" : "yellow.500"}
      _pressed={{
        bg: type === TypeEnum.SECONDARY ? "red.600" : "yellow.600",
      }}
      _loading={{
        _spinner: { color: "black" },
      }}
      {...rest}
    >
      <Text
        fontSize={"sm"}
        fontFamily='heading'
        color={type === TypeEnum.SECONDARY ? "white" : "black"}
      >
        {title}
      </Text>
    </BtnNativeBase>
  );
}
