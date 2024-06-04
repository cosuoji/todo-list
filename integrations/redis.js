import redis from "redis"

const client = redis.createClient({
    host:"localhost",
    port:6379
})

client.on("connect", ()=>{
    console.log("Redit Client Connected")
})


export default client