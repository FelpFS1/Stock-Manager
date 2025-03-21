type SingUpProps = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordAgain: string;
};

export default async function SingUpForm({
  name,
  lastName,
  email,
  password,
  passwordAgain,
}: SingUpProps) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&¨])[A-Za-z\d@$#!%*?&¨]+$/;
    const passPassword = passwordRegex.test(password)
    const lengthPassword = password.length >= 8
    console.log(lengthPassword);
    
   
    if(!passPassword || !lengthPassword){  
        return {message:"⚠️ A senha deve conter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial. ⚠️"}
    }
    if (password != passwordAgain) return {message:"⚠️ Senhas não correspondem ⚠️"};

  const response = await fetch("https://app-manager.shop/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: name + lastName,
      email: email,
      password: password,
    }),
  });
 
  return await response.json()
  
}
