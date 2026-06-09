import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useRedirect(pagina){
    const router = useRouter()
    router.push(pagina)
}