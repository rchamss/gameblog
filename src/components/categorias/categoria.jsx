export default function CategoriaCard(categoria){
    const categorias = [
    {nome: 'rpg', caminho: '/recomendado'},
    {nome: 'Categorias', caminho: '/categorias'},
    {nome: 'Distruir', caminho: '/distribuir'},
]

    return(
        <Link>{categoria}</Link>
    )
}