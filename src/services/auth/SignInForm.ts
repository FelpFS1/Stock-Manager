export default async function SingInForm({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch("https://app-manager.shop/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  const data = await response.json();
  return data
}
