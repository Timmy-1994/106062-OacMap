export class TyphoonLayer extends L.Layer implements ILayer{
    
    id: string
    type: string
    title: string
    catelog: { label: string; value: string }[]
    tag: string[]
    visible: boolean
    opacity: number
    dataSet: { label: string; value: string }[]
    imgUrl?: string
    legendColor?: string
    icon?: string
    
    lyrOpts:any

    constructor({
        id,
        type,
        title,
        catelog,
        tag,
        visible,
        opacity,
        dataSet,
        ...lyrOpts
    }){
        super()
        this.id = id
        this.type = type
        this.title = title
        this.catelog = catelog
        this.tag = tag
        this.visible = visible
        this.opacity = opacity
        this.dataSet = dataSet
        this.lyrOpts = lyrOpts
    }

    
    async fetchData(){
        return await (await fetch(this.lyrOpts.url)).json()
    }
    
    /**@override  */
    onRemove(map){
        console.error("alert typhoon layer can't be close")
        return this
    }

    /**@override  */
    onAdd(map:L.Map){
        (async ()=>{
            const cwb_typhoon_data = await this.fetchData()
            console.log("[cwb_typhoon_data]",cwb_typhoon_data)
            // const {name,data,time,desc } = cwb_typhoon_data.properties
            
            L.geoJSON(cwb_typhoon_data,{
                pointToLayer:(geoJsonPoint, latlng)=>{
                    // use icon : wind eye
                    const mk = L.marker(latlng,{
                        icon:L.icon({
                            iconUrl:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0yODQuODMyLDY2LjE0NGMyMC42NC0yNS4zNzYsNDEuNjMyLTM1LjUyLDQxLjg1Ni0zNS42MTZjNi44MTYtMy4xMzYsMTAuNTYtMTAuNjI0LDguOTI4LTE3Ljk1Mg0KCQkJQzMzNC4wMTYsNS4yNDgsMzI3LjUyLDAsMzIwLDBDMTc4Ljg0OCwwLDY0LDExNC44NDgsNjQsMjU2YzAsOTYuMDY0LDcwLjkxMiwxNzUuODcyLDE2My4xNjgsMTg5Ljg1Ng0KCQkJYy0yMC42MDgsMjUuMzc2LTQxLjYzMiwzNS41Mi00MS44NTYsMzUuNjE2Yy02LjgxNiwzLjEzNi0xMC41NiwxMC41OTItOC45MjgsMTcuOTUyQzE3Ny45ODQsNTA2Ljc1MiwxODQuNDgsNTEyLDE5Miw1MTINCgkJCWMxNDEuMTUyLDAsMjU2LTExNC44NDgsMjU2LTI1NkM0NDgsMTU5LjkzNiwzNzcuMDg4LDgwLjA5NiwyODQuODMyLDY2LjE0NHogTTI1NiwzNTJjLTUzLjAyNCwwLTk2LTQyLjk3Ni05Ni05NnM0Mi45NzYtOTYsOTYtOTYNCgkJCXM5Niw0Mi45NzYsOTYsOTZTMzA5LjAyNCwzNTIsMjU2LDM1MnoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==",
                            iconSize: [15, 15],
                        })
                        // color:"black",
                        // radius:2.5
                    })
                    return mk
                },
            //     onEachFeature:(feature, layer:L.GeoJSON)=>{
            //         if(feature.geometry.type === "Polygon"){
            //             if(/預測/g.test(feature.properties.name)){
            //                 layer.setStyle({
            //                     opacity:0.5,
            //                     fillColor:"#ffff55",
            //                     color:"red",
            //                     weight: 2
            //                 })
            //             }else{ // current
            //                 layer.setStyle({
            //                     opacity:0.8,
            //                     color:"#ffffff",
            //                     fillColor:"",
            //                     weight: 3
            //                 })
            //             }
            //         }
            //         if(feature.geometry.type === "LineString"){
            //             layer.setStyle({
            //                 dashArray: '5, 10',
            //                 lineCap: 'square',
            //                 opacity:0.5,
            //                 color:"black",
            //                 weight: 2
            //             })
            //         }
            //         if(feature.geometry.type ==="Point"){
            //             layer.bindTooltip(`
            //                 <strong>${feature.properties.name}</strong>
            //             `,{permanent:true})
            //             setTimeout(()=>layer.openTooltip(),1000)
            //         }
            //     }
            }).addTo(map)
            
            /**
             * TODO: fireEvent to map ; send data to component 、確認沒有颱風時或多個時的資料格式 ? 
             * p.s. get start and current point 's extent if point in the extent : past path -> use solid style
             */
            this._map.fireEvent("typhoonAlert",{
                // data:[{name,data,time,desc}]
                data:cwb_typhoon_data
            })

        })()
        return this
    }

}
