export default async function TokenAuthorization(token:string){
    const loggedUser = await fetch("http://127.0.0.1:3333/authorization", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await loggedUser.json()
      return data
}