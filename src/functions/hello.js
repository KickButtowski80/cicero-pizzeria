export function GET(request){
    return new Response (`hello from ${process.env.VERCEL_REGION}`)
}