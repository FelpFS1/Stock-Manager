export default async function SingInForm({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch("http://127.0.0.1:3333/login", {
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
