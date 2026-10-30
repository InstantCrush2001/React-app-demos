// Proyecto 1 - CV Application

import { useState } from "react";

function InfoSection({data, type, ph, value, onChange, isEditing}){ // Recibe 5 props con diferentes datos
    //   onChange: función que recibe el nuevo texto cuando el usuario escribe
    
    // Ternario: si isEditing es true, devuelve el input; si no, el texto. Es el renderizado condicional: el mismo componente dibuja cosas distintas.
    return isEditing ? (
        // MODO EDICIÓN: etiqueta + input
    <label className= "input">
        {data}: 
        <input 
        type={type} 
        disabled= {false} 
        placeholder={ph} 
        value={value} 
        onChange={(e) => onChange(e.target.value)} // Al escribir, saca el texto del evento (e.target.value) y se lo pasa a la función onChange que dio el padre.
        />
    </label>
    ):(
        // MODO VISTA: etiqueta + texto plano.
        // Si value está vacío, muestra "Not specified" como respaldo
    <label>
        {data}: <span>{value ? value: "Not specified"}</span>
    </label>
    )
}

function Button({action, isEditing}){ // Botón único para la App: cambia su texto según el booleano isEditing y recibe la función a ejecutar por medio de action
    let text = ""

    // Editando: el botón guarda y pasa a la vista ("Submit") / Viendo: el botón vuelve a mostrar los inputs ("Edit").
    if (isEditing){
        text = "Submit"
    } else {
        text = "Edit"
    }
    // onClick={action}: se pasa la función SIN paréntesis, para que se ejecute al hacer clic y no al dibujar el botón
    return <button onClick={action}>{text}</button>
}
// Funciones para la cada una de las tres secciones
// se le pasan los parámetros formData, onFieldChange y isEditing
function GeneralInfo({formData, onFieldChange, isEditing }){
    return( 
    <div className="container"> 
        <legend>General Information</legend>
        <div>
            <InfoSection // Por cada llamada de InfoSelection se le pasan hasta 5 props
            data={"Name"} // Texto de la label que se muestra al lado del campo
            ph={"Insert Full Name"} //Placeholder
            value = {formData.name} // Valor actual del campo. Viene del estado "formData" que vive en CvApp.
            
            onChange = {(value) => onFieldChange("name", value)} // Función que recibe el parámetro value y llama a otra función onFieldChange
            // Necesita dos datos: el campo que cambio "name" y el nuevo valor

            isEditing={isEditing}   // Indica en qué modo está la app: true = editando (inputs), false = viendo (texto). Lo decide CvApp y baja por props
            />
        </div>
        <div>
            <InfoSection 
            data={"Email"} 
            ph={"Insert Email"}
            value = {formData.email}
            onChange = {(value) => onFieldChange("email", value)}
            isEditing={isEditing}
            /> 
        </div>
        <div>
            <InfoSection data={"Phone Number"} 
            ph={"Insert Phone Number"}
            value = {formData.phone}
            onChange = {(value) => onFieldChange("phone", value)}
            isEditing={isEditing}
            />
        </div>
    </div>
    );
}

function Education({formData, onFieldChange, isEditing}){
    return( <div className="container">
            
        <legend>Educational Experience</legend>
        <div>
            <InfoSection 
            data={"School Name"} 
            ph={"Insert School Name"}
            value = {formData.school}
            onChange = {(value) => onFieldChange("school", value)}
            isEditing={isEditing}
            />
        </div>
        <div>
            <InfoSection 
            data={"Title of study"} 
            ph={"Insert Title of Study"}
            value = {formData.title}
            onChange = {(value) => onFieldChange("title", value)}
            isEditing={isEditing}
            /> 
        </div>
        <div>
            <InfoSection 
            data={"From"} 
            type={"date"}
            value = {formData.FromSchool}
            onChange = {(value) => onFieldChange("FromSchool", value)}
            isEditing = {isEditing}
            />
            <InfoSection 
            data={" To"} 
            type={"date"}
            value = {formData.ToSchool}
            onChange = {(value) => onFieldChange("ToSchool", value)}
            isEditing = {isEditing}
            />
        </div>
    </div>
    );
}

function Practical({formData, onFieldChange, isEditing}){
    return( 
        <div className="container">    
        <legend>Practical Experience</legend>
        <div>
            <InfoSection 
            data={"Company name"} 
            ph={"Insert Company Name"}
            value = {formData.company}
            onChange = {(value) => onFieldChange("company", value)}
            isEditing = {isEditing}
            />
        </div>
        <div>
            <InfoSection 
            data={"Position title"} 
            ph={"Insert Position Title"}
            value = {formData.position}
            onChange = {(value) => onFieldChange("position", value)}
            isEditing = {isEditing}
            /> 
        </div>
        <div>
            <InfoSection 
            data={"From"} 
            type={"date"}
            value = {formData.FromJob}
            onChange = {(value) => onFieldChange("FromJob", value)}
            isEditing = {isEditing}
            />
            <InfoSection 
            data={" To"} 
            type={"date"}
            value = {formData.ToJob}
            onChange = {(value) => onFieldChange("ToJob", value)}
            isEditing = {isEditing}
            />
        </div>
    </div>
    );
}
// FUNCIÓN PRINCIPAL 
export default function CvApp(){
    const [formData, setFormData] = useState({ // Estado con todos los datos del CV guardados en un sólo objeto
        // formData: el valor actual --- setFormData: la única forma correcta de cambiarlo (React redibuja la pantalla cuando se llama).
        email: "",
        phone: "",
        school: "",
        title: "",
        company: "",
        position: "",
        FromSchool: "",
        ToSchool: "",
        FromJob: "",
        ToJob: ""
    });

    const [isEditing, setIsEditing]= useState(true); // Estado que indica en que modo está la App / true = modo edición / false = modo vista
    
        // Actualiza UN solo campo de formData cada vez que el usuario escribe. Una sola función sirve para todos los campos gracias a los dos parámetros:
        //   inputName: la clave del campo que cambió (ej: "name", "email", "FromJob") / value: el nuevo texto que escribió el usuario
    const handleChange = (inputName, value) => {
        setFormData({
            ...formData,            // Copia todo el estado actual para no borrar los otros campos. Sin esto, el nuevo objeto solo tendría el campo que cambió.
            
            [inputName]: value      // Actualiza dinámicamente solo el campo que cambió (ej: name, email, etc.)  Si inputName es "email" y value es
                                    // "ana@correo.com", equivale a escribir: email: "ana@correo.com". Como va DESPUÉS de la copia, sobrescribe el valor anterior.
        });
    };

    const handleSubmit = () => {    // Función de flecha que no recibe parámetros y llama a otra función set del estado para invertir el valor de isEditing
            setIsEditing(!isEditing);
    };
    
    return (
        // Contenedor principal de toda la app (se le da estilo con la clase) 
        <div className="cv-container">
        <h1>CV Aplicator</h1>
        <h2>By El empinado 28/10/26</h2>
        
        <main className="cv-content">
            <section className="form-column">
                <div>
                    <div className="sections">

                    {/* Cada sección recibe por props:
                        - formData: los datos actuales (estado de CvApp)
                        - onFieldChange: función para avisar cuando un campo cambia
                        - isEditing: modo actual (true = inputs, false = texto) */}
                    <fieldset>
                        <GeneralInfo formData={formData} onFieldChange = {handleChange} isEditing = {isEditing}/>
                    </fieldset>
                    <fieldset>
                        <Education formData={formData} onFieldChange = {handleChange} isEditing = {isEditing}/>
                    </fieldset>
                <fieldset>
                    <Practical formData={formData} onFieldChange = {handleChange} isEditing = {isEditing}/>
                </fieldset>

                    {/* Un solo botón para todo el CV: alterna entre Submit y Edit */}
                    <Button action={handleSubmit} isEditing={isEditing}/>
                    </div>
                </div>
            </section>
        </main>
        </div>
    );
}