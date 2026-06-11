import style from '../../../style/login/componentsCSS/input.module.css'

export default function Campo({tipo, label, obrigatorio, img, aoDigitar, autoComplete}){ return (
    <div className={style.div}>
        <input 
            id={label} 
            type={tipo} 
            required={obrigatorio} 
            className={style.campo} 
            placeholder=''
            autoComplete={autoComplete}
            onChange={(valor) => aoDigitar(valor.target.value)}
        />
            <label htmlFor={label} className={style.label}>
                <img src={img}/>
                    {label}
            </label>
    </div>
)}