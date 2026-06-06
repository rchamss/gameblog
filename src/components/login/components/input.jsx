import style from '../../../style/login/componentsCSS/input.module.css'

export default function Campo({tipo, label, obrigatorio, img, aoDigitar}){ return (
    <div className={style.div}>
        <input 
            id={label} 
            type={tipo} 
            required={obrigatorio} 
            className={style.campo} 
            placeholder=''
            onChange={(valor) => aoDigitar(valor.target.value)}
        />
            <label hmtlFor={label} className={style.label}>
                <img src={img}/>
                    {label}
            </label>
    </div>
)}