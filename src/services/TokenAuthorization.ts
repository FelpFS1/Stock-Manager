export default async function TokenAuthorization(token:string){
    const loggedUser = await fetch("https://app-manager.shop/authorization", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await loggedUser.json()
      return data
}