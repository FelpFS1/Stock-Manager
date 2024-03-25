export default async function TokenAuthorization(token:string){
    const loggedUser = await fetch("http://144.22.184.79/authorization", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await loggedUser.json()
      return data
}