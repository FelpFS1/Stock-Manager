type Cardpropss = {
    cardTitle:string,
    contentCard:number
}

export default function CardDashboard({cardTitle,contentCard} : Cardpropss){
    return(
        <div className=" h-40 bg-zinc-900 px-5 py-2 rounded-xl">
            <div>
                <h2 className="font-bold md:text-xl">{cardTitle}</h2>
                <h2 className="flex m-5 justify-center  text-5xl">{contentCard}</h2>
            </div>
        </div>
    )
}