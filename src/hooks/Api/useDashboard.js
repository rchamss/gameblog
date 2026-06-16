import { useEffect, useState } from "react";
import { useRequireLogin } from "../useRequireLogin";

export default function useDashboard() {

    const token = useRequireLogin();

    const [dashboard, setDashboard] = useState({
        jogos: 0,
        categorias: 0,
        empresas: 0
    });

    useEffect(() => {

        if (!token) return;

        async function getAPI() {

            const headers = {
                Authorization: `Bearer ${token}`
            };

            const jogosReq = await fetch(
                "https://gameblog-api-production-817a.up.railway.app/api/v1/jogos",
                { headers }
            );

            const categoriasReq = await fetch(
                "https://gameblog-api-production-817a.up.railway.app/api/v1/categorias",
                { headers }
            );

            const empresasReq = await fetch(
                "https://gameblog-api-production-817a.up.railway.app/api/v1/empresas",
                { headers }
            );

            const jogos = await jogosReq.json();
            const categorias = await categoriasReq.json();
            const empresas = await empresasReq.json();

            setDashboard({
                jogos: jogos.length,
                categorias: categorias.length,
                empresas: empresas.length
            });
        }

        getAPI();

    }, [token]);

    return dashboard;
}