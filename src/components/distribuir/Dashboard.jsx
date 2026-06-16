import useDashboard from "../../hooks/Api/useDashboard";
import styles from "../../style/components/distribuir/dashboard.module.css";

export default function Dashboard() {

    const dashboard = useDashboard();

    return (
        <div className={styles.cards}>

            <div className={styles.card}>
                <h3>Jogos</h3>
                <span>{dashboard.jogos}</span>
            </div>

            <div className={styles.card}>
                <h3>Categorias</h3>
                <span>{dashboard.categorias}</span>
            </div>

            <div className={styles.card}>
                <h3>Empresas</h3>
                <span>{dashboard.empresas}</span>
            </div>

        </div>
    );
}